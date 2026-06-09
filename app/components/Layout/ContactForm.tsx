import { useState, useEffect, ChangeEvent } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import PortfolioApiService from '@/services/portfolioApi.service'
import { ToastStatus } from '@/types'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const ContactForm = ({ isOpen, onClose }: Props) => {
  const toast = useToast()

  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [isSubmitClicked, setIsSubmittedClicked] = useState(false)
  const [hasNameFieldError, setHasNameFieldError] = useState(false)
  const [hasEmailFieldError, setHasEmailFieldError] = useState(false)
  const [hasMessageFieldError, setHasMessageFieldError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const closeForm = () => {
    onClose()

    setName('')
    setEmail('')
    setMessage('')
    setToken('')

    setIsSubmittedClicked(false)
    setHasNameFieldError(false)
    setHasEmailFieldError(false)
    setHasMessageFieldError(false)
    setIsSubmitting(false)
  }

  const { executeRecaptcha } = useGoogleReCaptcha()

  useEffect(() => {
    if (!isOpen || token) return
    if (!executeRecaptcha) return

    executeRecaptcha('contact')
      .then(setToken)
      .catch(() => {
        console.warn('reCAPTCHA verification failed')
      })
  }, [isOpen, token, executeRecaptcha])

  const onSubmit = async () => {
    setIsSubmittedClicked(true)

    const nameError = name.trim() === ''
    const emailError = email.trim() === ''
    const messageError = message.trim() === ''

    setHasNameFieldError(nameError)
    setHasEmailFieldError(emailError)
    setHasMessageFieldError(messageError)

    if (nameError || emailError || messageError) return
    if (!token) return

    setIsSubmitting(true)

    let toastMessage: string = 'Error occurred, please try again later'
    let toastStatus: ToastStatus = 'error'

    try {
      const response = await PortfolioApiService.sendMessage(token, name, email, message)

      if (response.success) {
        toastMessage = 'Message sent! You will receive a reply shortly'
        toastStatus = 'success'
        closeForm()
      } else if (response.message) {
        toastMessage = response.message
      }
    } catch (e) {
      toastMessage = (e as Error).message
    } finally {
      setIsSubmitting(false)
    }

    toast({
      description: toastMessage,
      status: toastStatus,
      position: 'top',
      duration: 9000,
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={closeForm}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Send me a message</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="1rem">
            <FormControl isInvalid={isSubmitClicked && hasNameFieldError}>
              <FormLabel htmlFor="contact-name">Name</FormLabel>
              <Input
                id="contact-name"
                name="name"
                autoComplete="name"
                placeholder="Name…"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
              <FormErrorMessage>Name is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={isSubmitClicked && hasEmailFieldError}>
              <FormLabel htmlFor="contact-email">Email</FormLabel>
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="Email address…"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              <FormErrorMessage>Email is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={isSubmitClicked && hasMessageFieldError}>
              <FormLabel htmlFor="contact-message">Message</FormLabel>
              <Textarea
                id="contact-message"
                name="message"
                placeholder="Message…"
                value={message}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              />
              <FormErrorMessage>Message is required.</FormErrorMessage>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            ml={3}
            onClick={onSubmit}
            isLoading={isSubmitting}
            loadingText="Sending…"
          >
            Submit
          </Button>
          <Button onClick={closeForm} isDisabled={isSubmitting}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ContactForm
