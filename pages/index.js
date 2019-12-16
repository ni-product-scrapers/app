/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Head from 'next/head'
import Link from 'next/link';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch'


const Home = ({data}) => (
  <Layout>
    <div>
      {data[0].title}
    <Head>
      <title>NI - Competitors Products</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="hero">
      <h1 className="title">Competitors Prices</h1>
      <p className="description">
        Click on a product to see competitors prices.
      </p>

      <div className="row">
        <Link href="/product">
        <a className="card">
          <h3>Maschine mikro MK3 &rarr;</h3>
          <p>lorem ipsum</p>
        </a>
        </Link>
      </div>
    </div>

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
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
  </Layout>

)


Home.getInitialProps = async ({req}) => {

  const res = await fetch(`http://localhost:8080/api/products`);
  const data = await res.json();
  return {data};

  // const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  // const res = await fetch(baseUrl +'api/products');
  // const json = await res.json()

  // console.log(req);


}

export default Home
