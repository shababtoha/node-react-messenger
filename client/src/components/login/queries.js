import gql from "graphql-tag";

export const LOGIN_QUERY = gql`
    query Login($username: String! , $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`;

export const SIGN_UP_QUERY = gql`
    mutation Register($UserInput: UserInput!) {
        register(user: $UserInput) {
            token
        }
    }
`;

