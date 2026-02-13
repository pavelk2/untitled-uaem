import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

interface GlobalState {
  sidebarOpen: boolean
  notifications: Notification[]
}

const initialState: GlobalState = {
  sidebarOpen: true,
  notifications: [],
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      )
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  removeNotification,
} = globalSlice.actions
export const globalReducer = globalSlice.reducer
