import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../themes/theme";
import { getSkills} from "../../services/api";
import type { Skill } from "./skills";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const InsightsScreen: React.FC = () => {
    const [skills, setSkills] = React.useState<Skill[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string>("");

    const load = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await getSkills();
            setSkills(data);
        } catch (err) {
            console.error(err);
            setError("Não foi possível carregar as skills. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void load();
    }, []);

    const total = skills.length;
    const concluidas = skills.filter((s) => s.level >= s.targetLevel).length;
    const pendentes = total - concluidas;

    return (
    <View style={styles.container}>
      <ErrorMessage message={error} />

      {loading ? (
        <Loading />
      ) : (
        <>
          <Text style={styles.title}>Resumo do seu plano</Text>

          <View style={styles.card}>
            <Text style={styles.value}>{total}</Text>
            <Text style={styles.label}>skills cadastradas</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.cardSmall}>
              <Text style={styles.value}>{concluidas}</Text>
              <Text style={styles.label}>alvo atingido</Text>
            </View>
            <View style={styles.cardSmall}>
              <Text style={styles.value}>{pendentes}</Text>
              <Text style={styles.label}>em andamento</Text>
            </View>
          </View>

          <Text style={styles.text}>
            Foque em competências-chave do futuro do trabalho como pensamento
            crítico, colaboração, uso de IA e aprendizado contínuo.
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing(3),
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: theme.spacing(3),
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(3),
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  value: {
    color: theme.colors.primary,
    fontSize: 32,
    fontWeight: '800',
  },
  label: {
    color: theme.colors.textMuted,
  },
  row: {
    flexDirection: 'row',
    marginBottom: theme.spacing(3),
  },
  cardSmall: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    alignItems: 'center',
    borderColor: theme.colors.border,
    borderWidth: 1,
    marginRight: theme.spacing(1),
  },
  text: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
});

export default InsightsScreen;