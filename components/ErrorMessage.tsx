import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../src/themes/theme';

type Props = {
	message?: string;
};

const ErrorMessage: React.FC<Props> = ({ message }) => {
	if (!message) return null;
	return (
		<View style={styles.container} accessibilityRole="alert">
			<Text style={styles.text}>{message}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: theme.spacing(2),
	},
	text: {
		color: theme.colors.danger,
	},
});

export default ErrorMessage;
