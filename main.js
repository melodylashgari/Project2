const expenses = [];
const income = [];

//Local Storage
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

//Input elements
function getInput() {
  let elements = {
    type: document.getElementById("input-type"),
    description: document.getElementById("input-description"),
    ammount: document.getElementById("input-value"),
  };

  //Definera data object
  let inputData = {
    type: elements.type.value,
    description: elements.description.value,
    ammount: elements.ammount.value,
  };

  //Reset input values
  elements.type.value = "choose";
  elements.description.value = null;
  elements.ammount.value = null;

  //Lägg till values till expenses eller income
  if (inputData.type === "true") {
    income.push(inputData);
    renderTable("income-table", ["Beskrivning", "Summa"], income);
  } else {
    expenses.push(inputData);
    renderTable("expenses-table", ["Beskrivning", "Summa"], expenses);
  }
}
// Skapa inkomst och utgift listor

function renderTable(tableId, tableHeaderArray, data) {
  let table = document.getElementById(tableId);
  removeAllChildNodes(table);
  let tableHeadRow = document.createElement("tr");
  tableHeaderArray.forEach((colName) => {
    let col = document.createElement("th");
    col.innerText = colName;
    tableHeadRow.appendChild(col);
  });
  table.appendChild(tableHeadRow);
  data.forEach((colData) => {
    let dataRow = document.createElement("tr");
    let col1 = document.createElement("td");
    col1.innerText = colData.description;
    let col2 = document.createElement("td");
    col2.innerText = colData.ammount + "kr";
    dataRow.appendChild(col1);
    dataRow.appendChild(col2);
    table.appendChild(dataRow);
  });

  //Uppdatera värden i income
  let summa = 0;
  income.forEach((singleIncome) => {
    summa += Number(singleIncome.ammount);
    document.querySelector("#income").textContent = "+" + summa + "kr";
  });
//Uppdatera värden i expense
  let summaE = 0;
  income.forEach((singleExpense) => {
    summaE += Number(singleExpense.ammount);
    document.querySelector("#expense").textContent = "-" + summaE + "kr";
  });
//Uppdatera värden i balance
  let summaB = 0;
  income.forEach((singleBalance) => {
    summaB += Number(singleBalance.ammount);
    document.querySelector("#balance").textContent = summaB + "kr";
  });

  console.log(income);
  console.log(summa);
  console.log(expenses);

  //Tar bort alla html child elements från parent element
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}
