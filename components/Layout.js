/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import styled from '@emotion/styled';
import Header from './Header';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import {Box} from 'rebass';
import globalStyles from '../styles/globals';


export const Row = styled(Box)`
  max-width: 880px;
  margin: 0 auto;
`;


const Layout = ({children}) => {
  return(
    <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
      <Row px={2} py={3}>
        <Header />
      </Row>
      <Row p={2}>
        {children}
      </Row>
    </ThemeProvider>
  )
}

export default Layout;