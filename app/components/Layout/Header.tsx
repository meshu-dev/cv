import ContactForm from './ContactForm'
import { useDisclosure } from '@chakra-ui/react'
import {
  GoogleReCaptchaProvider
} from 'react-google-recaptcha-v3'

type Props = {
  pdfUrl: string | null
}

const Header = ({ pdfUrl }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const googleKey: string = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY || '';

  const Header = ({ cv }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const googleKey: string = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY || ''

    let googleRecaptcha: React.ReactElement = <></>

    if (googleKey) {
      googleRecaptcha = <GoogleReCaptchaProvider reCaptchaKey={googleKey}>
        <ContactForm isOpen={isOpen} onClose={onClose} />
      </GoogleReCaptchaProvider>
    }

    return (
      <>
        <header>
          <div id="header-wrapper">
            <div id="header-logo">Mesh's CV</div>
            <div id="header-links">
              {pdfUrl ? <a href={pdfUrl} target="_blank" className="header-link">Download</a> : null}
              <span className="header-link" onClick={onOpen}>Contact</span>
            </div>
          </div>
        </header>
        {googleRecaptcha}
      </>
    )
  }

  export default Header
