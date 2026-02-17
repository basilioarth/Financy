import { gql } from "@apollo/client";

export const LIST_ALL_CATEGORIES = gql`
query ListAllCategories {
  listCategories {
    id
    code
    title
    description
    iconName
    color
    author {
      email
      fullName
    }
    transactions {
      id
      type
      value
    }
  }
}
`