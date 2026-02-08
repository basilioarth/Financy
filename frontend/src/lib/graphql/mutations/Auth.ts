import { gql } from "@apollo/client"

export const LOGIN = gql`
mutation Login($data: AuthInput!){
    login(data: $data) {
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

export const REGISTER = gql`
mutation Register($data: UserInput!) {
    register(data: $data) {
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