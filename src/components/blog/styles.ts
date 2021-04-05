// Blog style overrides 
import { extendTheme } from '@chakra-ui/react' 

import { MasonryPost, PostMasonry } from './'

import styles from './styles'

const overrides: object = {
    styles,
    components: {
        MasonryPost: {
            sizes: {
                xl: {
                    h: "56px",
                    fontSize: "lg",
                    px: "32px",
                },
            },
        },
        PostMasonry: {

        }
    }

}


export default extendTheme(overrides)