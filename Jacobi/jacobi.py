def jacobi(A, b, tol=1e-6, max_iter=100):
    n = len(A)                # nombre d'équations
    x = [0.0] * n             # vecteur de départ (0,0,...)
    x_new = x.copy()

    for iteration in range(max_iter):
        # calcul de la nouvelle approximation
        for i in range(n):
            somme = 0
            for j in range(n):
                if j != i:
                    somme += A[i][j] * x[j]
            
            x_new[i] = (b[i] - somme) / A[i][i]

        # Vérification de la convergence
        diff = max(abs(x_new[i] - x[i]) for i in range(n))
        if diff < tol:
            print(f"Convergé en {iteration+1} itérations.")
            return x_new

        # mise à jour du vecteur
        x = x_new.copy()

    print("Jacobi n'a pas convergé dans le max d'itérations.")
    return x

A = [
    [6, 1],
    [2, 3]
]

b = [9, 10]

solution = jacobi(A, b)
print("Solution approx :", solution)