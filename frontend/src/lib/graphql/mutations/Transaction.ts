import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
mutation CreateTransaction($data: TransactionInput!){
  createTransaction(data: $data) {
    id
    type
    description
    date
    value
    category {
      title
      description
    }
    author {
      fullName
      email
    }
  }
}
`

export const UPDATE_TRANSACTION = gql`
mutation UpdateTransaction($data: TransactionInput!, $id: String!){
  updateTransaction(data: $data, id: $id) {
    id
    type
    description
    date
    value
    category {
      title
      description
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

export const DELETE_TRANSACTION = gql`
mutation DeleteTransaction($deleteTransactionId: String!){
  deleteTransaction(id: $deleteTransactionId)
}
`