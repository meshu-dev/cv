import ContactForm from './ContactForm';
import { useDisclosure } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleVerify = (token: any) => {
    console.log('Google Token', token);
  };

  const { executeRecaptcha } = useGoogleReCaptcha();

  /*
  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    if (executeRecaptcha) {
      const token = await executeRecaptcha('yourAction');
      // Do whatever you want with the token
    }
  }, [executeRecaptcha]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);
 */
  const googleKey: string = process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY || '';

  return (
    <>
      <header>
        <div id="header-wrapper">
          <div id="header-logo">Mesh's CV</div>
          <div id="header-links">
            <a href="/pdfs/cv.pdf" target="_blank" className="header-link">Download</a>
            <span className="header-link" onClick={ onOpen }>Contact</span>
          </div>
        </div>
      </header>
      <GoogleReCaptchaProvider reCaptchaKey={ googleKey }>
        <ContactForm isOpen={ isOpen } onClose={ onClose } />
      </GoogleReCaptchaProvider>
    </>
  );
};

export default Header;
