import random
import time
import matplotlib.pyplot as plt
import csv

# -------- Algorithmes de tri --------

def bubble_sort(arr):
    a = arr.copy()
    n = len(a)
    for i in range(n):
        for j in range(0, n-i-1):
            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]
    return a

def insertion_sort(arr):
    a = arr.copy()
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and key < a[j]:
            a[j+1] = a[j]
            j -= 1
        a[j+1] = key
    return a

def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[0]
    left = [x for x in arr[1:] if x <= pivot]
    right = [x for x in arr[1:] if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)

# -------- Mesure du temps --------

def measure_time(sort_func, arr):
    start = time.time()
    sort_func(arr)
    end = time.time()
    return end - start

# -------- Comparaison --------

sizes = [100, 500, 1000, 2000, 3000]
results = {'Bubble': [], 'Insertion': [], 'Merge': [], 'Quick': []}

for size in sizes:
    arr = [random.randint(0, 10000) for _ in range(size)]
    results['Bubble'].append(measure_time(bubble_sort, arr))
    results['Insertion'].append(measure_time(insertion_sort, arr))
    results['Merge'].append(measure_time(merge_sort, arr))
    results['Quick'].append(measure_time(quick_sort, arr))

# -------- Export CSV --------

with open('tri_comparison.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['Taille', 'Bubble', 'Insertion', 'Merge', 'Quick'])
    for i, size in enumerate(sizes):
        writer.writerow([size, results['Bubble'][i], results['Insertion'][i], results['Merge'][i], results['Quick'][i]])

# -------- Graphique --------

plt.plot(sizes, results['Bubble'], label='Bubble Sort', marker='o')
plt.plot(sizes, results['Insertion'], label='Insertion Sort', marker='o')
plt.plot(sizes, results['Merge'], label='Merge Sort', marker='o')
plt.plot(sizes, results['Quick'], label='Quick Sort', marker='o')
plt.xlabel('Taille du tableau')
plt.ylabel('Temps d\'exécution (secondes)')
plt.title('Comparaison du temps d\'exécution des algorithmes de tri')
plt.legend()
plt.grid(True)
plt.show()
