import { Link, useNavigate, useParams } from 'react-router-dom';
import CategoryBadge from '../components/CategoryBadge';
import { useExpenses } from '../context/ExpensesContext';
import '../styles/ExpenseDetailScreen.css';

function ExpenseDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { expenses, removeExpense } = useExpenses();
  // Leer por id permite mostrar también el estado de enlace obsoleto/eliminado.
  const expense = expenses.find((item) => item.id === id);

  // Si se entró directo por la URL (o se recargó), no hay a dónde volver
  // dentro de la app: en ese caso se va al listado.
  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/expenses');
    }
  };

  const handleDelete = () => {
    if (!window.confirm(`¿Querés eliminar "${expense.title}"?`)) {
      return;
    }
    // Reemplaza el detalle en el historial para volver al listado sin dejarlo atrás.
    removeExpense(expense.id);
    navigate('/expenses', { replace: true });
  };

  if (!expense) {
    return (
      <div className="detail">
        <main className="detail__main">
          <h1 className="detail__title">Gasto no encontrado</h1>
          <p>No existe ningún gasto con el identificador "{id}".</p>
          <Link to="/expenses" className="detail__button">
            Ir al listado
          </Link>
        </main>
      </div>
    );
  }

 const fecha = new Date(expense.createdAt).toLocaleDateString('es-AR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

  return (
    <div className="detail">
      <header className="detail__header">
        <button type="button" className="detail__back" onClick={handleBack}>
          ← Volver
        </button>
      </header>

      <main className="detail__main">
        <h1 className="detail__title">{expense.title}</h1>

        <dl className="detail__list">
          <div className="detail__row">
            <dt>Monto</dt>
            <dd>${expense.amount.toLocaleString('es-AR')}</dd>
          </div>
          <div className="detail__row">
            <dt>Categoría</dt>
            <dd>
              <CategoryBadge category={expense.category} />
            </dd>
          </div>
          <div className="detail__row">
            <dt>Fecha</dt>
            <dd>{fecha}</dd>
          </div>
          <div className="detail__row">
            <dt>Notas</dt>
            <dd>{expense.notes || 'Sin notas'}</dd>
          </div>
        </dl>
        <button
          type="button"
          className="detail__button detail__button--danger"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </main>
    </div>
  );
}

export default ExpenseDetailScreen;