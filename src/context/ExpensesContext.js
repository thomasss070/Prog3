import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSES_KEY = '@expensetracker/expenses';

const ExpensesContext = createContext(null);

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hidratación: lee lo guardado una sola vez al montar
  useEffect(() => {
    const hydrate = async () => {
      try {
        const raw = await AsyncStorage.getItem(EXPENSES_KEY);
        if (raw !== null) {
          setExpenses(JSON.parse(raw));
        }
      } catch (error) {
        console.warn('No se pudieron leer los gastos:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    hydrate();
  }, []);

  // Persistencia: guarda cada vez que cambian, solo si ya terminó la lectura
  useEffect(() => {
    if (!isLoaded) return;
    const persist = async () => {
      try {
        await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.warn('No se pudieron guardar los gastos:', error);
      }
    };
    persist();
  }, [expenses, isLoaded]);

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