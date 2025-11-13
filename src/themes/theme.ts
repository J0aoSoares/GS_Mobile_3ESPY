export const theme = {
  colors: {
    background: '#020617',
    card: '#0f172a',
    primary: '#0ea5e9',
    primaryDark: '#0369a1',
    text: '#e2e8f0',
    textMuted: '#64748b',
    danger: '#f97316',
    border: '#1e293b',
  },
  spacing(multiplier = 1) {
    return 8 * multiplier;
  },
  radius: {
    md: 12,
    lg: 20,
  },
};

export type Theme = typeof theme;
