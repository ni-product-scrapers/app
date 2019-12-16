/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Layout from "../components/Layout";
import { Flex, Box, Heading, Text } from "rebass";
import ShopRow from "../components/ShopRow";
import styled from "@emotion/styled-base";

const NIPrice = styled(Box)`
  border: 2px solid #aaa;
  border-radius: 10px;
`;

const Product = () => {
  return (
    <Layout>

      <Heading mb={2}>Maschine Mikro MK3</Heading>

      <Flex justifyContent="space-between" alignContent="center" alignItems="center" pb={3} css={css``}>
          <img
            css={css`
              max-width: 300px;
            `}
            src="https://media.sweetwater.com/api/i/q-82__ha-44308cb357e8e79f__hmac-54ba921b54696b766419b2fc175a63131a9d770e/images/items/750/MaschMik3-large.jpg"
          />
        <NIPrice p={4} textAlign="center">
          <img css={css`width: 40px;`} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/NI_Logo.svg/1200px-NI_Logo.svg.png" />
          <Text fontWeight="bold" fontSize={5}>399€</Text>
        </NIPrice>

      </Flex>
      <Box>
        <ShopRow />
        <ShopRow />
        <ShopRow />
        <ShopRow />
        <ShopRow />
        <ShopRow />
        <ShopRow />
        <ShopRow />
      </Box>
    </Layout>
  );
};

export default Product;
