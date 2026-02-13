import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { authReducer } from './slices/authSlice'
import { formsReducer } from './slices/formsSlice'
import { globalReducer } from './slices/globalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forms: formsReducer,
    global: globalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
