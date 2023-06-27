A=[]

A_r_length= int(input('how many rows does A have? '))
A_c_length= int(input('how many columns does A have? '))

for i in range(A_r_length):
    A.append([])
    for j in range(A_c_length):
        A[i].append(int(input("A"+str(i+1)+str(j+1)+"? ")))
        print(A)
print("A =",A)



B=[]

B_r_length= int(input('how many rows does B have? '))
B_c_length= int(input('how many columns does B have? '))

for i in range(B_r_length):
    B.append([])
    for j in range(B_c_length):
        B[i].append(int(input("B"+str(i+1)+str(j+1)+"? ")))
        print(B)
print("B =",B)



C=[]
C_r_length=A_r_length
C_c_length=B_c_length
    
#compare A_c_length and B_r_length
if A_c_length==B_r_length:
    for i in range(C_r_length):
        C.append([])
        for j in range(C_c_length):
            value=0
            for k in range(A_c_length):
               value= value+A[i][k]*B[k][j]
            C[i].append(value)
            print(C)
    print("A =", str(A))
    print("B =", str(B))
    print("AB =",str(C))
else:
    print("error: number of rows of A and number of column of B should be the same!")
    

    