import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useExpenses } from '../context/ExpensesContext';

export default function ExpenseDetailScreen({ route, navigation }) {
  const { expenses, removeExpense } = useExpenses();
  // La navegación pasa el id para que el detalle siempre lea el estado actual.
  const expense = expenses.find((e) => e.id === route.params.id);

  // Si el gasto ya no existe (por ejemplo, justo después de eliminarlo)
  if (!expense) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>No se encontró el gasto.</Text>
      </View>
    );
  }

  const handleEliminar = () => {
    Alert.alert('Eliminar gasto', `¿Querés eliminar "${expense.title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          // El usuario confirmó; se elimina y se vuelve al listado.
          removeExpense(expense.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{expense.title}</Text>
      <Text style={styles.amount}>${expense.amount}</Text>

      <Text style={styles.label}>Categoría</Text>
      <Text style={styles.value}>{expense.category || 'Sin categoría'}</Text>

      <Text style={styles.label}>Fecha</Text>
      <Text style={styles.value}>
        {new Date(expense.createdAt).toLocaleDateString('es-AR')}
      </Text>

      {expense.notes ? (
        <>
          <Text style={styles.label}>Notas</Text>
          <Text style={styles.value}>{expense.notes}</Text>
        </>
      ) : null}

      <View style={styles.buttonContainer}>
        <Button title="Eliminar gasto" onPress={handleEliminar} color="#d32f2f" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  amount: { fontSize: 20, color: '#007AFF', marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginTop: 12 },
  value: { fontSize: 16, color: '#333' },
  buttonContainer: { marginTop: 30 },
});