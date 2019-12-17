/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Box, Card, Heading, Image, Text } from 'rebass';
import Link from 'next/link';

const ProductCard = ({ title, sku, image, attributes }) => {

    // const description = attributes && attributes.find( ({key}) => key === 'description' ).value;

    return(
      <Link href={`/products/${sku}`}>
        <Card width={256} css={css`cursor: pointer; margin: 0 auto;`}>
          <Image src={image} />
          <Heading fontSize={2} mb={2}>{title}</Heading>
          <Text fontSize={1}>{}</Text>
        </Card>
      </Link>
    )
};

export default ProductCard;
