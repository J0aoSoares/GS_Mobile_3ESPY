import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../src/themes/theme';
import { getSkillById, updateSkill, deleteSkill } from '../services/api';
import type { Skill, SkillPayload } from '../src/types/skills';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'SkillDetail'>;

const SkillDetailScreen = function SkillDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SkillDetail'>) {
  const { id } = route.params;

  const [skill, setSkill] = useState<Skill | null>(null);
  const [error, setError] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadSkill = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getSkillById(id);
      setSkill(data);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar detalhes da skill.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSkill();
  }, [id]);

  const handleSave = async () => {
    if (!skill) return;

    const payload: SkillPayload = {
      name: skill.name,
      category: skill.category,
      level: skill.level,
      targetLevel: skill.targetLevel,
      deadline: skill.deadline,
      notes: skill.notes,
    };

    try {
      setSaving(true);
      setError('');
      await updateSkill(id, payload);
      Alert.alert('Sucesso', 'Skill atualizada!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar skill. Verifique a API.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir skill',
      'Tem certeza que deseja excluir esta skill?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteSkill(id);
              navigation.navigate('SkillsList');
            } catch (err) {
              Alert.alert(
                'Erro',
                'Não foi possível excluir a skill. Tente novamente.'
              );
            }
          },
        },
      ]
    );
  };

  const setField = <K extends keyof Skill>(
    field: K,
    value: string
  ): void => {
    setSkill((prev) => {
      if (!prev) return prev;
      const parsed =
        field === 'level' || field === 'targetLevel'
          ? Number(value || '0')
          : value;

      return {
        ...prev,
        [field]: parsed as Skill[K],
      };
    });
  };

  if (loading || !skill) {
    return (
      <View style={styles.container}>
        {error ? <ErrorMessage message={error} /> : <Loading />}
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: theme.spacing(4) }}
    >
      <ErrorMessage message={error} />

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={skill.name}
        onChangeText={(v) => setField('name', v)}
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        value={skill.category ?? ''}
        onChangeText={(v) => setField('category', v)}
      />

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Nível atual (1-3)</Text>
          <TextInput
            style={styles.input}
            value={String(skill.level ?? '')}
            onChangeText={(v) => setField('level', v)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Nível alvo (1-3)</Text>
          <TextInput
            style={styles.input}
            value={String(skill.targetLevel ?? '')}
            onChangeText={(v) => setField('targetLevel', v)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Text style={styles.label}>Prazo (AAAA-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={skill.deadline ?? ''}
        onChangeText={(v) => setField('deadline', v)}
      />

      <Text style={styles.label}>Notas</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={skill.notes ?? ''}
        onChangeText={(v) => setField('notes', v)}
        multiline
      />

      <Pressable
        style={[styles.button, saving && { opacity: 0.7 }]}
        onPress={handleSave}
        disabled={saving}
      >
        <Text style={styles.buttonText}>
          {saving ? 'Salvando...' : 'Salvar alterações'}
        </Text>
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Excluir skill</Text>
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
  deleteButton: {
    marginTop: theme.spacing(2),
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.danger,
    padding: theme.spacing(2),
    alignItems: 'center',
  },
  deleteText: {
    color: theme.colors.danger,
    fontWeight: '600',
  },
});

export default SkillDetailScreen;
