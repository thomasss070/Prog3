import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { ExpensesProvider, useExpenses } from './src/context/ExpensesContext';
import { SettingsProvider, useSettings } from './src/context/settingsContext';

function AppContent() {
  const { isLoaded: expensesLoaded } = useExpenses();
  const { settings, isLoaded: settingsLoaded } = useSettings();

  if (!expensesLoaded || !settingsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={settings.darkMode ? DarkTheme : DefaultTheme}>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <ExpensesProvider>
        <AppContent />
      </ExpensesProvider>
    </SettingsProvider>
  );
}

