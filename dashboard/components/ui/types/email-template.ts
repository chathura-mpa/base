export enum TemplateType {
  submitted = 'submitted',
  outbid = 'outbid',
  won = 'won'
}

// Update EmailTemplate to allow content or message
export type EmailTemplate = {
  type: TemplateType
  subject: string
  content?: string // Make content optional
  message?: string // Add message as optional
  keywords: string[]
}
