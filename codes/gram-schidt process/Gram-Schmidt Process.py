import math
# Gram-Schmidt Process is to turn a linearly independent basis into an orthogonal basis


def innerproduct(A, B):
    D = 0
    for i in range(len(A)):
        D += A[i]*B[i]
    return D


def scalar_times_vector(S, V):
    U = []
    for i in range(len(V)):
        U.append(S*V[i])
    return U


def addition_of_vectors(V1, V2):
    U = []
    for i in range(len(V1)):
        U.append(V1[i]+V2[i])
    return U


def normalize(V):
    M = 0
    U = []
    for i in range(len(V)):
        M += (V[i])**2
    M = M**(1/2)
    for i in range(len(V)):
        U.append(V[i]/M)
    return U


Basis = []  # linearly independent basis
no_of_vectors = int(input("Please enter the number of vectors in the basis: "))
len_of_vectors = int(input("Please enter the length of each vector in the basis: "))
for i in range(no_of_vectors):
    this_vector = []
    for j in range(len_of_vectors):
        this_element = int(input("Please enter the "+str(j+1) +
                           "th element in the "+str(i+1)+"th vector: "))
        this_vector.append(this_element)
    Basis.append(this_vector)
    print("The original basis is:", Basis)

GS = []  # initial the list for after-Gram-Schmidt Process

for i in range(len(Basis)):
    if i == 0:
        GS.append(Basis[i])  # U1=V1
    else:  # UN=VN-(U1VN)U1/(U1U1)-...
        this_GS_vector = []
        for j in range(i):
            if j == 0:
                this_inner_product1 = innerproduct(GS[i-1], Basis[i])
                this_inner_product2 = innerproduct(GS[i-1], GS[i-1])
                this_GS_vector = addition_of_vectors(Basis[i], scalar_times_vector(
                    -1, scalar_times_vector((this_inner_product1/this_inner_product2), GS[i-1])))
            else:
                this_inner_product1 = innerproduct(GS[i-1], Basis[i])
                this_inner_product2 = innerproduct(GS[i-1], GS[i-1])
                this_GS_vector = addition_of_vectors(this_GS_vector, scalar_times_vector(
                    -1, scalar_times_vector((this_inner_product1/this_inner_product2), GS[i-1])))
        GS.append(this_GS_vector)
for i in range(len(GS)):
    GS[i] = normalize(GS[i])

print("The basis after Gram-Schmidt Process is:", GS)
