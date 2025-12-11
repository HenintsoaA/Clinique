def knapsack_with_items(capacity, weights, values, n):
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i-1][w],
                               values[i-1] + dp[i-1][w - weights[i-1]])
            else:
                dp[i][w] = dp[i-1][w]

    chosen_items = []
    w = capacity
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i-1][w]: 
            chosen_items.append(i-1)
            w -= weights[i-1]

    chosen_items.reverse()
    return dp[n][capacity], chosen_items

if __name__ == "__main__":
    print("=== Sac à dos : objets choisis ===\n")

    capacity = int(input("Capacité du sac : "))
    n = int(input("Nombre d'objets : "))

    weights = []
    values = []

    for i in range(n):
        print(f"\nObjet {i+1}")
        weights.append(int(input("  Poids : ")))
        values.append(int(input("  Valeur : ")))

    best_value, items = knapsack_with_items(capacity, weights, values, n)

    print("\n=== Résultat ===")
    print("Valeur maximale :", best_value)
    print("Objets choisis (index) :", items)

    if items:
        print("\nDétails des objets choisis :")
        for i in items:
            print(f"- Objet {i+1} (Poids={weights[i]}, Valeur={values[i]})")
