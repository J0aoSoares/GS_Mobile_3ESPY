import React from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { theme } from '../src/themes/theme';
import type { Skill } from '../src/types/skills';

interface SkillCardProps {
  skill: Skill;
  onPress?: (event: GestureResponderEvent) => void;
  onDelete?: (event: GestureResponderEvent) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onPress, onDelete }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.7 : 1 }]}
      accessibilityRole="button"
      accessibilityLabel={`Skill ${skill.name}, nível atual ${skill.level}`}
    >
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.name}>{skill.name}</Text>
          {skill.category ? (
            <Text style={styles.category}>{skill.category}</Text>
          ) : null}
          <Text style={styles.level}>
            Nível atual: {skill.level} / alvo: {skill.targetLevel}
          </Text>
        </View>

        {onDelete && (
          <Pressable
            onPress={onDelete}
            style={styles.deleteButton}
            accessibilityRole="button"
            accessibilityLabel={`Remover skill ${skill.name}`}
          >
            <Text style={styles.deleteText}>Excluir</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginRight: theme.spacing(1),
  },
  name: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  category: {
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  level: {
    color: theme.colors.text,
    marginTop: 4,
  },
  deleteButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.danger,
  },
  deleteText: {
    color: theme.colors.danger,
    fontWeight: '600',
    fontSize: 12,
  },
});

export default SkillCard;
