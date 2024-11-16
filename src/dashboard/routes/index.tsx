import React from 'react'
import { Box, Page } from '@wix/design-system'
import { HashRouter, Route, Routes } from 'react-router-dom'

import { AppRoute } from '../../interfaces'
import TabNavigator from '../components/common/TabNavigator'
import OverviewAndUploadedFilesPage from '../pages/OverviewAndUploadedFilesPage'
import UploadFieldsPage from '../pages/UploadFieldsPage'
import { SPACING } from '../styles'

export const ROUTES: AppRoute[] = [
  { id: 1, title: 'Overview & Uploaded Files', path: '/', element: <OverviewAndUploadedFilesPage /> },
  {
    id: 2,
    title: 'Upload Fields',
    path: '/upload-fields',
    element: <UploadFieldsPage />
  }
]

const AppRouter = () => {
  return (
    <HashRouter>
      <TabNavigator routes={ROUTES} />
      <Page.Content>
        <Box marginTop={SPACING.x12}>
          <Routes>
            {ROUTES.map((route) => (
              <Route key={route.id} path={route.path} element={route.element} />
            ))}
            <Route path="/" element={<OverviewAndUploadedFilesPage />} />
          </Routes>
        </Box>
      </Page.Content>
    </HashRouter>
  )
}

export default AppRouter
