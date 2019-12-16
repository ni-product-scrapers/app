/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled';
import {Flex, Box, Text, Button} from 'rebass';



const ShowRow = ({product, logo, price}) => {
  return(
    <Box
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr auto;
        grid-row-gap: 100px;
      `}
      >
      <Box>
        <img css={css`width: 100px;`} src="https://upload.wikimedia.org/wikipedia/commons/5/59/Amazon.de-Logo.svg" />
      </Box>
      <Box><h2>299€</h2></Box>
      <Box>Product Name lorem ipsum box bla bla</Box>
      <Box><Button><a css={css`color: white;`} href="#">visit</a></Button></Box>

  </Box>
  )
}


export default ShowRow;