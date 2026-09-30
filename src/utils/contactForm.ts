import { sendMessage } from '@/utils/portfolioApi'
import { closeDialog, showToast } from '@/utils/common'
import type { ContactResponse } from '@/types'
import { ToastType } from '@/enums'

export const submitForm = async () => {
  const form: HTMLFormElement | null =
    document.querySelector('#contactform-form')

  if (form) {
    const token: string = import.meta.env.PUBLIC_GOOGLE_RECAPTCHA_KEY as string
    const formData = new FormData(form)

    try {
      const response: ContactResponse | null = await sendMessage(
        token,
        formData.get('name') as string,
        formData.get('email') as string,
        formData.get('message') as string,
      )

      if (response.success) {
        closeDialog('#contactform')
        showToast(ToastType.Success, response.message)
      } else if (response.message) {
        showToast(ToastType.Error, response.message)
      }
    } catch (e) {
      showToast(ToastType.Error, e as string)
    }
  }
}
