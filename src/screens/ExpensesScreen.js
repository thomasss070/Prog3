import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ExpenseItem from '../components/ExpensesItem';
import { useExpenses } from '../context/ExpensesContext';

export default function ExpensesScreen({ navigation }) {
  const { expenses } = useExpenses();
  const { colors } = useTheme();
  // El total se deriva del mismo estado que alimenta las filas de la lista.
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  // La navegación envía solo el id; el detalle consulta el gasto en el Context.
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Mis gastos</Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={[styles.emptyMessage, { color: colors.text }]}>
            Todavía no registraste gastos.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetalleGasto', { id: item.id })}
          >
            <ExpenseItem
              description={item.title}
              amount={item.amount}
              category={item.category}
            />
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
            <Text style={[styles.totalAmount, { color: colors.text }]}>${total}</Text>
          </View>
        }
      />

      <Button
        title="Agregar gasto"
        onPress={() => navigation.navigate('NuevoGasto')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  emptyMessage: { color: '#666', fontSize: 16, paddingVertical: 24, textAlign: 'center' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalAmount: { fontSize: 18, fontWeight: 'bold' },
});