import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../src/themes/theme';
import type { RootStackParamList } from '../navigation/types';

type HomeNav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNav>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Future Skills Tracker</Text>
      <Text style={styles.subtitle}>
        Organize suas competências para o futuro do trabalho.
      </Text>

      <View style={styles.buttons}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('SkillsList')}
        >
          <Text style={styles.buttonText}>Minhas Skills</Text>
        </Pressable>

        <Pressable
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('NewSkill')}
        >
          <Text style={styles.buttonText}>Cadastrar Nova Skill</Text>
        </Pressable>

        <Pressable
          style={styles.buttonOutline}
          onPress={() => navigation.navigate('Insights')}
        >
          <Text style={styles.buttonText}>Ver Insights</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing(3),
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 16,
    marginBottom: theme.spacing(4),
  },
  buttons: {
    marginTop: theme.spacing(1),
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing(2),
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
  },
  buttonSecondary: {
    backgroundColor: theme.colors.primaryDark,
    padding: theme.spacing(2),
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
  },
  buttonOutline: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    padding: theme.spacing(2),
    borderRadius: theme.radius.lg,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: '600',
  },
});

export default HomeScreen;
