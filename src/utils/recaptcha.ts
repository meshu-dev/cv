interface Grecaptcha {
  ready: (callback: () => void) => void
  execute: (siteKey: string, options: { action: string }) => Promise<string>
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha
  }
}

let loading: Promise<void> | null = null

const loadScript = (siteKey: string): Promise<void> => {
  const baseUrl: string = import.meta.env.PUBLIC_GOOGLE_RECAPTCHA_URL as string

  if (window.grecaptcha) {
    return Promise.resolve()
  }

  loading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `${baseUrl}?render=${encodeURIComponent(siteKey)}`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      loading = null
      reject(new Error('Failed to load reCAPTCHA'))
    }
    document.head.appendChild(script)
  })

  return loading
}

export const getRecaptchaToken = async (
  siteKey: string,
  action: string,
): Promise<string> => {
  await loadScript(siteKey)

  const grecaptcha = window.grecaptcha
  if (!grecaptcha) {
    throw new Error('reCAPTCHA is unavailable')
  }

  await new Promise<void>((resolve) => grecaptcha.ready(resolve))
  return grecaptcha.execute(siteKey, { action })
}
