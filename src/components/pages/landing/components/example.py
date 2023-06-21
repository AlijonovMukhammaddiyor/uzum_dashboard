
class Node:
    def __init__(self, value):
        self.value:int = value
        self.next: Node = None
    
class PriorityQueue:
  
  def __init__(self):
    self.head = None
    self.tail = None
    self.length = 0
    
  
  def enqueue(self, value):
    current = self.head
    
    if self.length == 0:
      # if there is no node, then this is the first one
      self.head = Node(value)
      self.tail = self.head
      self.length += 1
      return self
  
    if value > self.head.value:
      # if the priority of the new node is higher than the head, then it becomes the new head
      self.head = Node(value)
      self.head.next = current
      self.length += 1
      return self
    
    # otherwise we need to find the right place for the new node
    while current.next and value < current.next.value:
      current = current.next
    
    if current.next:
      # it is not the tail
      next_node = current.next
      current.next = Node(value)
      current.next.next = next_node
    else:
      # it is the tail
      prev_node = self.tail
      self.tail = Node(value)
      prev_node.next = self.tail
      
    self.length += 1
    
    return self

  def dequeue(self):
    if self.length == 0:
      return None
    
    if self.length == 1:
      self.head = None
      self.tail = None
      self.length -= 1
      return self
    
    self.head = self.head.next
    self.length -= 1
    return self
      
      
  
def counting_sort(array):
  max_value = max(array)
  
  temp = [0] * (max_value + 1)
  
  for i in array:
    temp[i] += 1
    
  result = []
  
  for i in array:
    result[temp[i] - 1] = i
    temp[i] -= 1
  
  return result
