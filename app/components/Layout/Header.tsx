import ContactForm from './ContactForm';
import { useDisclosure } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleVerify = (token: any) => {
    console.log('Google Token', token);
  };

  const googleKey: string = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY || '';

  let googleRecaptcha: React.ReactElement = <></>;

  if (googleKey) {
    googleRecaptcha = <GoogleReCaptchaProvider reCaptchaKey={ googleKey }>
                        <ContactForm isOpen={ isOpen } onClose={ onClose } />
                      </GoogleReCaptchaProvider>;
  }

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
      { googleRecaptcha }
    </>
  );
};

export default Header;
