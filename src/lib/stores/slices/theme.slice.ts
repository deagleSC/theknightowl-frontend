import { StateCreator } from 'zustand';

export interface ThemeSlice {
  theme: {
    mode: 'light' | 'dark' | 'system';
    isLoading: boolean;
    error: string | null;
    fontSize: 'sm' | 'md' | 'lg';
    fontFamily: 'montserrat' | 'inter' | 'roboto';
    contrast: 'normal' | 'high';
    animations: boolean;
    colorScheme: 'default' | 'deuteranopia' | 'protanopia' | 'tritanopia';
  };
  setTheme: (mode: 'light' | 'dark' | 'system') => void;
  setThemeLoading: (isLoading: boolean) => void;
  setThemeError: (error: string | null) => void;
  setFontSize: (size: 'sm' | 'md' | 'lg') => void;
  setFontFamily: (font: 'montserrat' | 'inter' | 'roboto') => void;
  setContrast: (contrast: 'normal' | 'high') => void;
  setAnimations: (enabled: boolean) => void;
  setColorScheme: (scheme: 'default' | 'deuteranopia' | 'protanopia' | 'tritanopia') => void;
}

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  theme: {
    mode: 'system',
    isLoading: false,
    error: null,
    fontSize: 'md',
    fontFamily: 'montserrat',
    contrast: 'normal',
    animations: true,
    colorScheme: 'default'
  },
  setTheme: (mode) =>
    set((state: ThemeSlice) => ({
      theme: {
        ...state.theme,
        mode,
        error: null,
      },
    })),
  setThemeLoading: (isLoading: boolean) =>
    set((state: ThemeSlice) => ({
      theme: {
        ...state.theme,
        isLoading,
      },
    })),
  setThemeError: (error: string | null) =>
    set((state: ThemeSlice) => ({
      theme: {
        ...state.theme,
        error,
      },
    })),
  setFontSize: (size) =>
    set((state: ThemeSlice) => ({
      theme: {
        ...state.theme,
        fontSize: size,
      },
    })),
  setFontFamily: (font) =>
    set((state: ThemeSlice) => ({
      theme: {
        ...state.theme,
        fontFamily: font,
      },
    })),
  setContrast: (contrast) =>
    set((state: ThemeSlice) => ({
      theme: {
        ...state.theme,
        contrast,
      },
    })),
  setAnimations: (enabled) =>
    set((state: ThemeSlice) => ({
      theme: {
        ...state.theme,
        animations: enabled,
      },
    })),
  setColorScheme: (scheme) =>
    set((state: ThemeSlice) => ({
      theme: {
        ...state.theme,
        colorScheme: scheme,
      },
    })),
})