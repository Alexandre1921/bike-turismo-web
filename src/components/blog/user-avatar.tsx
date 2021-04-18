import { Avatar, Box, Text, Tag, TagLabel } from "@chakra-ui/react"

type Props = {
  name: string
  picture: string
}

const UserAvatar = ({ name, picture }: Props) => {
  return (
    // <Tag
    //   p="4px 20px"
    //   size="md"
    //   borderRadius="full"
    //   colorScheme="gray"
    // >
    //   <Avatar
    //     size="sm"
    //     name={name}
    //     src={picture}
    //     ml={-3}
    //     mr={2}
    //   />
    //   <TagLabel>{name}</TagLabel>
    // </Tag>
    <Box
      display="flex"
      p="4px 20px"
    >
      <Avatar size="sm" name={name} src={picture} />
      <Text p="5px">{name}</Text>
    </Box>
  )
}

export default UserAvatar;
