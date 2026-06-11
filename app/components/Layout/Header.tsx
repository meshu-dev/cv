import dynamic from 'next/dynamic'
import { useDisclosure } from '@chakra-ui/react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const ContactForm = dynamic(() => import('./ContactForm'), { ssr: false })

type Props = {
  pdfUrl: string | null
}

const Header = ({ pdfUrl }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const googleKey: string = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY || ''

  return (
    <>
      <a href="#body-wrapper" className="skip-link">
        Skip to content
      </a>
      <header>
        <div id="header-wrapper">
          <div id="header-logo">Mesh&apos;s CV</div>
          <div id="header-links">
            {pdfUrl ? (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="header-link"
                data-testid="pdf-link">
                  Download
              </a>
            ) : null}
            {googleKey ? (
              <button type="button" className="header-link" onClick={onOpen}>
                Contact
              </button>
            ) : null}
          </div>
        </div>
      </header>
      {googleKey ? (
        <GoogleReCaptchaProvider reCaptchaKey={googleKey}>
          <ContactForm isOpen={isOpen} onClose={onClose} />
        </GoogleReCaptchaProvider>
      ) : null}
    </>
  )
}

export default Header
