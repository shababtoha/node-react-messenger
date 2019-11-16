import gql from "graphql-tag";

export const GET_ME_QUERY = gql`
    {
        user(id: "me") {
            id
            username
            name
            email
            phone
            image_url
        }
    }
`;