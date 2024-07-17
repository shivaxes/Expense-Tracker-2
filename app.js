document.addEventListener('DOMContentLoaded', function() {
  const expenseNameInput = document.getElementById('expense-name');
  const expenseAmountInput = document.getElementById('expense-amount');
  const expenseCategoryInput = document.getElementById('expense-category');
  const addExpenseButton = document.getElementById('add-expense');
  const expenseList = document.getElementById('expense-list');

  const editExpenseForm = document.querySelector('.edit-expense-form');
  const editExpenseNameInput = document.getElementById('edit-expense-name');
  const editExpenseAmountInput = document.getElementById('edit-expense-amount');
  const editExpenseCategoryInput = document.getElementById('edit-expense-category');
  const saveExpenseButton = document.getElementById('save-expense');

  let editIndex = -1;

  // Load expenses from local storage
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Display expenses
  const displayExpenses = () => {
      expenseList.innerHTML = '';
      expenses.forEach((expense, index) => {
          const li = document.createElement('li');
          li.textContent = `${expense.name}: ${expense.amount} - ${expense.category}`;
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete Expense';
          deleteButton.onclick = () => {
              expenses.splice(index, 1);
              localStorage.setItem('expenses', JSON.stringify(expenses));
              displayExpenses();
          };
          li.appendChild(deleteButton);

          const editButton = document.createElement('button');
          editButton.textContent = 'Edit Expense';
          editButton.onclick = () => {
              editIndex = index;
              editExpenseNameInput.value = expense.name;
              editExpenseAmountInput.value = expense.amount;
              editExpenseCategoryInput.value = expense.category;
              editExpenseForm.style.display = 'block';
          };
          li.appendChild(editButton);

          expenseList.appendChild(li);
      });
  };

  // Add new expense
  addExpenseButton.addEventListener('click', () => {
      const name = expenseNameInput.value;
      const amount = expenseAmountInput.value;
      const category = expenseCategoryInput.value;

      if (name && amount && category) {
          const expense = { name, amount, category };
          expenses.push(expense);
          localStorage.setItem('expenses', JSON.stringify(expenses));
          displayExpenses();
          expenseNameInput.value = '';
          expenseAmountInput.value = '';
          expenseCategoryInput.value = '';
      }
  });

  // Save edited expense
  saveExpenseButton.addEventListener('click', () => {
      const name = editExpenseNameInput.value;
      const amount = editExpenseAmountInput.value;
      const category = editExpenseCategoryInput.value;

      if (name && amount && category && editIndex > -1) {
          expenses[editIndex] = { name, amount, category };
          localStorage.setItem('expenses', JSON.stringify(expenses));
          displayExpenses();
          editExpenseForm.style.display = 'none';
          editExpenseNameInput.value = '';
          editExpenseAmountInput.value = '';
          editExpenseCategoryInput.value = '';
          editIndex = -1;
      }
  });

  displayExpenses();
});
