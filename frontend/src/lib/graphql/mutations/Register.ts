import { gql } from "@apollo/client"

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