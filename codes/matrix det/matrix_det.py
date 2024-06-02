def find_determinant(matrix):
    # Check if the matrix is square
    if len(matrix) != len(matrix[0]):
        raise ValueError("Matrix must be square to find the determinant.")

    # Base case for 2x2 matrix
    if len(matrix) == 2:
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]

    determinant = 0
    for c in range(len(matrix)):
        sub_matrix = []
        for i in range(1, len(matrix)):
            sub_row = []
            for j in range(len(matrix)):
                if j != c:
                    sub_row.append(matrix[i][j])
            sub_matrix.append(sub_row)
        determinant += (-1) ** c * matrix[0][c] * find_determinant(sub_matrix)

    return determinant


# Example usage
m = int(input("Enter the number of rows/ columns: "))
print(m)
n = m

matrix = []

for i in range(m):
    row = list(map(int, input().split()))
    if len(row) != n:
        raise ValueError("Invalid number of elements in the row.")
    matrix.append(row)

print("Matrix:")
for row in matrix:
    print(row)

determinant = find_determinant(matrix)
print("Determinant:", determinant)
