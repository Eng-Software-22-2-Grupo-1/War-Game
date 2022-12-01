from __future__ import division

import json
import operator
from collections import defaultdict
from copy import deepcopy
from enum import Enum
from math import ceil, floor

import numpy as np
from heap import Heap

INFINITY = 1000000000


class Player(Enum):
    CURRENT = 0
    NOT_CURRENT = 1


class Troops(Enum):
    MIN = 0
    MAX = 1


class Informed(Enum):
    A_STAR_NORMAL = 0


class State:
    def __init__(self, data):
        self.current_player = str(data['ctx']['currentPlayer'])
        self.cities = data['G']['countries']
        self.adj_list = data['adjacencyList']
        for city in self.adj_list:
            self.adj_list[city] = [str(x) for x in self.adj_list[city]]
        self.agent = data['agent']
        self.phase = data['ctx']['phase']
        self.unassigned_units = data['G']['unassignedUnits'][self.current_player]
        self.player_cities, self.city_troops = self.seperate_cities()
        self.opponent_adj_list = self.get_opponent_neighbours()

    def get_city_owner(self, city_id):
        for owner in self.player_cities:
            if city_id in self.player_cities[owner]:
                return owner

    def get_opponent_cities(self):
        opponent_cities = []
        for player_id in self.player_cities:
            if player_id != self.current_player:
                for city in self.player_cities[player_id]:
                    opponent_cities.append(city)
        return opponent_cities

    def get_troops_of_cities(self, cities_ids):
        troops = []
        for city_id in cities_ids:
            troops.append(self.city_troops[city_id])
        return troops

    def get_city(self, player_flag, troops_flag):
        if player_flag == Player.CURRENT:
            cities = self.player_cities[self.current_player]
        else:
            cities = self.get_opponent_cities()
        troops = self.get_troops_of_cities(cities)
        if troops_flag == Troops.MIN:
            return cities[np.argmin(troops)]
        return cities[np.argmax(troops)]

    def separate_cities(self):
        match_owner_cities_id = defaultdict(list)
        dict_id_troop = {}
        for city_id in self.cities:
            match_owner_cities_id[self.cities[city_id]
                                  ['owner']].append(city_id)
            dict_id_troop[city_id] = self.cities[city_id]['soldiers']
        return dict(match_owner_cities_id), dict_id_troop

    def get_opponent_neighbours(self):
        opponent_adj_list = defaultdict(list)
        for city_id in self.adj_list:
            for neighbour_id in self.adj_list[city_id]:
                if self.get_city_owner(city_id) != self.get_city_owner(neighbour_id):
                    opponent_adj_list[city_id].append(neighbour_id)
        return dict(opponent_adj_list)

class Node:
    def __init__(self, state, parent, action, path_cost, depth):
        self.state = state
        self.children = dict()
        self.parent = parent
        self.action = action
        self.path_cost = path_cost
        self.depth = depth

    def __lt__(self, other):
        return self.path_cost < other.path_cost


class Agent:
    def __init__(self, data):
        self.state = State(data)
        self.function = Functions()
        self.problem = Problem()
        self.agents = {
            'passive': self.passive_agent,
            'A_star': self.A_star_agent,
            'minimax': self.minimax
        }
        self.target_list = self.agents.get(self.state.agent)()

    def return_format(self, move_list):
        response = defaultdict(list)
        for tup in move_list:
            response['moves'].append(
                {'name': tup[0], 'sourceId': tup[1], 'destId': tup[2], 'numSoldiers': tup[3]})
        return json.dumps(response)

    def occupy(self):
        country_to_occupy = self.state.dict_player_cities[None][0]
        return self.return_format([("occupy", country_to_occupy, 0, 1)])

    def reinforce_weakest(self):
        weakest_city = self.state.get_city(Player.CURRENT, Troops.MIN)
        return self.return_format([("reinforce", weakest_city, 0, 1)])

    def reinforce_strongest(self):
        strongest_city = self.state.get_city(Player.CURRENT, Troops.MAX)
        return self.return_format([("reinforce", strongest_city, 0, 1)])

    def redistribute_troops(self, city1, city2):
        troops_to_die = self.state.dict_city_troops[city2]
        self.state.dict_city_troops[city1] -= troops_to_die
        self.state.dict_city_troops[city2] = 0
        owner = self.state.get_city_owner(city2)
        self.state.dict_player_cities[self.state.current_player].append(city2)
        self.state.dict_player_cities[owner].remove(city2)
        self.state.opponent_adj_list = self.state.get_opponent_neighbours()
        try:
            bsr1 = self.function.BSR_(
                self.state, city1, self.state.opponent_adj_list[city1], 1)
        except:
            bsr1 = 0
        try:
            bsr2 = self.function.BSR_(
                self.state, city2, self.state.opponent_adj_list[city2], 1)
        except:
            bsr2 = 0
        if bsr1 == 0 and bsr2 == 0:
            nbsr1 = 0.5
        else:
            nbsr1 = bsr1 / (bsr1 + bsr2)
        val = self.state.dict_city_troops[city1]
        val1 = floor(val * nbsr1) if floor(val * nbsr1) >= 1 else 1
        if val > val1:
            self.state.dict_city_troops[city1] = val1
        else:
            self.state.dict_city_troops[city1] = val1 - 1
        self.state.dict_city_troops[city2] = val - \
            self.state.dict_city_troops[city1]

        return self.state.dict_city_troops[city2]

    def passive_agent(self):
        if self.state.phase == "Occupation":
            return self.occupy()
        elif self.state.phase == "Reinforce Countries":
            return self.reinforce_weakest()
        elif self.state.phase == "War":
            weakest_city = self.state.get_city(Player.CURRENT, Troops.MIN)
            return self.return_format([("reinforce", weakest_city, 0, self.state.unassigned_units)])
        return self.return_format([("can't find any moves", 0, 0, self.state.unassigned_units)])

    def minimax(self):
        if self.state.phase == "Occupation":
            return self.occupy()
        elif self.state.phase == "Reinforce Countries":
            return self.return_format(ai_reinforce(self.state, 1))
        elif self.state.phase == "War":
            moves = ai_reinforce(self.state, self.state.unassigned_units)
            node = Node(self.state, None, None, 0, 0)
            child, _ = self._maximize(node, -INFINITY, INFINITY, 0)
            attack = self.back_track(child)
            moves.append(
                ("attack", attack[0], attack[1], self.redistribute_troops(attack[0], attack[1])))
            return self.return_format(moves)
        return self.return_format([("can't find any moves", 0, 0, self.state.unassigned_units)])

    def _minimize(self, node, alpha, beta, depth):
        goal_test = self.problem.minimax_goal_test(node.state)
        if goal_test != 0:
            print("min goal test true")
            return None, goal_test

        if self.problem.leaf_test(node.state):
            return node, self.problem.eval(node.state)

        if depth >= 5:
            return node, self.problem.eval(node.state)

        minChild, minUtil = None, INFINITY

        for action in self.problem.get_actions(node.state):
            child = self.problem.child_node(node, action)

            _, util = self._maximize(child, alpha, beta, depth + 1)

            if util < minUtil:
                minChild, minUtil = child, util

            if minUtil <= alpha:
                break

            if minUtil < beta:
                beta = minUtil

        return minChild, minUtil

    def _maximize(self, node, alpha, beta, depth):
        goal_test = self.problem.minimax_goal_test(node.state)
        if goal_test != 0:
            return None, goal_test

        if self.problem.leaf_test(node.state):
            return node, self.problem.eval(node.state)

        if depth >= 5:
            return node, self.problem.eval(node.state)

        maxChild, maxUtil = None, -INFINITY

        print(self.problem.get_actions(node.state))

        for action in self.problem.get_actions(node.state):
            child = self.problem.child_node(node, action)
            _, util = self._minimize(child, alpha, beta, depth + 1)

            if util > maxUtil:
                maxChild, maxUtil = child, util

            if maxUtil >= beta:
                break

            if maxUtil > alpha:
                alpha = maxUtil

        return maxChild, maxUtil

    def informed_search(self, informed_type):
        node = Node(self.state, None, None, 0, 0)
        if self.problem.goal_test(node.state):
            return node, "success"
        frontier_heap = Heap()
        frontier_heap.add(node, priority=node.path_cost)
        heap_limit = Heap()
        while True:
            if not frontier_heap.pq:
                if informed_type == Informed.GREEDY:
                    return node, "empty, greedy"
                else:
                    if not heap_limit.pq:
                        return None, "empty, failure"
                    else:
                        _, min_ = heap_limit.pop()
                        return min_, "empty, reached limit"

            cost, node = frontier_heap.pop()
            if self.problem.goal_test(node.state):
                return node, "success"

            if informed_type == Informed.GREEDY:
                for action in self.problem.get_actions(node.state):
                    child = self.problem.child_node(node, action)
                    child_path_to_goal = self.function.total_BSR(child.state)
                    frontier_heap.add(child, priority=child_path_to_goal)

            else:  # Informed.A_STAR_REALTIME or Informed.A_STAR_NORMAL
                limit = 3 if informed_type == Informed.A_STAR_REALTIME else 10
                if node.depth < limit:
                    for action in self.problem.get_actions(node.state):
                        child = self.problem.child_node(node, action)
                        child_path_to_goal = self.function.total_BSR(
                            child.state)
                        child_total_path = child.path_cost + child_path_to_goal
                        frontier_heap.add(child, priority=child_total_path)
                else:
                    heap_limit.add(node, priority=cost)

    def A_star_agent(self):
        if self.state.phase == "Occupation":
            return self.occupy()
        elif self.state.phase == "Reinforce Countries":
            return self.return_format(ai_reinforce(self.state, 1))
        elif self.state.phase == "War":
            moves = ai_reinforce(self.state, self.state.unassigned_units)
            node, output = self.informed_search(Informed.A_STAR_NORMAL)
            if node != None:
                attack = self.back_track(node)
                moves.append(
                    ("attack", attack[0], attack[1], self.redistribute_troops(attack[0], attack[1])))
            return self.return_format(moves)
        return self.return_format([("can't find any moves", 0, 0, self.state.unassigned_units)])

    def back_track(self, node):
        steps = list()
        attack = []
        while node.parent != None:
            steps.append(node.action)
            node = node.parent
        if len(steps) != 0:
            step = steps[-1].split('_')
            for string in step:
                attack.append(string)
        return attack