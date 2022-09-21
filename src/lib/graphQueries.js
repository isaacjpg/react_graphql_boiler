import {gql} from "@apollo/client";


export const LoginMutation = gql`
    mutation LoginMutation($email:String!, $password:String!){
        loginUser(email:$email password:$password){
            user{
              id
              email
              firstName
              isStaff
              userProfile{
                phone
              }
            }
            access
            refresh
          }
    }
`

export const GetAccessMutation = gql`
    mutation GetAccessMutation($refresh:String!){
        getAccess(refresh:$refresh){
            access
        }
    }
`

export const MeQuery = gql`
    query MeQuery{
        me{
            id
            email
            firstName
            isStaff
            userProfile{
              phone
            }
        }
    }
`