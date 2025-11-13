import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../src/themes/theme';
import { createSkill } from '../services/api';
import ErrorMessage from '../components/ErrorMessage';
import type { SkillPayload } from '../src/types/skills';
import type { RootStackParamList } from '../navigation/types';

type NewNav = NativeStackNavigationProp<RootStackParamList, 'NewSkill'>;

const NewSkillScreen: React.FC = () => {
  const navigation = useNavigation<NewNav>();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('1');
  const [targetLevel, setTargetLevel] = useState('3');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Nome da skill é obrigatório.');
      return;
    }

    const payload: SkillPayload = {
      name,
      category: category || undefined,
      level: Number(level) || 1,
      targetLevel: Number(targetLevel) || 3,
      deadline: deadline || undefined,
      notes: notes || undefined,
    };

    try {
      setSaving(true);
      setError('');
      await createSkill(payload);
      Alert.alert('Sucesso', 'Skill criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar skill. Verifique a API.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: theme.spacing(4) }}
    >
      <ErrorMessage message={error} />

      <Text style={styles.label}>Nome da skill *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ex: Machine Learning"
        placeholderTextColor={theme.colors.textMuted}
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Ex: Tecnologia"
        placeholderTextColor={theme.colors.textMuted}
      />

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Nível atual (1-3)</Text>
          <TextInput
            style={styles.input}
            value={level}
            onChangeText={setLevel}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Nível alvo (1-3)</Text>
          <TextInput
            style={styles.input}
            value={targetLevel}
            onChangeText={setTargetLevel}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Text style={styles.label}>Prazo (AAAA-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={deadline}
        onChangeText={setDeadline}
        placeholder="2025-12-31"
        placeholderTextColor={theme.colors.textMuted}
      />

      <Text style={styles.label}>Notas / plano de ação</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <Pressable
        style={[styles.button, saving && { opacity: 0.7 }]}
        onPress={handleSave}
        disabled={saving}
      >
        <Text style={styles.buttonText}>
          {saving ? 'Salvando...' : 'Salvar skill'}
        </Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing(2),
  },
  label: {
    color: theme.colors.text,
    marginBottom: 4,
    marginTop: theme.spacing(1),
  },
  input: {
    backgroundColor: theme.colors.card,
    color: theme.colors.text,
    borderRadius: theme.radius.md,
    padding: theme.spacing(1.5),
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop: theme.spacing(1),
  },
  col: {
    flex: 1,
    marginRight: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: '600',
  },
});

export default NewSkillScreen;
