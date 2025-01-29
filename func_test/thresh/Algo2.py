# pre conditiondots dost
import heapq
def Auxillary(tuple_: list[tuple]):
    newarray = []
    for t in tuple_:
        newarray.append(t[0]/t[1])
        heapq.heapify(newarray)
    return newarray
def Algorithm2(daysLeft: list, shipping: int):
    return

