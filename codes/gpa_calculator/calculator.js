const points = {
    "A+": 4.3,
    A: 4,
    "A-": 3.7,
    "B+": 3.3,
    B: 3,
    "B-": 2.7,
    "C+": 2.3,
    C: 2,
    "C-": 1.7,
    D: 1,
    F: 0,
  };
  
  function addRow() {
    const table = document
      .getElementById("dataEntryTable")
      .getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    cell1.innerHTML = '<input type="text" placeholder="Course Code" />';
    cell2.innerHTML = '<input type="number" placeholder="Credits" />';
    cell3.innerHTML = '<input type="text" placeholder="Grade" />';
  }
  
  function removeRow() {
    const table = document
      .getElementById("dataEntryTable")
      .getElementsByTagName("tbody")[0];
    const rows = table.getElementsByTagName("tr");
  
    if (rows.length > 1) {
      table.deleteRow(rows.length - 1);
    } else {
      alert("At least one row must remain.");
    }
  }
  
  function clearEntries() {
    const tableBody = document
      .getElementById("dataEntryTable")
      .getElementsByTagName("tbody")[0];
    // Clear all rows except the header row
    while (tableBody.rows.length > 0) {
      tableBody.deleteRow(0);
    }
    // Optionally, add back the initial empty row
    addRow();
  }
  
  let GPA = 0;
  let cumulativePoints = 0;
  let totalCredits = 0;
  
  function submit() {
    cumulativePoints = 0; // Reset cumulative points
    totalCredits = 0; // Reset total credits
  
    const rows = document.querySelectorAll("tbody tr");
  
    rows.forEach((row) => {
      const credit = parseFloat(row.cells[1].querySelector("input").value) || 0;
      const grade = row.cells[2].querySelector("input").value;
      const point = points[grade] || 0; // Default to 0 if grade is invalid
  
      cumulativePoints += credit * point;
      totalCredits += credit;
    });
  
    GPA = totalCredits > 0 ? (cumulativePoints / totalCredits).toFixed(3) : 0;
    document.getElementById("GPA").innerHTML = "Your CGPA is " + GPA + ".";
  }
  