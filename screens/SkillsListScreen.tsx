import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../src/themes/theme';
import { getSkills, deleteSkill } from '../services/api';
import type { Skill } from '../src/types/skills';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import SkillCard from '../components/SkillCard';
import type { RootStackParamList } from '../navigation/types';

type ListNav = NativeStackNavigationProp<RootStackParamList, 'SkillsList'>;

const SkillsListScreen: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigation = useNavigation<ListNav>();

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getSkills();
      setSkills(data);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar as skills. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void loadSkills();
    }, [])
  );

  const handleDelete = (id: number) => {
    Alert.alert('Excluir skill', 'Tem certeza que deseja excluir esta skill?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteSkill(id);
            setSkills((prev) => prev.filter((s) => s.id !== id));
          } catch (err) {
            Alert.alert('Erro', 'Não foi possível excluir a skill.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ErrorMessage message={error} />

      {loading && !skills.length ? (
        <Loading />
      ) : (
        <FlatList
          data={skills}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadSkills} />
          }
          renderItem={({ item }) => (
            <SkillCard
              skill={item}
              onPress={() =>
                navigation.navigate('SkillDetail', { id: item.id })
              }
              onDelete={() => handleDelete(item.id)}
            />
          )}
          ListEmptyComponent={
            !loading ? (
              <Text style={styles.empty}>
                Nenhuma skill cadastrada ainda. Comece adicionando uma!
              </Text>
            ) : null
          }
        />
      )}

      {/* Botão flutuante simples */}
      <View style={styles.fabWrapper} pointerEvents="box-none">
        <View style={styles.fabContainer}>
          <Text
            style={styles.fab}
            accessibilityRole="button"
            onPress={() => navigation.navigate('NewSkill')}
          >
            +
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing(2),
  },
  empty: {
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
  fabWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  fabContainer: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default SkillsListScreen;
