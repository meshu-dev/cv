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
  Button
} from "@chakra-ui/react"
import { useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import MeshApiService from "@/services/meshApi.service"

type Props = {
  isOpen: boolean
  onClose: any
}

const ContactForm = ({ isOpen, onClose }: Props) => {
  const [isSubmitClicked, setIsSubmittedClicked] = useState(false)
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const updateName = (e: any) => setName(e.target.value)
  const updateEmail = (e: any) => setEmail(e.target.value)
  const updateMessage = (e: any) => setMessage(e.target.value)

  const hasNameFieldError = name === ''
  const hasEmailFieldError = email === ''
  const hasMessageFieldError = message === ''

  const onSubmit = async () => {
    setIsSubmittedClicked(true);

    if (
      !hasNameFieldError &&
      !hasEmailFieldError &&
      !hasMessageFieldError
    ) {
      if (token) {
        try {
          const response = await MeshApiService.sendMessage(token, name, email, message)

          if (response) {
            onClose();

            setName('');
            setEmail('');
            setMessage('');
          }

          console.log('sendMessage', response)
        } catch (e) {
          console.log('Exception', e)
        }

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
              <FormControl isInvalid={isSubmitClicked && hasNameFieldError}>
                <Input type="email" value={email} placeholder="Email address" onChange={updateEmail} />
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={isSubmitClicked && hasNameFieldError}>
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
