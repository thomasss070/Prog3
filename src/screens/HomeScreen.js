// src/screens/HomeScreen.js

import { StyleSheet, Text, View, Button } from 'react-native';
import { useExpenses } from '../context/ExpensesContext';

export default function HomeScreen({ onNavegarAGastos, navigation }) {
  const { expenses } = useExpenses();
  // El resumen refleja las altas y bajas del Context sin mantener otro estado.
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ExpenseTracker</Text>
      <Text style={styles.subtitle}>¡Bienvenido/a!</Text>
      <Text style={styles.description}>
        Esta aplicación te permitirá registrar y administrar tus gastos diarios de forma sencilla.
      </Text>

    {expenses.length === 0 ? (
  <Text style={styles.emptyMessage}>Todavía no registraste gastos.</Text>
) : (
  <View style={styles.summary}>
    <Text style={styles.summaryText}>
      Total registrado: ${total.toLocaleString('es-AR')}
    </Text>
    <Text style={styles.summaryText}>
      Movimientos: {expenses.length}
    </Text>
  </View>
)}

      <View style={styles.buttonContainer}>
        <Button 
          title="Cargar Nuevo Gasto" 
          onPress={() => navigation.navigate('Gastos')}

          color="#007AFF" 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  emptyMessage: { color: '#666', fontSize: 16, textAlign: 'center' },
  summary: { alignItems: 'center', marginVertical: 16 },
  summaryText: { fontSize: 16, fontWeight: '600', marginVertical: 4 },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
 