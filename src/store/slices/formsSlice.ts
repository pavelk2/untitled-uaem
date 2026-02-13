import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface FormQuestion {
  id: string
  type: string
  title: string
  description?: string
  required: boolean
  options?: string[]
  order: number
}

export interface Form {
  id: string
  title: string
  description: string
  type: string
  questions: FormQuestion[]
  responses: number
  completionRate: number
  createdAt: string
  updatedAt: string
  isPublished: boolean
}

interface FormsState {
  forms: Form[]
  currentForm: Form | null
  isLoading: boolean
  error: string | null
}

const initialState: FormsState = {
  forms: [],
  currentForm: null,
  isLoading: false,
  error: null,
}

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<Form[]>) => {
      state.forms = action.payload
      state.isLoading = false
    },
    setCurrentForm: (state, action: PayloadAction<Form | null>) => {
      state.currentForm = action.payload
    },
    addForm: (state, action: PayloadAction<Form>) => {
      state.forms.unshift(action.payload)
    },
    updateForm: (state, action: PayloadAction<Form>) => {
      const index = state.forms.findIndex((f) => f.id === action.payload.id)
      if (index !== -1) {
        state.forms[index] = action.payload
      }
      if (state.currentForm?.id === action.payload.id) {
        state.currentForm = action.payload
      }
    },
    deleteForm: (state, action: PayloadAction<string>) => {
      state.forms = state.forms.filter((f) => f.id !== action.payload)
    },
    addQuestion: (state, action: PayloadAction<FormQuestion>) => {
      if (state.currentForm) {
        state.currentForm.questions.push(action.payload)
      }
    },
    updateQuestion: (state, action: PayloadAction<FormQuestion>) => {
      if (state.currentForm) {
        const index = state.currentForm.questions.findIndex(
          (q) => q.id === action.payload.id,
        )
        if (index !== -1) {
          state.currentForm.questions[index] = action.payload
        }
      }
    },
    removeQuestion: (state, action: PayloadAction<string>) => {
      if (state.currentForm) {
        state.currentForm.questions = state.currentForm.questions.filter(
          (q) => q.id !== action.payload,
        )
      }
    },
    setFormsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setFormsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const {
  setForms,
  setCurrentForm,
  addForm,
  updateForm,
  deleteForm,
  addQuestion,
  updateQuestion,
  removeQuestion,
  setFormsLoading,
  setFormsError,
} = formsSlice.actions
export const formsReducer = formsSlice.reducer
