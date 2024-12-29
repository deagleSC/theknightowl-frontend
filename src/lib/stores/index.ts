import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createAuthSlice, type AuthSlice } from '@/lib/stores/slices/auth.slice';
import { createThemeSlice, type ThemeSlice } from '@/lib/stores/slices/theme.slice';
import { createSidebarSlice, type SidebarSlice } from '@/lib/stores/slices/sidebar.slice';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export type StoreState = AuthSlice & ThemeSlice & SidebarSlice

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createThemeSlice(...a),
      ...createSidebarSlice(...a),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        auth: state.auth,
        theme: state.theme,
      }),
    }
  )
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore);  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  (window as any).store = Object.fromEntries(Object.entries(useStore.getState()).filter(([_, value]) => typeof value !== 'function') );
} 