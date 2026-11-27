import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import {CATEGORY_STYLES } from '../data/categories'
 
export default function ExpenseItem({ description, amount, category }) {
  const { colors } = useTheme();
  const { icon, color } = CATEGORY_STYLES[category] || { icon: 'pricetag', color: '#999' };

  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <Ionicons name={icon} size={24} color={color} />
      <Text style={[styles.description, { color: colors.text }]}>{description}</Text>
      <Text style={[styles.amount, { color }]}>${amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  description: { flex: 1, fontSize: 16, marginLeft: 12 },
  amount: { fontSize: 16, fontWeight: '600' },
});