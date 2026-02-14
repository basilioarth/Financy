import { gql } from "@apollo/client";

export const LIST_ALL_TRANSACTIONS = gql`
query ListAllTransactions{
  listTransactions {
    id
    type
    description
    date
    value
    category {
      id
      title
      description
      color
      iconName
    }
    createdAt
    updatedAt
    author {
      fullName
      email
    }
  }
}
`