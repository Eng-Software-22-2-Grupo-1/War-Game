from __future__ import division
import json
import numpy as np
import operator
from collections import defaultdict
from enum import Enum
from math import ceil, floor
from heap import Heap
from copy import deepcopy

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
