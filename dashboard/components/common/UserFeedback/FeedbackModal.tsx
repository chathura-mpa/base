import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Card, CustomModalLayout, Image, Modal, Text } from '@wix/design-system'
import * as Icons from '@wix/wix-ui-icons-common'
import { useIntercom } from 'react-use-intercom'

import imageUserFeedback from '../../../../assets/images/image_user-feedback.svg'
import { Images } from '../../../resources'
import classes from './FeedbackModal.module.scss'

// const APP_ID = "cb42d177-ec38-4067-8224-d4107d4bb56c";
const APP_ID = '7541e719-8559-4992-b160-0564cc112c70' // To-Do: Change this to real app ID

const FeedbackModal: React.FC<{
  onModalClosed: () => void
  onUserReviewed: () => void
  isModalOpened: boolean
}> = (props) => {
  const { showNewMessage } = useIntercom()
  const [showFeedback, setShowFeedback] = useState(false)
  const [isUserClickPostBtn, setIsUserClickPostBtn] = useState(false)

  useEffect(() => {
    scrollToBottom()
  }, [showFeedback])

  const handleWidgetNotSetupStatus = () => {
    openIntercomWithContent("I couldn't setup my widget--> ")
    handleOnRequestClose()
  }

  const handleOnRequestClose = () => {
    props.onModalClosed()
    setTimeout(() => {
      setShowFeedback(false)
    }, 1000)
  }

  const scrollToBottom = () => {
    const element = document.getElementById('scrollableIframe')
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  }

  const openIntercomWithContent = useCallback((message) => showNewMessage(message), [showNewMessage])

  const markAsReviewed = () => {
    setIsUserClickPostBtn(true)
    props.onUserReviewed()
  }

  const renderFeedbackContent = () => (
    <Box gap="8px" direction="vertical" flex={1}>
      <Box gap="24px" padding="32px 36px 12px 36px">
        <Box gap="12px" direction="vertical">
          <Text size="medium" weight="bold" className={classes['medium-hight']}>
            We hope you&apos;re enjoying the app
          </Text>
          <Box gap="24px">
            <Box gap="6px" direction="vertical" flex={1}>
              <Text size="medium">We worked very hard to deliver the best experience!</Text>
              <Text size="medium">
                Please, leave an honest review to drive us among Wix members and make them trust us as you do. This will really
                help us grow further and bring more value to the Wix community. Thank you ♥️
              </Text>
            </Box>
            <Image width="120px" height="120px" src={imageUserFeedback} transparent />
          </Box>
        </Box>
      </Box>

      <div className={classes['frame-container']} id="scrollableIframe">
        <iframe
          className={classes['feedback-iframe']}
          src={`https://www.wix.com/app-market/add-review/${APP_ID}`}
          width="600px"
          height="572px"
        ></iframe>
        {!isUserClickPostBtn && <div className={classes['overlay-container']} onClick={markAsReviewed}></div>}
      </div>
      <div className={classes['no-post-review']}>
        Note: Do not post a review, as this is a YouTube gallery app review link. Instead, to mark the user as reviewed, you can
        press the post button once (our overlay will capture this click and make the button available again).
      </div>
    </Box>
  )

  const renderQuestionContent = () => (
    <Box gap="8px" direction="vertical" flex={1}>
      <Box gap="12px" direction="vertical" padding="32px 36px 28px 36px">
        <Box gap="4px" direction="vertical">
          <Text size="medium" weight="bold" className={classes['medium-hight']}>
            Have you managed to set up the widget?
          </Text>
          <Text size="medium">Confirm that you haver successfully added the Auction Store plugin to your site.</Text>
        </Box>
        <Box gap="12px">
          <Button prefixIcon={<Icons.Confirm />} onClick={() => setShowFeedback(true)}>
            Yes
          </Button>
          <Button priority="secondary" onClick={handleWidgetNotSetupStatus}>
            No
          </Button>
        </Box>
      </Box>
      <Card>
        <Image src={Images.USER_FEEDBACK} width="552px" height="271px"></Image>
      </Card>
    </Box>
  )

  const renderModalContent = () => (
    <CustomModalLayout
      onCloseButtonClick={handleOnRequestClose}
      removeContentPadding
      width="600px"
      content={
        <>
          {!showFeedback && renderQuestionContent()}

          <div className={!showFeedback ? 'sr-only' : undefined}>{renderFeedbackContent()}</div>
        </>
      }
    />
  )

  return (
    <Modal
      isOpen={props.isModalOpened}
      onRequestClose={handleOnRequestClose}
      shouldCloseOnOverlayClick={!showFeedback || isUserClickPostBtn}
    >
      {renderModalContent()}
    </Modal>
  )
}
export default FeedbackModal
