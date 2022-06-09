// 
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      saveBook {
        _id
        authors
        description
        bookId
        image
        title
        link
      }
    }
  }
`;