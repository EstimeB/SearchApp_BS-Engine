// 
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $authors: String!, $description: String!, $bookId: String!, $image: String!, $title: String!, $link: String!) {
    saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, title: $title, link: $link) {
      _id
      username
      email
      saveBooks {
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


// Remove book
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            saveBooks {
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
    
`