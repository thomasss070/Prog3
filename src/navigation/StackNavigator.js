import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import NewExpenseModal from '../screens/NewExpenseModal';
import ExpenseDetailScreen from '../screens/ExpenseDetailScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
  
      <Stack.Screen
        name="NuevoGasto"
        component={NewExpenseModal}
        options={{ title: 'Nuevo gasto', presentation: 'modal' }}
      />

      <Stack.Screen
        name="DetalleGasto"
        component={ExpenseDetailScreen}
        options={{ title: 'Detalle del gasto' }}
/>

    </Stack.Navigator>

    
  );
}