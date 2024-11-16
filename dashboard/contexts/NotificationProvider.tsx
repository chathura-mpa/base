import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { Box, CustomModalLayout, Heading, Modal, Text } from '@wix/design-system'

import { getClient } from '../utils'

type Notification = {
  theme?: 'premium' | 'destructive'
  width?: number | string
  title: string
  message: string

  approveButtonText?: string
  onApprove?: () => void | Promise<void>
  cancelButtonText?: string
  onCancel?: () => void | Promise<void>
  onClose?: () => void | Promise<void>
  isOpen?: boolean
  borderRadius?: number
  closeTimeoutMS?: number
  contentLabel?: string
  height?: string
  horizontalPosition?: 'start' | 'center' | 'end'
  maxHeight?: string
  onAfterClose?: () => void
  onAfterOpen?: () => void
  onRequestClose?: () => void
  overlayPosition?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  screen?: 'full' | 'desktop' | 'mobile'
  scrollable?: boolean
  scrollableContent?: boolean
  shouldCloseOnOverlayClick?: boolean
  shouldDisplayCloseButton?: boolean
  verticalPosition?: 'start' | 'center' | 'end'
  zIndex?: number
}

type Toast = {
  type?: 'standard' | 'success' | 'warning' | 'error'
  message: string

  approveButtonText?: string
  onApprove?: () => void | Promise<void>
  cancelButtonText?: string
  onCancel?: () => void | Promise<void>
  onClose?: () => void | Promise<void>
  isOpen?: boolean
  borderRadius?: number
  closeTimeoutMS?: number
  contentLabel?: string
  height?: string
  horizontalPosition?: 'start' | 'center' | 'end'
  maxHeight?: string
  onAfterClose?: () => void
  onAfterOpen?: () => void
  onRequestClose?: () => void
  overlayPosition?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  screen?: 'full' | 'desktop' | 'mobile'
  scrollable?: boolean
  scrollableContent?: boolean
  shouldCloseOnOverlayClick?: boolean
  shouldDisplayCloseButton?: boolean
  verticalPosition?: 'start' | 'center' | 'end'
  zIndex?: number
}

type NotificationContextType = {
  toastify: (options: Toast) => void
  notify: (notification: Notification) => void
  clearNotification: () => void
  notification: Notification | null
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const client = getClient()
  const [notification, setNotification] = useState<Notification | null>(null)

  const notify = (notification: Notification) => {
    setNotification({
      isOpen: true,
      ...notification,
      theme: notification.theme ?? undefined,
      width: notification.width ?? undefined
    })
  }

  const toastify = (options: Toast) => {
    client.dashboard.showToast({
      message: options.message,
      timeout: 'normal',
      type: options.type ?? 'success'
    })
  }

  const clearNotification = () => {
    setNotification(null)
  }

  const handleApprove = () => {
    notification?.onApprove?.()
    clearNotification()
  }

  const handleCancel = () => {
    notification?.onCancel?.()
    clearNotification()
  }

  const handleClose = () => {
    notification?.onClose?.()
    clearNotification()
  }

  const contextValue = useMemo(
    () => ({
      toastify,
      notify,
      clearNotification,
      notification
    }),
    [toastify, notify, clearNotification, notification]
  )

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notification && (
        <Modal isOpen={notification.isOpen || true} screen="desktop">
          <CustomModalLayout
            {...(notification.width ? { width: notification.width } : undefined)}
            {...(notification.theme ? { theme: notification.theme } : {})}
            primaryButtonText={notification.approveButtonText ?? 'Ok'}
            onCloseButtonClick={handleClose}
            title={
              <Box verticalAlign="middle">
                <Heading size="medium">{notification.title}</Heading>
              </Box>
            }
            content={<Text size="small">{notification.message || 'No content provided'}</Text>}
            primaryButtonOnClick={handleApprove}
            secondaryButtonText={notification.onCancel ? (notification.cancelButtonText ?? 'Cancel') : undefined}
            secondaryButtonOnClick={notification.onCancel ? handleCancel : undefined}
          />
        </Modal>
      )}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
