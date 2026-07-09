'use client';

import { create } from 'zustand';

interface UIStore {
  isCartDrawerOpen: boolean;
  isMobileNavOpen: boolean;
  isFilterDrawerOpen: boolean;
  isSizeGuideOpen: boolean;
  toastMessage: string | null;

  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  openFilterDrawer: () => void;
  closeFilterDrawer: () => void;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartDrawerOpen: false,
  isMobileNavOpen: false,
  isFilterDrawerOpen: false,
  isSizeGuideOpen: false,
  toastMessage: null,

  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () => set((s) => ({ isCartDrawerOpen: !s.isCartDrawerOpen })),
  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  openFilterDrawer: () => set({ isFilterDrawerOpen: true }),
  closeFilterDrawer: () => set({ isFilterDrawerOpen: false }),
  openSizeGuide: () => set({ isSizeGuideOpen: true }),
  closeSizeGuide: () => set({ isSizeGuideOpen: false }),
  showToast: (message) => {
    set({ toastMessage: message });
    setTimeout(() => set({ toastMessage: null }), 3000);
  },
  hideToast: () => set({ toastMessage: null }),
}));
