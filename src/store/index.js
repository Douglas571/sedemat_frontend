import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useStore = create(
  persist((set, get) => ({
    user: null,
    contribuyentes: [],
    setUser: (user) => {
      set((state) => ({ user }))
    },
    setContribuyentes: (contribuyentes) => {
      set((state) => ({ contribuyentes }))
    }
  }),
    {
      name: "sedemat_storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useStore