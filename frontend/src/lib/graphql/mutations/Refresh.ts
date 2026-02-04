import { gql } from "@apollo/client"

export const REFRESH = gql`
mutation Refresh($data: RefreshAuthInput!){
  refresh(data: $data) {
    token
    refreshToken
    user {
        id
        fullName
        email
        password
        createdAt
        updatedAt
    }
  }
}
`