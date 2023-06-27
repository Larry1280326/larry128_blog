#include <iostream>
using namespace std;

int main() {
	// get matrix A
	int num_col_A, num_row_A;
	cout << "Enter the number of col for A: ";
	cin >> num_col_A;
	cout << "Enter the number of row for A: ";
	cin >> num_row_A;
	int A[100][100];
	int i;
	for (i = 0; i < num_row_A; i++) {
		int j;
		for (j = 0; j < num_col_A; j++) {
			cout << "A" << " " << i + 1 << " " << j + 1 << "? ";
			cin >> A[i][j];
		}
	}
	cout << "A=" << endl << "{ ";
	for (i = 0; i < num_row_A; i++) {
		int j;
		cout << endl;
		for (j = 0; j < num_col_A; j++) {
			cout << A[i][j] << " ";
		}
	}
	cout << endl << "}"<<endl<<endl;

	//get matrix B
	int num_col_B, num_row_B;
	cout << "Enter the number of col for B: ";
	cin >> num_col_B;
	cout << "Enter the number of row for B: ";
	cin >> num_row_B;
	int B[100][100];
	for (i = 0; i < num_row_B; i++) {
		int j;
		for (j = 0; j < num_col_B; j++) {
			cout << "B" <<" " << i + 1 << " " << j + 1 << "? ";
			cin >> B[i][j];
		}
	}
	cout << "B= "<<endl<<"{ ";
	for (i = 0; i < num_row_B; i++) {
		int j;
		cout << endl;
		for (j = 0; j < num_col_B; j++) {
			cout << B[i][j]<<" ";
		}
	}
	cout << endl << "}" << endl<<endl;

	//compute matrix AB
	int C[100][100];
	if (num_col_A == num_row_B) {
		for (i = 0; i < num_row_A; i++) {
			int j;
			for (j = 0; j < num_col_B; j++) {
				int k,this_sum=0;
				for (k = 0; k < num_col_A; k++) {
					this_sum = this_sum + (A[i][k]) * (B[k][j]);
				}
				C[i][j] = this_sum;
			}
		}
	}
	else {
		cout << "dude, number of col of A and number of row of B don't match...";
	}
	cout << "AB= " << endl << "{ ";
	for (i = 0; i < num_row_A; i++) {
		int j;
		cout << endl;
		for (j = 0; j < num_col_B; j++) {
			cout << B[i][j] << " ";
		}
	}
	cout << endl << "}" << endl;

	return 0;
}