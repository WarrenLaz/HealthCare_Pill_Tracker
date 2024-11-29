from matplotlib import pyplot as plt

T_a = 2
T_b = 10
sa = [[40,2],[20,4],[60,3],[40,1],[80,4]]
st = [40,20,60,40,80]
runs = 100
signals = []
a1 = []
a2 = []
a3 = []
a4 = []
a5 = [] 
def reorder(cache):
    for i in cache:
        sa[i][0] += st[i]

cache = []
for day in range(runs):
    sig = 0
    sb = []
    for i in sa:
        sb.append(float(i[0])/float(i[1]))
    print(sb)
    a1.append(sb[0])
    a2.append(sb[1])
    a3.append(sb[2])
    a4.append(sb[3])
    a5.append(sb[4])
    for i in sa:
        i[0]-=i[1]
    for i in sb:
        if(i < T_b and not(sb.index(i)in cache)):
            cache.append(sb.index(i))
    for i in sb:
        if(i < T_a):
            sig = day
            reorder(cache)
            cache = []
    signals.append(sig)
print(len(a1))
print(len(a2))

plt.plot([i for i in range(100)],a1, label = "1")
plt.plot([i for i in range(100)],a2, label = "2")
plt.plot([i for i in range(100)],a3, label = "3")
plt.plot([i for i in range(100)],a4, label = "4")
plt.plot([i for i in range(100)],a5, label = "5")
plt.scatter(signals, [0 for i in range(100)])
plt.show()