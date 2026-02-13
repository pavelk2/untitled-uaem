import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store'
import { addForm } from '@/store/slices/formsSlice'
import { Modal } from '@/components/modal/Modal'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { FORM_TYPES } from '@/utils/constants'

interface CreateFormModalProps {
  isOpen: boolean
  onClose: () => void
}

const formTypes = [
  { value: FORM_TYPES.REGISTRATION, label: 'Registration', icon: '📋' },
  { value: FORM_TYPES.SALES, label: 'Sales Funnel', icon: '💰' },
  { value: FORM_TYPES.CALL_BOOKING, label: 'Call Booking', icon: '📞' },
  { value: FORM_TYPES.SURVEY, label: 'Survey', icon: '📊' },
  { value: FORM_TYPES.FEEDBACK, label: 'Feedback', icon: '💬' },
]

export function CreateFormModal({ isOpen, onClose }: CreateFormModalProps) {
  const [title, setTitle] = useState('')
  const [selectedType, setSelectedType] = useState<string>(FORM_TYPES.REGISTRATION)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const newForm = {
      id: `form-${Date.now()}`,
      title: title || 'Untitled Form',
      description: '',
      type: selectedType,
      questions: [],
      responses: 0,
      completionRate: 0,
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    dispatch(addForm(newForm))
    onClose()
    setTitle('')
    navigate(`/forms/${newForm.id}/edit`)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Form">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Input
          id="form-title"
          label="Form Title"
          placeholder="e.g., Product Launch Registration"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700">
            Form Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {formTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setSelectedType(type.value)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-150 text-left
                  ${
                    selectedType === type.value
                      ? 'bg-primary-50 border-2 border-primary-500 text-primary-700'
                      : 'bg-neutral-50 border-2 border-transparent text-neutral-600 hover:bg-neutral-100'
                  }
                `}
              >
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create Form</Button>
        </div>
      </form>
    </Modal>
  )
}
