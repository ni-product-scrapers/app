/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import {Box, Flex} from 'rebass';

const ProductCard = ({title, desc, route}) => {
  return (
    <Box width={1/4}
      sx={{
        marginBottom: 3
      }}
      css={css`
        margin: 0 auto 30px;
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;

        &:hover {
          border-color: #067df7;
        }

        h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}
    >
      <Link href="/product">
        <a className="card">
          <h3>{title || 'Product'} &rarr;</h3>
          <p>{desc || 'desc'}</p>
        </a>
      </Link>
    </Box>
  );
};

const Home = ({ data = [] }) => (
  <Layout>
    <div>
      <Head>
        <title>NI - Competitors Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className="hero" mb={4}>
        <h1 className="title">Competitors Prices</h1>
        <p className="description">
          Click on a product to see competitors prices.
        </p>
      </Box>

      <Flex
          justifyContent="space-between"
          flexWrap="wrap"
        >
          {data.map( product => <ProductCard {...product} />)}

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
