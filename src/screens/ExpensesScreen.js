
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import ExpenseItem from '../components/ExpensesItem';
import { useExpenses } from '../context/ExpensesContext';

export default function ExpensesScreen({ navigation }) {
  const { expenses } = useExpenses();
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis gastos</Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem
            description={item.title}
            amount={item.amount}
            category={item.category}
          />
        )}
        ListFooterComponent={
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>${total}</Text>
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
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalAmount: { fontSize: 18, fontWeight: 'bold' },
});