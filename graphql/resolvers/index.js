import { isConstValueNode } from "graphql";
import { Sequelize } from "sequelize";
import { GraphQLUpload } from "graphql-upload-minimal";
import fs from "fs";
import path from "path";

const resolvers = {
    Query: {
      cards: async (parent, args, { db }) => {
        try {
          const results = await db.Card.findAll({
            include: { model: db.Set, required: true },
          });
  
          return results;
        } catch (err) {
          console.log(err);
          throw Error(err);
        }
      },
      cardsBySet: async (parent, { set, year }, { db }) => {
        try {
          const results = await db.Set.findAll({
            where: { setname: set, setyear: year },
          });
          if (results.length) {
            const setId = results[0].dataValues?.id

            const cardresults = await db.Card.findAll({
              where: { setId: setId },
              include: { model: db.Set, required: true },
            });
            if (cardresults.length) {
              return cardresults
            }
          }
          throw Error("Failed to get cards by set");
        } catch (err) {
          console.log(err);
  
          throw Error(err);
        }
      },
      cardsByName: async (parent, { cardname }, { db }) => {
        cardname = "%"+cardname+"%"
        try {
          const results = await db.Card.findAll({
            where: { cardname: {[Sequelize.Op.like]: cardname} },
            include: { model: db.Set, required: true },
          });
  
          return results;
        } catch (err) {
          console.log(err);
          throw Error(err);
        }
      },

    },
    Upload: GraphQLUpload,
    Mutation: {
      singleUpload: async (parent, { file }) => {
        const { createReadStream, filename, mimetype, encoding } = await file;
  
        // // Invoking the `createReadStream` will return a Readable Stream.
        // // See https://nodejs.org/api/stream.html#stream_readable_streams
        const stream = createReadStream();
  
        // // This is purely for demonstration purposes and will overwrite the
        // // local-file-output.txt in the current working directory on EACH upload.
        // const out = fs.createWriteStream('local-file-output.txt');
        // stream.pipe(out);
        // await finished(out);
  
        // return { filename, mimetype, encoding };
        const pathName = path.join(__dirname, `/public/images/${filename}`);
        await stream.pipe(fs.createWriteStream(pathName));
        return {url: `http://localhost:4000/images/${filename}`}
      },
      addCard: async (parent, { cardnumber, cardname, price, setname, setyear, majorcard, quantityowned, cardcondition, grade, grader, frontpic, backpic }, { db }) => {
        let newSet = {};
        let card = { cardnumber, cardname, price, majorcard, quantityowned, cardcondition, grade, grader, frontpic, backpic };  
        try {
          const results = await db.Set.findOrCreate({
            where: { setname: setname, setyear: setyear },
            defaults: { setname: setname,  setyear: setyear},
          });
          if (results.length) {
            newSet = { ...results[0].dataValues };
            card = { ...card, setId: newSet.id };
  
            const cardResults = await db.Card.findOrCreate({
              where: { cardnumber: cardnumber, cardname: cardname, setId: newSet.id },
              defaults: { ...card },
              include: { model: db.Set, required: true },
            });
  
            if (cardResults.length) {
              return cardResults[0].dataValues;
            }
          }
  
          throw Error("There was something wrong while creating a card");
        } catch (err) {
          console.log(err);
          throw Error("There was something wrong while creating a card");
        }
      },

      deleteCard: async (parent, { id }, { db }) => {
        try {
          const results = await db.Card.destroy({
            returning: true,
            where: { id: id },
          });
          console.log(results)
          return 'Card Deleted';
            }
        catch (err) {
          console.log(err);
          throw Error("There was something wrong while deleting a card");
        }
      },
      updateCard: async (parent, { id, price, majorcard, quantityowned, cardcondition, grade, grader }, { db }) => {
        try {
          let results = await db.Card.update(
            {
              price: price,
              majorcard: majorcard,
              quantityowned: quantityowned,
              cardcondition: cardcondition,
              grade: grade,
              grader: grader
            },
            {returning: true, 
              where: { id: id }, 
              }
          );
          results = await db.Card.findAll({
            include: { model: db.Set, required: true },
            where: { id: id }
          });
          console.log(results);
          return results[0].dataValues;
        } catch (err) {
          console.log(err);
          throw Error("There was something wrong while updating a card");
        }
      },
      changePrice: async (parent, { id, price }, { db }) => {
        try {
          let results = await db.Card.update(
            { price: price },
            {returning: true, 
              where: { id: id }, 
              }
          );
          results = await db.Card.findAll({
            include: { model: db.Set, required: true },
            where: { id: id }
          });
          console.log(results);
          return results[0].dataValues;
        } catch (err) {
          console.log(err);
          throw Error("There was something wrong while updating a card");
        }
      },
      changeMajor: async (parent, { id, majorcard }, { db }) => {
        try {
          let results = await db.Card.update(
            { majorcard: majorcard },
            {returning: true, 
              where: { id: id }, 
              }
          );
          results = await db.Card.findAll({
            include: { model: db.Set, required: true },
            where: { id: id }
          });
          console.log(results);
          return results[0].dataValues;
        } catch (err) {
          console.log(err);
          throw Error("There was something wrong while updating a card");
        }
      },
      changeQuantity: async (parent, { id, quantityowned }, { db }) => {
        try {
          let results = await db.Card.update(
            { quantityowned: quantityowned },
            {returning: true, 
              where: { id: id }, 
              }
          );
          results = await db.Card.findAll({
            include: { model: db.Set, required: true },
            where: { id: id }
          });
          console.log(results);
          return results[0].dataValues;
        } catch (err) {
          console.log(err);
          throw Error("There was something wrong while updating a card");
        }
      },
      changeCardCondition: async (parent, { id, cardcondition }, { db }) => {
        try {
          let results = await db.Card.update(
            { cardcondition: cardcondition },
            {returning: true, 
              where: { id: id }, 
              }
          );
          results = await db.Card.findAll({
            include: { model: db.Set, required: true },
            where: { id: id }
          });
          console.log(results);
          return results[0].dataValues;
        } catch (err) {
          console.log(err);
          throw Error("There was something wrong while updating a card");
        }
      },
    },
  };
  export default resolvers;