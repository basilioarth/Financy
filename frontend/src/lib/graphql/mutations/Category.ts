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