import { Avatar, Box, Text, Tag, TagLabel } from "@chakra-ui/react"

type Props = {
  name: string
  picture: string
}

const UserAvatar = ({ name, picture }: Props) => {
  return (
    <Box
      display="flex"
      p="4px 20px"
    >
      <Avatar
        name={name}
        src={picture}
        size="sm"
        shadow="dark-lg"
      />
      <Text p="5px">{name}</Text>
    </Box>
  )
}

export default UserAvatar;
