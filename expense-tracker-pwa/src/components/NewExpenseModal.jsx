import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useExpenses } from '../context/ExpensesContext';
import '../styles/NewExpenseModal.css';

const CATEGORIES = ['Comida', 'Transporte', 'Servicios'];

function NewExpenseModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState('');
  const { addExpense } = useExpenses();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory(CATEGORIES[0]);
    setError('');
  };

  // Se dispara al cerrar con Esc, con Cancelar o con dialog.close()
  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normaliza coma decimal y rechaza valores no numéricos o no positivos.
    const parsedAmount = Number(amount.trim().replace(',', '.'));

    if (!title.trim()) {
      setError('Ingresá el nombre del gasto.');
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError('Ingresá un monto numérico mayor que cero.');
      return;
    }

    // Agrega el gasto al contexto y cierra el modal
   addExpense({
   title: title.trim(),
   amount: parsedAmount,
   category,
   notes: '',
  });

    onClose();
  };

  // Click en el fondo oscuro (fuera del contenido) cierra el modal
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="expense-modal"
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      <h2 className="expense-modal__title">Nuevo gasto</h2>

      <form className="expense-modal__form" onSubmit={handleSubmit}>
        <div className="expense-modal__field">
          <label className="expense-modal__label" htmlFor="expense-title">
            Nombre del gasto
          </label>
          <input
            id="expense-title"
            className="expense-modal__input"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            placeholder="Ej: Supermercado"
            required
          />
        </div>

        <div className="expense-modal__field">
          <label className="expense-modal__label" htmlFor="expense-amount">
            Monto
          </label>
          <input
            id="expense-amount"
            className="expense-modal__input"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            placeholder="0"
            required
          />
        </div>

        <fieldset className="expense-modal__field">
          <legend className="expense-modal__label">Categoría</legend>
          <div className="expense-modal__chips">
            {CATEGORIES.map((cat) => (
              <label key={cat} className="expense-modal__chip">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {error ? (
          <p className="expense-modal__error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="expense-modal__actions">
          <button
            type="button"
            className="expense-modal__button"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="expense-modal__button expense-modal__button--primary"
          >
            Guardar
          </button>
        </div>
      </form>
    </dialog>,
    document.body
  );
}

export default NewExpenseModal;