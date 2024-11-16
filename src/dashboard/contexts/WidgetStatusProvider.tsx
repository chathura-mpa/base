import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react'

import DisplayWidgetGuideModal from '../components/common/DisplayWidgetGuideModal'
import FeedbackModal from '../components/common/UserFeedback'
import WidgetGuideModal from '../components/common/WidgetGuideModal'

interface WidgetContextProps {
  isWidgetAdded: boolean
  setIsWidgetAdded: Dispatch<SetStateAction<boolean>>
  isDisplayWidgetAdded: boolean
  setIsDisplayWidgetAdded: Dispatch<SetStateAction<boolean>>
  setShowWidgetGuide: Dispatch<SetStateAction<boolean>>
  setShowDisplayWidgetGuide: Dispatch<SetStateAction<boolean>>
  setShowFeedbackModal: Dispatch<SetStateAction<boolean>>
}

const WidgetContext = createContext<WidgetContextProps | undefined>(undefined)

const WidgetStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isWidgetAdded, setIsWidgetAdded] = useState<boolean>(false)
  const [isDisplayWidgetAdded, setIsDisplayWidgetAdded] = useState<boolean>(false)

  const [showWidgetGuide, setShowWidgetGuide] = useState(false)
  const [showDisplayWidgetGuide, setShowDisplayWidgetGuide] = useState(false)

  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  const values = useMemo(
    () => ({
      isWidgetAdded,
      setIsWidgetAdded,
      isDisplayWidgetAdded,
      setIsDisplayWidgetAdded,
      setShowWidgetGuide,
      setShowDisplayWidgetGuide,
      setShowFeedbackModal
    }),
    [
      isWidgetAdded,
      setIsWidgetAdded,
      isDisplayWidgetAdded,
      setIsDisplayWidgetAdded,
      setShowWidgetGuide,
      setShowDisplayWidgetGuide,
      setShowFeedbackModal
    ]
  )

  return (
    <WidgetContext.Provider value={values}>
      {children}
      <WidgetGuideModal
        isModalOpened={showWidgetGuide}
        onModalClosed={() => {
          setShowWidgetGuide(false)
        }}
      />
      <DisplayWidgetGuideModal
        isModalOpened={showDisplayWidgetGuide}
        onModalClosed={() => {
          setShowDisplayWidgetGuide(false)
        }}
      />
      <FeedbackModal
        isModalOpened={showFeedbackModal}
        onModalClosed={() => {
          setShowFeedbackModal(false)
        }}
        onUserReviewed={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
    </WidgetContext.Provider>
  )
}

const useWidgetStatus = () => {
  const context = useContext(WidgetContext)
  if (!context) {
    throw new Error('useWidgetStatus must be used within a WidgetStatusProvider')
  }
  return context
}

export { WidgetStatusProvider, useWidgetStatus }
