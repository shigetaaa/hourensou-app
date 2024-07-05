import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: "'BIZ UDGothic', 'Hiragino Sans', 'Meiryo', sans-serif",
    body: "'BIZ UDGothic', 'Hiragino Sans', 'Meiryo', sans-serif",
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  components: {
    Container: {
      baseStyle: {
        w: '100%',
        maxW: 'container.lg',
        px: 4,
      },
      sizes: {
        sm: {
          maxW: '100%',
        },
        md: {
          maxW: '768px',
        },
        lg: {
          maxW: '1024px',
        },
      },
    },
  },
});

export default theme;
