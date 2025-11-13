import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { theme } from '../src/themes/theme';

const Loading: React.FC = () => (
  <View style={styles.container} accessible accessibilityLabel="Carregando dados">
    <ActivityIndicator size="large" color={theme.colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
