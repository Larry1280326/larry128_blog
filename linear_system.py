def solve_linear_system(coefficients, constants):
    n = len(coefficients)  # Number of variables

    # Check if the number of equations is equal to the number of variables
    if len(coefficients) != len(constants):
        return "The linear system is inconsistent or invalid."

    # Gaussian elimination
    for i in range(n):
        if coefficients[i][i] == 0:
            return "The linear system is inconsistent or singular."

        for j in range(i + 1, n):
            factor = coefficients[j][i] / coefficients[i][i]
            for k in range(n):
                coefficients[j][k] -= factor * coefficients[i][k]
            constants[j] -= factor * constants[i]

    # Back substitution
    solution = [0] * n
    for i in range(n - 1, -1, -1):
        if coefficients[i][i] == 0:
            return "The linear system is inconsistent or singular."

        sum_val = sum(coefficients[i][j] * solution[j] for j in range(i + 1, n))
        solution[i] = (constants[i] - sum_val) / coefficients[i][i]

    return solution

# Example usage
num_equations = int(input("Enter the number of equations: "))

coefficients = []
constants = []

print("Enter the coefficients:")
for i in range(num_equations):
    equation = input(f"Equation {i+1}: ").split()
    coefficients.append([float(coefficient) for coefficient in equation[:-1]])
    constants.append(float(equation[-1]))

print("\nSystem of Linear Equations:")
for i in range(num_equations):
    equation = ' + '.join([f'({coefficients[i][j]} * x{j+1})' for j in range(len(coefficients[i]))])
    equation += f' = {constants[i]}'
    print(equation)

result = solve_linear_system(coefficients, constants)
if isinstance(result, list):
    print("\nSolution:")
    for i in range(len(result)):
        print(f"x{i+1} =", result[i])
else:
    print(result)
