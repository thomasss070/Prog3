import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../services/firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

const ExpensesContext = createContext(null);

export function ExpensesProvider({ children }) {
  // Estado de gastos sincronizado desde Firestore y bandera de primera carga
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Suscripción en tiempo real a la colección "expenses" ordenada por fecha descendente
  useEffect(() => {
    const q = query(collection(db, 'expenses'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((document) => {
          // estimate evita que createdAt sea null mientras la escritura está pendiente offline
          const data = document.data({ serverTimestamps: 'estimate' });
          return {
            id: document.id,
            ...data,
          };
        });

        setExpenses(items);
        setIsLoaded(true);
      },
      (error) => {
        console.error('Error al escuchar gastos en Firestore:', error);
        setIsLoaded(true);
      }
    );

    // Cancela la suscripción cuando el Provider se desmonta
    return () => unsubscribe();
  }, []);

  // Alta en Firestore: no bloquea con await para que el modal cierre al instante (Optimistic UI)
  const addExpense = (data) => {
    const newExpense = {
      title: data.title.trim(),
      amount: Number(data.amount),
      category: data.category,
      notes: data.notes ? data.notes.trim() : '',
      createdAt: serverTimestamp(),
    };

    addDoc(collection(db, 'expenses'), newExpense).catch((error) => {
      console.error('Error al guardar el gasto en Firestore:', error);
    });
  };

  // Baja en Firestore por ID de documento; onSnapshot actualiza ambas apps al instante
  const removeExpense = async (id) => {
    try {
      await deleteDoc(doc(db, 'expenses', id));
    } catch (error) {
      console.error('Error al eliminar el gasto en Firestore:', error);
    }
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