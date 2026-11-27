import { createContext, useContext, useState } from 'react';
import { mockExpenses } from '../data/mockExpenses';

const ExpensesContext = createContext(null);

export function ExpensesProvider({ children }) {
  // Conserva los ejemplos existentes como datos iniciales de la aplicación.
  const [expenses, setExpenses] = useState(mockExpenses);

  const addExpense = (data) => {
    const newExpense = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      ...data,
      // El Context mantiene el monto numérico para los cálculos de la app.
      amount: Number(data.amount),
    };
    setExpenses((currentExpenses) => [newExpense, ...currentExpenses]);
  };

  const removeExpense = (id) => {
    // Las pantallas consumidoras reciben inmediatamente la lista actualizada.
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    );
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
    throw new Error('useExpenses debe usarse dentro de ExpensesProvider.');
  }
  return context;
}
