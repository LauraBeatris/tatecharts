import {
  Badge,
  Button,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  UnorderedList,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { SectionTitle } from '../Typography'
import { useAlbumCharts } from 'hooks/useAlbumCharts'

export function AlbumCharts () {
  const { data, isLoading } = useAlbumCharts()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor='tableBg'>
          <ModalHeader color='black'>Album Charts</ModalHeader>
          <ModalCloseButton color='black' />
          <ModalBody>
            <Skeleton isLoaded={!isLoading}>
              {data?.map(({ service, charts }) => (
                <VStack key={service} maxHeight='60vh' overflow='scroll'>
                  <Text fontSize='20px' fontWeight='bold' color='pink.400'>{service}</Text>
                  <UnorderedList color='black'>
                    {charts.map((value) => (
                      <ListItem key={value}>{value}</ListItem>
                    ))}
                  </UnorderedList>
                </VStack>
              ))}
            </Skeleton>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='pink' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <VStack as='section' spacing='1' width='100%' alignItems='center'>
        <VStack
          spacing='-1'
          alignItems='center'
          width='100%'
        >
          <SectionTitle>album charts</SectionTitle>
          <Button
            variant='unstyled'
            height='unset'
            onClick={onOpen}
            borderRadius='0'
          >
            <Text
              wordWrap='break-word'
              whiteSpace='normal'
              textDecoration='underline'
              color='grayLight'
            >
              click here to visualize
              charts data from different countries
            </Text>
          </Button>
        </VStack>

        <Link
          href='https://open.spotify.com/track/3I1Smy5zhzNEc9grpjwY1s?si=8299acbf237c4bba'
          isExternal
        >
          <Badge variant='solid' cursor='pointer'>
            Go stream the last single: WWYD 🖤
          </Badge>
        </Link>
      </VStack>
    </>
  )
}
