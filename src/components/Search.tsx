import React, { FC, InputHTMLAttributes } from 'react';
import { Input, IconButton, Box } from '@chakra-ui/react';

import { FaSearch } from 'react-icons/fa';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const Search: FC<InputProps> = ({placeholder, ...rest }) => {
  return (
    <Box display="flex" p={["0.5rem","2rem"]}>
      <Input placeholder={placeholder}></Input>
      <IconButton 
        alignContent="center"
        m="0 8px" 
        p="20px 30px" 
        aria-label="Search database" 
        icon={<FaSearch />} 
        // onClick={}
      />
    </Box>
  )
}
 
export default Search;