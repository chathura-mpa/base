import { appInstances } from '@wix/app-management'
import { siteProperties } from '@wix/business-tools'

import { API_ENDPOINTS, APP_CONSTANTS } from '../../constants'
import ApiClient from '../utils/api-client'

export const getWixSiteData = async () => {
  const DEFAULT_LOCALE = {
    country: 'US',
    languageCode: 'en'
  }

  const { instance, site } = await appInstances.getAppInstance()
  // console.log(site)
  const { properties } = await siteProperties.getSiteProperties()

  const { country, languageCode } = properties?.locale ?? DEFAULT_LOCALE

  const billing = instance?.billing
  const plan = billing?.packageName ?? 'Free'

  return {
    instanceId: instance?.instanceId ?? '',
    currency: site?.paymentCurrency ?? '',
    locale: `${languageCode}-${country}`,
    email: site?.ownerInfo?.email ?? properties?.email ?? '',
    siteDisplayName: site?.siteDisplayName ?? '',
    siteUrl: site?.url ?? '',
    subscriptionPlan: plan ?? 'Free'
  }
}

export const updateInstance = async () => {
  const { instance } = await appInstances.getAppInstance()
  const url = APP_CONSTANTS.baseUrl + `/updateInstance?instanceId=${instance?.instanceId}`
  return await ApiClient.request(url, 'POST', null, false)
}

export const requestFetchSettings = async () => {
  return await ApiClient.request(API_ENDPOINTS.SETTINGS, 'GET', null, true)
}

export const requestSetSettings = async (body: Partial<object>) => {
  return await ApiClient.request(API_ENDPOINTS.SETTINGS, 'POST', body as Record<string, unknown>, true)
}

export const requestUpdateSetSettings = async (body: Partial<object>) => {
  return await ApiClient.request(API_ENDPOINTS.SETTINGS, 'PATCH', body as Record<string, unknown>, true)
}

export const requestUploadResourceFiles = async (body: FormData) => {
  console.log(body)
  const url = `${API_ENDPOINTS.UPLOAD}`
  return await ApiClient.request(url, 'POST', body, true, {}, true)
}
