import { useState } from 'react';
import AppRouter from './router/AppRouter';
import InstallBanner from './components/InstallBanner';
import NewExpenseModal from './components/NewExpenseModal';
import { ExpensesProvider } from './context/ExpensesContext';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  // Comparte los gastos entre rutas y el formulario que se monta en el portal.
  return (
    <ExpensesProvider>
      <>
        <AppRouter onNewExpense={() => setModalOpen(true)} />
        <InstallBanner />
        <NewExpenseModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    </ExpensesProvider>
  );
}

export default App;