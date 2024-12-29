import { StateCreator } from 'zustand';

export interface SidebarSlice {
  sidebar: {
    isOpen: boolean;
    isMobileOpen: boolean;
    isLoading: boolean;
    error: string | null;
    width: number;
    position: 'left' | 'right';
    variant: 'default' | 'minimal' | 'compact';
    transparency: number;
    showLabels: boolean;
    pinnedItems: string[];
    recentItems: string[];
  };
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setSidebarMobileOpen: (isOpen: boolean) => void;
  setSidebarLoading: (isLoading: boolean) => void;
  setSidebarError: (error: string | null) => void;
  setSidebarWidth: (width: number) => void;
  setSidebarPosition: (position: 'left' | 'right') => void;
  setSidebarVariant: (variant: 'default' | 'minimal' | 'compact') => void;
  setSidebarTransparency: (transparency: number) => void;
  setShowLabels: (show: boolean) => void;
  pinItem: (itemId: string) => void;
  unpinItem: (itemId: string) => void;
  addRecentItem: (itemId: string) => void;
}

export const createSidebarSlice: StateCreator<SidebarSlice> = (set) => ({
  sidebar: {
    isOpen: true,
    isMobileOpen: false,
    isLoading: false,
    error: null,
    width: 256,
    position: 'left',
    variant: 'default',
    transparency: 1,
    showLabels: true,
    pinnedItems: [],
    recentItems: []
  },
  toggleSidebar: () =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        isOpen: !state.sidebar.isOpen,
        error: null,
      },
    })),
  toggleMobileSidebar: () =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        isMobileOpen: !state.sidebar.isMobileOpen,
        error: null,
      },
    })),
  setSidebarOpen: (isOpen: boolean) =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        isOpen,
        error: null,
      },
    })),
  setSidebarMobileOpen: (isOpen: boolean) =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        isMobileOpen: isOpen,
        error: null,
      },
    })),
  setSidebarLoading: (isLoading: boolean) =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        isLoading,
      },
    })),
  setSidebarError: (error: string | null) =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        error,
      },
    })),
  setSidebarWidth: (width: number) =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        width,
      },
    })),
  setSidebarPosition: (position: 'left' | 'right') =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        position,
      },
    })),
  setSidebarVariant: (variant: 'default' | 'minimal' | 'compact') =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        variant,
      },
    })),
  setSidebarTransparency: (transparency: number) =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        transparency: Math.max(0, Math.min(1, transparency)),
      },
    })),
  setShowLabels: (show: boolean) =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        showLabels: show,
      },
    })),
  pinItem: (itemId: string) =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        pinnedItems: [...new Set([...state.sidebar.pinnedItems, itemId])],
      },
    })),
  unpinItem: (itemId: string) =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        pinnedItems: state.sidebar.pinnedItems.filter(id => id !== itemId),
      },
    })),
  addRecentItem: (itemId: string) =>
    set((state: SidebarSlice) => ({
      sidebar: {
        ...state.sidebar,
        recentItems: [itemId, ...state.sidebar.recentItems.filter(id => id !== itemId)].slice(0, 5),
      },
    })),
})