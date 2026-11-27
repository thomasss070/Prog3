import { createContext, useContext, useState } from 'react';

const ExpensesContext = createContext(null);

// Ejemplos iniciales; al borrar todos, las pantallas muestran el estado vacío.
const INITIAL_EXPENSES = [
  { id: '1', title: 'Supermercado', amount: 25000, category: 'Comida', notes: '', createdAt: new Date().toISOString() },
  { id: '2', title: 'Combustible', amount: 18000, category: 'Transporte', notes: '', createdAt: new Date().toISOString() },
  { id: '3', title: 'Internet', amount: 32000, category: 'Servicios', notes: '', createdAt: new Date().toISOString() },
];

export function ExpensesProvider({ children }) {
  // Mantiene los gastos disponibles para todas las pantallas durante la sesión.
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

  const addExpense = (data) => {
    const newExpense = {
      id: Date.now().toString(),
      ...data,
      // Los totales y resúmenes necesitan operar con montos numéricos.
      amount: Number(data.amount),
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const removeExpense = (id) => {
    // Cambiar el estado compartido actualiza a la vez el listado y los resúmenes.
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, removeExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    // Detecta pantallas que no estén dentro del ExpensesProvider.
    throw new Error('useExpenses debe usarse dentro de ExpensesProvider.');
  }
  return context;
}