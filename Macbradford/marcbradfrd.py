import numpy as np
import math
import random

# -------------------- Fonction pour multiplier une matrice avec un vecteur --------------------
def mat_vec_mul(A, x):
    n = len(A)
    result = [0.0] * n
    for i in range(n):
        for j in range(n):
            result[i] += A[i][j] * x[j]
    return result

# -------------------- Norme d’un vecteur --------------------
def norm(x):
    return math.sqrt(sum(val * val for val in x))

# -------------------- Normalisation d’un vecteur --------------------
def normalize(x):
    n = norm(x)
    return [val / n for val in x]

# -------------------- Power Method --------------------
def power_method(A, max_iter=1000, tol=1e-6):
    n = len(A)

    # vecteur initial aléatoire
    x = [random.random() for _ in range(n)]
    x = normalize(x)

    for _ in range(max_iter):
        y = mat_vec_mul(A, x)      # A * x
        x_new = normalize(y)       # normalisation

        # condition d'arrêt
        diff = math.sqrt(sum((x_new[i] - x[i])**2 for i in range(n)))
        if diff < tol:
            break

        x = x_new

    # valeur propre dominante ~ (x^T A x)
    Ax = mat_vec_mul(A, x)
    eigenvalue = sum(x[i] * Ax[i] for i in range(n))

    return eigenvalue, x


def power_methode(A, max_iter=1000, tol=1e-6):
    # 1. vecteur initial aléatoire
    n = A.shape[0]
    x = np.random.rand(n)

    # normalisation initiale
    x = x / np.linalg.norm(x)

    for _ in range(max_iter):
        # 2. multiplication
        y = A @ x

        # 3. normalisation
        x_new = y / np.linalg.norm(y)

        # 4. vérifier convergence
        if np.linalg.norm(x_new - x) < tol:
            break

        x = x_new

    # valeur propre dominante (Rayleigh quotient)
    eigenvalue = x.T @ A @ x

    return eigenvalue, x

A = np.array([[4, 1],
              [2, 3]])

eig, vec = power_method(A)

print("Valeur propre dominante :", eig)
print("Vecteur propre associé :", vec)

# A = [
#     [4, 1],
#     [2, 3]
# ]

# eig, vec = power_methode(A)

# print("Valeur propre dominante :", eig)
# print("Vecteur propre associé :", vec)
