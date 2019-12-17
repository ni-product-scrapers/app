

export default `
  fragment priceFragment on Price {
    currency
    diffPrice
    originalPrice
    itemType
    license
    minPrice
    priceEur
  }
  query GetProductsForFinder(
    $condition: Condition
    $sortBy: SortBy
    $search: String
    $language: Language
    $page: Int
    $hitsPerPage: Int
  ) {
    user(language: $language) {
      getProducts(
        condition: $condition
        sortBy: $sortBy
        search: $search
        page: $page
        hitsPerPage: $hitsPerPage
      ) {
        result {
          pageInfo {
            currentPage
            hasNextPage
          }
          items {
            id
            title
            sku
            image
            audioId
            price {
              main {
                ...priceFragment
              }
              min {
                ...priceFragment
              }
            }
            attributes(
              keys: [
                "description"
              ]
            ) {
              key
              value
            }
          }
        }
      }
    }
  }
`