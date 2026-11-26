import { createContext, useContext, useState } from 'react';

const INITIAL_EXPENSES = [
  { id: '1', title: 'Supermercado', amount: 25000, category: 'Comida', notes: '', createdAt: new Date().toISOString() },
  { id: '2', title: 'Combustible', amount: 18000, category: 'Transporte', notes: '', createdAt: new Date().toISOString() },
  { id: '3', title: 'Internet', amount: 32000, category: 'Servicios', notes: '', createdAt: new Date().toISOString() },
];

const ExpensesContext = createContext(null);

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [isLoaded] = useState(true);

  const addExpense = (data) => {
    const newExpense = {
      id: Date.now().toString(),
      ...data,
      amount: Number(data.amount),
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <ExpensesContext.Provider value={{ expenses, isLoaded, addExpense, removeExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpensesContext);
}