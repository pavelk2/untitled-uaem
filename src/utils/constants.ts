export const APP_NAME = 'FormFunnel'
export const APP_DESCRIPTION = 'AI-Powered Forms & Funnels'

export const MAX_FORMS_FREE = 3
export const MAX_QUESTIONS_PER_FORM = 50
export const MAX_RESPONSES_FREE = 100

export const FORM_TYPES = {
  REGISTRATION: 'registration',
  SALES: 'sales',
  CALL_BOOKING: 'call_booking',
  SURVEY: 'survey',
  FEEDBACK: 'feedback',
} as const

export const QUESTION_TYPES = {
  SHORT_TEXT: 'short_text',
  LONG_TEXT: 'long_text',
  SINGLE_CHOICE: 'single_choice',
  MULTIPLE_CHOICE: 'multiple_choice',
  EMAIL: 'email',
  PHONE: 'phone',
  RATING: 'rating',
  DATE: 'date',
  FILE_UPLOAD: 'file_upload',
  WELCOME_SCREEN: 'welcome_screen',
  THANK_YOU_SCREEN: 'thank_you_screen',
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  FORM_BUILDER: '/forms/:id/edit',
  FORM_PREVIEW: '/forms/:id/preview',
  FORM_RESPONSES: '/forms/:id/responses',
  SETTINGS: '/settings',
} as const
