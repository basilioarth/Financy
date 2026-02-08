import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
mutation CreateCategory($data: CategoryInput!){
    createCategory(data: $data) {
      id
      title
      code
      description
      iconName
      colorHexCode
      createdAt
      updatedAt
      author {
        fullName
        email
      }
    }
  }
`

export const UPDATE_CATEGORY = gql`
mutation UpdateCategory($data: CategoryInput!, $updateCategoryId: String!){
  updateCategory(data: $data, id: $updateCategoryId) {
    id
    title
    code
    description
    iconName
    colorHexCode
    createdAt
    updatedAt
    author {
      fullName
      email
    }
  }
}
`