import ExpenseCard from '../components/ExpenseCard';
import { useExpenses } from '../context/ExpensesContext';
import '../styles/ExpensesScreen.css';

function ExpensesScreen({ onNewExpense }) {
  const { expenses } = useExpenses();
  // El total usa la misma lista compartida que se muestra debajo.
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="expenses">
      <header className="expenses__header">
        <h1 className="expenses__title">Mis gastos</h1>
      </header>

      <main className="expenses__main">
        <ul className="expenses__list">
          {expenses.length === 0 ? (
            <li className="expenses__empty">Todavía no registraste gastos.</li>
          ) : expenses.map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </ul>

        <div className="expenses__total">
          <span>Total</span>
          <span>${total.toLocaleString('es-AR')}</span>
        </div>

        <button
          type="button"
          className="expenses__button"
          onClick={onNewExpense}
        >
          Agregar gasto
        </button>
      </main>
    </div>
  );
}

export default ExpensesScreen;