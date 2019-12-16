/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Flex, Box, Heading, Text } from 'rebass';
import ShopRow from '../../components/ShopRow';
import styled from '@emotion/styled-base';
import fetch from 'isomorphic-unfetch';

const NIPrice = styled(Box)`
  border: 2px solid #aaa;
  border-radius: 6px;
`;

const Product = ({ data = { shops: [] } }) => {
  const router = useRouter();
  const { sku } = router.query;
  const { shops } = data;

  console.log(data);

  return (
    <Layout>
      <Box mb={3}>
        <Heading mb={2}>Maschine Mikro MK3</Heading>
        <Text fontSize={'10px'}>({sku})</Text>
      </Box>

      <Flex
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
        pb={3}
      >
        <img
          css={css`
            max-width: 300px;
          `}
          src="https://media.sweetwater.com/api/i/q-82__ha-44308cb357e8e79f__hmac-54ba921b54696b766419b2fc175a63131a9d770e/images/items/750/MaschMik3-large.jpg"
        />
        <NIPrice p={4} textAlign="center">
          <img
            css={css`
              width: 40px;
            `}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/NI_Logo.svg/1200px-NI_Logo.svg.png"
          />
          <Text fontWeight="bold" fontSize={5}>
            [todo]
          </Text>
        </NIPrice>
      </Flex>
      <Box>
        {shops.map((shop, index) => (
          <ShopRow key={index} {...shop} />
        ))}
      </Box>
    </Layout>
  );
};

Product.getInitialProps = async ({ query }) => {
  const res = await fetch(`http://localhost:8080/api/products`);
  const json = await res.json();
  const { sku } = query;
  const data = json.find(p => p.sku === sku);
  return { data };
  // const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  // const res = await fetch(baseUrl +'api/products');
  // const json = await res.json()
  // console.log(req);
};

export default Product;
