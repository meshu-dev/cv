import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormErrorMessage,
  Stack,
  Input,
  Textarea,
  Button,
  useToast
} from "@chakra-ui/react"
import { useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import MeshApiService from "@/services/meshApi.service"
import { ToastStatus } from "@/types"

type Props = {
  isOpen: boolean
  onClose: any
}

const ContactForm = ({ isOpen, onClose }: Props) => {
  const toast = useToast()

  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const updateName = (e: any) => setName(e.target.value)
  const updateEmail = (e: any) => setEmail(e.target.value)
  const updateMessage = (e: any) => setMessage(e.target.value)

  const [isSubmitClicked, setIsSubmittedClicked] = useState(false)
  const [hasNameFieldError, setHasNameFieldError] = useState(false)
  const [hasEmailFieldError, setHasEmailFieldError] = useState(false)
  const [hasMessageFieldError, setHasMessageFieldError] = useState(false)

  const closeForm = () => {
    onClose()

    setName('')
    setEmail('')
    setMessage('')

    setIsSubmittedClicked(false)

    setHasNameFieldError(false)
    setHasEmailFieldError(false)
    setHasMessageFieldError(false)
  }

  const onSubmit = async () => {
    setIsSubmittedClicked(true)

    setHasNameFieldError(name === '')
    setHasEmailFieldError(email === '')
    setHasMessageFieldError(message === '')

    if (
      !hasNameFieldError &&
      !hasEmailFieldError &&
      !hasMessageFieldError
    ) {
      if (token) {
        let toastMessage: string = 'Error occurred, please try again later'
        let toastStatus: ToastStatus = 'success'

        try {
          const response = await MeshApiService.sendMessage(token, name, email, message)

          if (response['success']) {
            toastMessage = 'Message sent! You will receive a reply shortly'

            closeForm()
          }
        } catch (e) {
          console.log('Exception', e)

          toastMessage = (e as Error).message
          toastStatus = 'error'
        }

        toast({
          description: toastMessage,
          status: toastStatus,
          position: 'top',
          duration: 9000
        })
      }
    }
  }

  const { executeRecaptcha } = useGoogleReCaptcha()

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async (token: string) => {
    if (!token) {
      if (!executeRecaptcha) {
        console.warn('Execute recaptcha not yet available')
        return
      }

      if (executeRecaptcha) {
        const token = await executeRecaptcha('contact')
        setToken(token)
      }
    }
  }, [executeRecaptcha])

  if (isOpen) {
    handleReCaptchaVerify(token)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send me a message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing='1rem'>
              <FormControl isInvalid={isSubmitClicked && hasNameFieldError}>
                <Input placeholder="Name" value={name} onChange={updateName} />
                <FormErrorMessage>Name is required.</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={isSubmitClicked && hasEmailFieldError}>
                <Input type="email" value={email} placeholder="Email address" onChange={updateEmail} />
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={isSubmitClicked && hasMessageFieldError}>
                <Textarea placeholder="Message" onChange={updateMessage} />
                <FormErrorMessage>Message is required.</FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' ml={3} onClick={onSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactForm
