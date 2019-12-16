/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Box } from 'rebass';
import Link from 'next/link';

const ProductCard = ({ title, desc, sku }) => {
  return (
    <Box
      width={1 / 4}
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
      <Link href={`/products/${sku}`}>
        <a className="card">
          <h3>{title || 'Product'} &rarr;</h3>
          <p>{desc || 'desc'}</p>
        </a>
      </Link>
    </Box>
  );
};

export default ProductCard;
