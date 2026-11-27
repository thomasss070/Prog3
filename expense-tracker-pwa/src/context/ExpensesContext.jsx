import { createContext, useContext, useEffect, useState } from 'react';

const EXPENSES_KEY = '@expensetracker/expenses';

const ExpensesContext = createContext(null);

// Lectura síncrona y segura: si el JSON está dañado, arranca con lista vacía
function readExpenses() {
  try {
    const raw = localStorage.getItem(EXPENSES_KEY);
    if (raw === null) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Gastos guardados dañados, se empieza con lista vacía:', error);
    return [];
  }
}

export function ExpensesProvider({ children }) {
  // Hidratación: localStorage es síncrono, así que el valor inicial ya viene leído
  const [expenses, setExpenses] = useState(() => readExpenses());
  const isLoaded = true;

  // Persistencia: guarda cada vez que cambian los gastos
  useEffect(() => {
    try {
      localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.warn('No se pudieron guardar los gastos:', error);
    }
  }, [expenses]);

  const addExpense = (data) => {
    const newExpense = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      ...data,
      amount: Number(data.amount),
      createdAt: new Date().toISOString(),
    };
    setExpenses((currentExpenses) => [newExpense, ...currentExpenses]);
  };

  const removeExpense = (id) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <ExpensesContext.Provider value={{ expenses, isLoaded, addExpense, removeExpense }}>
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