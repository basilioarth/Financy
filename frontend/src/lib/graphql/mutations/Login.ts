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