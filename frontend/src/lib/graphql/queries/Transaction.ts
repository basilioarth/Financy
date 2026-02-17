import { gql } from "@apollo/client";

export const LIST_ALL_TRANSACTIONS = gql`
query ListAllTransactions($filters: TransactionFilters) {
  listTransactions(filters: $filters) {
    items {
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
    totalCount
  }
}
`

export const LIST_RECENT_TRANSACTIONS = gql`
query ListRecentTransactions{
  listRecentTransactions {
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

export const GET_BIG_NUMBERS = gql`
query GetBigNumbers($data: BigNumbersInput!){
  getBigNumbers(data: $data) {
    totalBalance
    monthRecipes
    monthExpenses
  }
}
`