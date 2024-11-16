/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react'
import { WixDesignSystemProvider } from '@wix/design-system'
import { IntercomProvider } from 'react-use-intercom'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus'

import 'moment-timezone'
import '@wix/design-system/styles.global.css'

import { _DEV } from './constants'
import { AppDataProvider } from './dashboard/contexts/AppDataProvider'
import { NotificationProvider } from './dashboard/contexts/NotificationProvider'
import { WidgetStatusProvider } from './dashboard/contexts/WidgetStatusProvider'
import DebugObserver from './dashboard/store/debug-observer'

import './dashboard/styles/global.scss'

const INTERCOM_APP_ID = 'h6dkwybg'

export function withProviders<P extends {} = {}>(Component: React.FC<P>) {
  return function DashboardProviders(props: P) {
    return (
      <WixDesignSystemProvider features={{ newColorsBranding: true }}>
        <NotificationProvider>
          <AppDataProvider>
            <RecoilRoot>
              <RecoilNexus />
              {_DEV && <DebugObserver />}
              <IntercomProvider appId={INTERCOM_APP_ID}>
                <WidgetStatusProvider>
                  <Component {...props} />
                </WidgetStatusProvider>
              </IntercomProvider>
            </RecoilRoot>
          </AppDataProvider>
        </NotificationProvider>
      </WixDesignSystemProvider>
    )
  }
}
