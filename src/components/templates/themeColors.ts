import { ColorTheme } from '../../types';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  accentBg: string;
}

export const themeMap: Record<ColorTheme, ThemeColors> = {
  blue: {
    primary: '#2563eb', // Blue 600
    primaryLight: '#eff6ff',
    primaryDark: '#1d4ed8',
    border: '#bfdbfe',
    badgeBg: '#dbeafe',
    badgeText: '#1e40af',
    accentBg: '#3b82f6',
  },
  purple: {
    primary: '#7c3aed', // Violet 600
    primaryLight: '#f5f3ff',
    primaryDark: '#6d28d9',
    border: '#ddd6fe',
    badgeBg: '#ede9fe',
    badgeText: '#5b21b6',
    accentBg: '#8b5cf6',
  },
  emerald: {
    primary: '#059669', // Emerald 600
    primaryLight: '#ecfdf5',
    primaryDark: '#047857',
    border: '#a7f3d0',
    badgeBg: '#d1fae5',
    badgeText: '#065f46',
    accentBg: '#10b981',
  },
  slate: {
    primary: '#334155', // Slate 700
    primaryLight: '#f8fafc',
    primaryDark: '#1e293b',
    border: '#cbd5e1',
    badgeBg: '#e2e8f0',
    badgeText: '#0f172a',
    accentBg: '#475569',
  },
  amber: {
    primary: '#d97706', // Amber 600
    primaryLight: '#fffbeb',
    primaryDark: '#b45309',
    border: '#fde68a',
    badgeBg: '#fef3c7',
    badgeText: '#92400e',
    accentBg: '#f59e0b',
  },
  rose: {
    primary: '#e11d48', // Rose 600
    primaryLight: '#fff1f2',
    primaryDark: '#be123c',
    border: '#fecdd3',
    badgeBg: '#ffe4e6',
    badgeText: '#9f1239',
    accentBg: '#f43f5e',
  },
};
