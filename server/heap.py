from heapq import heappush, heappop, heapify

class Heap:
	def __init__(self):
		self.heap = []

	def pop(self):
		return heappop(self.heap)

	def decrease_key(self, node, new_value):
		for index, _ in enumerate(self.heap):
			if node.state.equals(self.heap[index][1].state):
				self.heap[index] = (new_value, node)
				heapify(self.heap)
				return
		raise ValueError("Element not found in heap")

	def add(self, item, priority=0):
		return heappush(self.heap, (priority, item))
