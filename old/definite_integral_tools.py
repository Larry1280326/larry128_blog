import math


def get_function():
    # Get the function expression from the user and return the parsed function
    print("Enter the function you want to integrate (e.g., x**2): ")
    expression = input()
    print(expression)
    return lambda x: eval(expression)


def simpsons_rule(a, b, n, f):
    # Apply Simpson's rule to evaluate the integral of f(x) from a to b using n subintervals

    h = (b - a) / n  # Step size
    integral = 0

    for i in range(n + 1):
        x = a + i * h

        if i == 0 or i == n:
            integral += f(x)
        elif i % 2 == 0:
            integral += 2 * f(x)
        else:
            integral += 4 * f(x)

    integral *= h / 3

    return integral


# Instructions
print("This program evaluates the indefinite integral using Simpson's rule.")
print("Please follow the instructions to input the required values.")

# Get user inputs
print("Enter the lower limit of integration: ")
a = float(input())  # Lower limit of integration
print(a)
print("Enter the upper limit of integration: ")
b = float(input())  # Upper limit of integration
print(b)
print("Enter the number of subintervals: ")
n = int(input())  # Number of subintervals
print(n)

f = get_function()

result = simpsons_rule(a, b, n, f)
print("The value of the indefinite integral is: " + str(result))
