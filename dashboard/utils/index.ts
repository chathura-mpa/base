import { dashboard } from '@wix/dashboard'
import { createClient } from '@wix/sdk'

import { BidFormValues } from '../../interfaces'
import pageJson from '../pages/page.json'

export function getAppInstance() {
  return new URLSearchParams(window.location.search).get('instance')!
}

export const encodeBase64 = (str: string): string => {
  return encodeURIComponent(btoa(str))
}

export const decodeBase64 = (str: string) => {
  return atob(str)
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function formatCurrency(value: number = 0, currency: string | undefined = undefined, locale: string = 'en-US') {
  const formatter = new Intl.NumberFormat(locale, {
    style: currency ? 'currency' : 'decimal',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  return formatter.format(value)
}

export function getClient() {
  return createClient({
    host: dashboard.host(),
    auth: dashboard.auth(),
    modules: {
      dashboard
    }
  })
}

export function getPageId(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      if (pageJson['id']) {
        resolve(pageJson['id'])
      } else {
        reject('Key not found in JSON')
      }
    } catch (error) {
      reject('Error parsing JSON: ' + error)
    }
  })
}
