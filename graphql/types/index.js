import { gql } from "apollo-server-express";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`

  scalar Upload

  type File {
    url: String!
  }
  
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
    frontpic: File
    backpic: File
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
    singleUpload(file: Upload!): File!
    addCard(cardnumber: String, cardname: String, price: Float, setname: String, setyear: String, majorcard: Boolean, quantityowned: Int, cardcondition: Int, grade: Float, grader: String, frontpic: Upload, backpic: Upload): Card
    deleteCard(id: String): String
    updateCard(id: String, price: Float, majorcard: Boolean, quantityowned: Int, cardcondition: Int, grade: Float, grader: String): Card
    changePrice(id: String, price: Float): Card
    changeMajor(id: String, majorcard: Boolean): Card
    changeQuantity(id: String, quantityowned: String): Card
    changeCardCondition(id: String, cardcondition: String): Card
  }
`;

export default typeDefs;