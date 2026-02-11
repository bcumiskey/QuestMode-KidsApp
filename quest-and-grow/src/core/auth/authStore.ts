import { create } from 'zustand'
import type { Member } from '@core/types/index.ts'

interface AuthState {
  currentMember: Member | null
  adminMode: boolean
  isLoading: boolean

  login: (member: Member) => void
  loginAdmin: () => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  currentMember: null,
  adminMode: false,
  isLoading: false,

  login: (member) => set({ currentMember: member, adminMode: false }),
  loginAdmin: () => set({ adminMode: true, currentMember: null }),
  logout: () => set({ currentMember: null, adminMode: false }),
}))
