// 
const { AuthenticationError } = require('apollo-server-express');
// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // user: async (parent, { userId, username}) => {
        //     return User.findOne({ _id: userId, username }).populate('saveBook');

        // },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('saveBook');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        },

        SaveBook: async (parent, { userId, authors, description, bookId, image, link, title }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                  { _id: userId },
                  {
                    $addToSet: {
                      books: { authors, description, bookId, image, link, title },
                    },
                  },
                  {
                    new: true,
                    runValidators: true,
                  }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (parent, { userId, bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                      $pull: {
                        books: {
                          _id: bookId,
                        },
                      },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
}

module.exports = resolvers;