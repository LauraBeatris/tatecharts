import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import Image from 'next/image'
import { useEffect } from 'react'

export function TechnicalIssuesModal () {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    onOpen()
  }, [onOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor='tableBg'>
        <ModalHeader
          color='black'
          textAlign='center'
        >
          Technical Issues Alert
        </ModalHeader>
        <ModalCloseButton color='black' />
        <ModalBody>
          <VStack spacing='2'>
            <Flex margin='auto' width='150px' height='150px' position='relative'>
              <Image
                layout='fill'
                src='https://i.ibb.co/MVmBj8k/Screenshot-2022-05-27-at-08-49-59.png'
                alt='Tate Child Pic'
                style={{ borderRadius: '12px' }}
              />
            </Flex>

            <Text color='black' textAlign='center'>
              Certain tracks stats aren't being shown due to a <Text display='inline' fontStyle='italic'>rate limiting API issue</Text>,
              but in the meanwhile you can check the album charts
            </Text>
            <Text color='black' fontWeight='bold' textAlign='center'>
              And {' '}
              <Link fontWeight='bold' color='pink.600' isExternal href='https://open.spotify.com/album/5fhTetHew6Eph6HfQ9O5gJ?si=T40jPIC_RqyK0uUaz_OMhg'>
                go stream the album
              </Link> cause it's a perfect piece of art
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='pink' onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
