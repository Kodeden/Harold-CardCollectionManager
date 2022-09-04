import { isConstValueNode } from "graphql";

const resolvers = {
    Query: {
      books: async (parent, args, { db }) => {
        try {
          const results = await db.Book.findAll({
            include: { model: db.Author, required: true },
          });
  
          return results;
        } catch (err) {
          console.log(err);
          throw Error(err);
        }
      },
      booksByAuthor: async (parent, { author }, { db }) => {
        try {
          const results = await db.Author.findAll({
            where: { name: author },
            include: { model: db.Book, required: true },
          });

          if (results.length) {
            return results[0].dataValues?.books;
          }
  
          throw Error("Failed to get books by author");
        } catch (err) {
          console.log(err);
  
          throw Error(err);
        }
      },
    },
    Mutation: {
      addBook: async (parent, { title, author }, { db }) => {
        let newAuthor = {};
        let book = { title };
  
        try {
          const results = await db.Author.findOrCreate({
            where: { name: author },
            defaults: { name: author },
          });
          if (results.length) {
            newAuthor = { ...results[0].dataValues };
            book = { ...book, authorId: newAuthor.id };
  
            const bookResults = await db.Book.findOrCreate({
              where: { title: book.title },
              defaults: { ...book },
              include: { model: db.Author, required: true },
            });
  
            if (bookResults.length) {
              return bookResults[0].dataValues;
            }
          }
  
          throw Error("There was something wrong while creating a book");
        } catch (err) {
          console.log(err);
          throw Error("There was something wrong while creating a book");
        }
      },
      deleteBook: async (parent, { title }, { db }) => {
        try {
          const results = await db.Book.destroy({
            returning: true,
            where: { title: title },
          });
          console.log(results)
          return {id: 1, title: 'Book Deleted', authorID: 1};
            }
        catch (err) {
          console.log(err);
          throw Error("There was something wrong while deleting a book");
        }
      },
      changeAuthor: async (parent, { title, author }, { db }) => {
        let newAuthor = {};
  
        try {
          const results = await db.Author.findOrCreate({
            where: { name: author },
            defaults: { name: author },
          });
          if (results.length) {
            newAuthor = { ...results[0].dataValues }; 
            const bookResults = await db.Book.update(
              { authorId: newAuthor.id },
              {returning: true, 
                where: { title: title }, 
                include: { model: db.Author, required: true }}
            );
            return bookResults[1][0].dataValues;
          };
        } catch (err) {
          console.log(err);
          throw Error("There was something wrong while updating a book");
        }
      },
    },
  };
  export default resolvers;