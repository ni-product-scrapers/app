/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Head from 'next/head';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import { Box, Flex } from 'rebass';
import ProductCard from '../components/ProductCard';

const Home = ({ data = [] }) => (
  <Layout>
    <div>
      <Head>
        <title>NI - Competitors Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className="hero" mb={4}>
        <h1 className="title">Competitors Prices</h1>
        <p className="description">Click on a product to see competitors prices.</p>
      </Box>

      <Flex justifyContent="space-between" flexWrap="wrap">
        {data.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </Flex>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
      `}</style>
    </div>
  </Layout>
);

Home.getInitialProps = async ({ req }) => {
  const res = await fetch(`http://localhost:8080/api/products`);
  const data = await res.json();
  return { data };
  // const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  // const res = await fetch(baseUrl +'api/products');
  // const json = await res.json()
  // console.log(req);
};

export default Home;
