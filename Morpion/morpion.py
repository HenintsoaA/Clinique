def afficher_grille(board):
    print("\n")
    print(f" {board[0]} | {board[1]} | {board[2]} ")
    print("---+---+---")
    print(f" {board[3]} | {board[4]} | {board[5]} ")
    print("---+---+---")
    print(f" {board[6]} | {board[7]} | {board[8]} ")
    print("\n")


def verifier_gagnant(board, joueur):
    combinaisons = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # colonnes
        [0, 4, 8], [2, 4, 6]              # diagonales
    ]
    for combo in combinaisons:
        if board[combo[0]] == board[combo[1]] == board[combo[2]] == joueur:
            return True
    return False


def jeu_morpion():
    board = [" "] * 9
    joueur = "X"

    while True:
        afficher_grille(board)
        print(f"Au tour du joueur {joueur}")

        try:
            choix = int(input("Choisis une case (1-9) : ")) - 1
        except ValueError:
            print("Entrée invalide. Recommence.")
            continue

        if choix < 0 or choix > 8:
            print("Choix hors limite. Recommence.")
            continue

        if board[choix] != " ":
            print("Case déjà occupée. Recommence.")
            continue

        board[choix] = joueur

        if verifier_gagnant(board, joueur):
            afficher_grille(board)
            print(f"Le joueur {joueur} a gagné !")
            break

        if " " not in board:
            afficher_grille(board)
            print("Match nul !")
            break

        joueur = "O" if joueur == "X" else "X"

jeu_morpion()
