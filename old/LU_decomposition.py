print("This program is to find the LU decomposition of a given square matrix A.\n")
def printm(Name,M):
    print(Name+"={")
    for i in range(len(M)):
        for j in range(len(M[i])):
            print(str(M[i][j]),end=" ")
        print("\n",end="") 
    print("}\n")

##some useful functions
def row_addition (this_row, that_row):
    after=[]
    for i in range(len(this_row)):
        after.append(this_row[i]+that_row[i])
    return after

def row_multiplication (this_row, the_scalar):
    after=[]
    for i in range(len(this_row)):
        after.append(this_row[i]*the_scalar)
    return after

def row_operation(this_row, that_row, col_index):
    if this_row[col_index]!=0:
        factor=-1*(that_row[col_index]/this_row[col_index])
        return row_addition(row_multiplication(this_row,factor), that_row)
    else:
        return that_row


##getting A
A=[]
num_row_A=int(input("please enter the number rows of A: "))
num_col_A=int(input("please enter the number columns of A: "))
if num_col_A==num_row_A:
    for i in range(num_col_A):
        thisrow=[]
        for j in range(num_row_A):
            this_element=float(input("please enter a["+str(i+1)+"]["+str(j+1)+"]:" ))
            thisrow.append(this_element)
        A.append(thisrow)
        print(A)
    ##decomposition
    #initialise L
    L=[]
    for i in range(num_row_A):
        thisrow=[]
        for j in range(num_col_A):
            if i==j:
                thisrow.append(float(1))
            else:
                thisrow.append(float(0))
        L.append(thisrow)
    print("\n")
    printm("A", A)
    #compute U&L
    U=A
    this_col_ind=0
    for i in range(num_row_A):
        for j in range(num_row_A-i-1):
            L[i+j+1][this_col_ind]=U[i+j+1][this_col_ind]/U[i][this_col_ind]
            U[i+j+1]=row_operation(U[i],U[i+j+1],this_col_ind)
        this_col_ind+=1
    printm("L",L)
    printm("U",U)
else:
    print("hey, A is not a square matrix......")
