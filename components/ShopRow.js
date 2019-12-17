/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Box, Text, Button, Heading } from 'rebass';

const ShopRow = ({ shop, title, price, currency, shop_logo, product_url, main }) => {

  const originalPrice = main.priceEur;
  const isPriceMinor = price < originalPrice;

  return (
    <Box
      sx={{ padding: 3, marginBottom: 3 }}
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        row-gap: 1em;
        border: 2px solid #eee;
        border-radius: 6px;
        align-items: center;
        align-content: space-between;
      `}
    >
      <Box>
        {shop_logo ? <img
          css={css`
            width: 100px;
          `}
          src={shop_logo || ''}
        /> : <Heading fontSize={2} css={css`color:#009688;`}>{shop}</Heading>}

      </Box>
      <Box>
        <Text fontWeight="bold" px={1} css={css`color: ${isPriceMinor ? '#e91e63' : '#4caf50'};`}>
          {price || 'ND'} {currency || 'ND'}
          {isPriceMinor ? ' 😱 ' : ' 👍' }
        </Text>
      </Box>
      <Box pr={2}>{title || 'ND'}</Box>
      <Box>
        <Button width="100%">
          <a
            target="_blank"
            css={css`
              color: white;
            `}
            href={product_url}
          >
            go to {shop}
          </a>
        </Button>
      </Box>
    </Box>
  );
};

export default ShopRow;
