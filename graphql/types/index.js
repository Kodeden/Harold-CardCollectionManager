import { gql } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload-minimal";
import resolvers from "../resolvers/index.js";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`

  type Card {
    id: ID
    cardnumber: String!
    cardname: String!
    price: Float
    majorcard: Boolean
    quantityowned: Int!
    cardcondition: Int
    grade: Float
    grader: String
    frontpic: String
    backpic: String
    set: Set
  }
  type Set {
    id: ID
    setname: String!
    setyear: String!
    cards: [Card]
  }

  type Query {
    cards: [Card]
    cardsBySet(set: String, year: String): [Card]
    cardsByName(cardname: String, sortBy: String, ascdesc: String): [Card]
    cardsBySetAndName(cardname: String, set: String, year: String, sortBy: String, ascdesc: String): [Card]

  }
  type Mutation {
    addCard(cardnumber: String, cardname: String, price: Float, setname: String, setyear: String, majorcard: Boolean, quantityowned: Int, cardcondition: Int, grade: Float, grader: String, frontpic: String, backpic: String): Card
    deleteCard(id: String): String
    updateCard(id: String, price: Float, majorcard: Boolean, quantityowned: Int, cardcondition: Int, grade: Float, grader: String): Card
    changePrice(id: String, price: Float): Card
    changeMajor(id: String, majorcard: Boolean): Card
    changeQuantity(id: String, quantityowned: String): Card
    changeCardCondition(id: String, cardcondition: String): Card
    changeFrontPic(id: String, frontpic: String): Card
    changeBackPic(id: String, backpic: String): Card
  }
`;

export default typeDefs;