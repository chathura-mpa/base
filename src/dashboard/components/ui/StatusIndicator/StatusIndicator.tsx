import React from 'react'
import { Box, Text } from '@wix/design-system'

import { AuctionStatus } from '../../../../interfaces'
import classes from './StatusIndicator.module.scss'

interface StatusIndicatorProps {
  status: AuctionStatus
  onClick?: () => void
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, onClick }) => {
  const skins: Record<AuctionStatus, string> = {
    [AuctionStatus.NOT_STARTED]: 'D40',
    [AuctionStatus.PAUSED]: 'Y20',
    [AuctionStatus.LIVE]: 'G20',
    [AuctionStatus.ENDED]: 'G00'
  }

  const texts: Record<AuctionStatus, string> = {
    [AuctionStatus.NOT_STARTED]: 'Not Started',
    [AuctionStatus.PAUSED]: 'Paused',
    [AuctionStatus.LIVE]: 'Active',
    [AuctionStatus.ENDED]: 'Ended'
  }

  return (
    <Box
      inline
      className={classes['status-badge']}
      backgroundColor={skins[status]}
      paddingTop={1}
      paddingBottom={1}
      paddingLeft={2}
      paddingRight={2}
    >
      <Text light size="tiny" weight="bold" className={`${onClick ? classes['clickable'] : ''}`} onClick={onClick}>
        {texts[status]}
      </Text>
    </Box>
  )
}

export default StatusIndicator
