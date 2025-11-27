import { siteConfig } from '../config/site';

/**
 * Custom hook to access commonly used styles from siteConfig
 * Eliminates repetitive destructuring across components
 */
export const useStyles = () => {
    const { fonts, colors, spacing, transitions } = siteConfig.styles;

    return {
        fonts: {
            primary: fonts.primary,
            secondary: fonts.secondary,
            display: fonts.display,
        },
        colors: {
            primary: colors.primary,
            secondary: colors.secondary,
            muted: colors.muted,
            accent: colors.accent,
            background: colors.background,
            surface: colors.surface,
            border: colors.border,
            hover: colors.hover,
            focus: colors.focus,
            success: colors.success,
            warning: colors.warning,
            error: colors.error,
        },
        spacing,
        transitions,
    };
};
