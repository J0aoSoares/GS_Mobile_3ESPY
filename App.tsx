import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SkillsListScreen from './screens/SkillsListScreen';
import NewSkillScreen from './screens/NewSkillScreen';
import SkillDetailScreen from './screens/SkillDetailScreen';
import InsightsScreen from './src/types/InsightsScreen';
import type { RootStackParamList } from './navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0f766e' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: '#020617' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Future Skills' }}
        />
        <Stack.Screen
          name="SkillsList"
          component={SkillsListScreen}
          options={{ title: 'Minhas Skills' }}
        />
        <Stack.Screen
          name="NewSkill"
          component={NewSkillScreen}
          options={{ title: 'Nova Skill' }}
        />
        <Stack.Screen
          name="SkillDetail"
          component={SkillDetailScreen}
          options={{ title: 'Detalhes da Skill' }}
        />
        <Stack.Screen
          name="Insights"
          component={InsightsScreen}
          options={{ title: 'Insights' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
