import { useState } from "react";
import "./Card.css";
import { gql, useMutation } from '@apollo/client';

function Card({ id, cardnumber, cardname, price, majorcard, quantityowned, cardcondition, grade, grader, set }) {
  const [newPrice, setNewPrice] = useState(price);
  const [newMajor, setNewMajor] = useState(majorcard);
  const [newQuantity, setNewQuantity] = useState(quantityowned);
  const [newCondition, setNewCondition] = useState(cardcondition);
  const [newGrade, setNewGrade] = useState(grade);
  const [newGrader, setNewGrader] = useState(grader);
  const [edit, setEdit] = useState(false);

  const toggleEditMode = () => {
    setEdit(!edit);
  };

  const UPDATE_CARD = gql`
  mutation Mutation($id: String, $price: Float, $majorcard: Boolean, $quantityowned: Int, $cardcondition: Int, $grade: Float, $grader: String) {
    updateCard(id: $id, price: $price, majorcard: $majorcard, quantityowned: $quantityowned, cardcondition: $cardcondition, grade: $grade, grader: $grader) {
      id
    }
  }
  `;
  const [updateCard] = useMutation(UPDATE_CARD, {
      onCompleted: data => console.log(data)
  });
  const handleEdit = (id, price, majorcard, quantityowned, cardcondition, grade, grader) => {
    updateCard({
      variables: {
          id: id,
          price: Number(price),
          majorcard: Boolean(majorcard), 
          quantityowned: Number(quantityowned), 
          cardcondition: Number(cardcondition),
          grade: Number(grade), 
          grader: grader},
      fetchPolicy : "network-only"})
    };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEdit(id, newPrice, newMajor, newQuantity, newCondition, newGrade, newGrader);
      setEdit(false);
    }
  };

  return (
    <li id={id}>
          <div>{cardnumber}</div>
          <div>{cardname}</div>
          <div>
            {edit ? (
              <input
                type="number"
                onChange={(e) => setNewPrice(e.target.value)}
                onKeyPress={handleKeyPress}
                value={newPrice}
              ></input>
              ) : (
              <span onDoubleClick={toggleEditMode} id={id}>
                ${newPrice}
              </span>)
            }
          </div>
          <div>{edit ? (
              <input
                type="checkbox"
                onChange={(e) => setNewMajor(e.target.checked)}
                onKeyPress={handleKeyPress}
                checked={newMajor}
              ></input>
              ) : (
              <span onDoubleClick={toggleEditMode} id={id}>
                {newMajor ? "Yes" : "No"}
              </span>)
            }</div>
          <div>
            {edit ? (
              <input
                type="number"
                onChange={(e) => setNewQuantity(e.target.value)}
                onKeyPress={handleKeyPress}
                value={newQuantity}
              ></input>
              ) : (
              <span onDoubleClick={toggleEditMode} id={id}>
                {newQuantity}
              </span>)
            }</div>
          <div>
            {edit ? (
              <input
                type="number"
                onChange={(e) => setNewCondition(e.target.value)}
                onKeyPress={handleKeyPress}
                value={newCondition}
              ></input>
              ) : (
              <span onDoubleClick={toggleEditMode} id={id}>
                {newCondition}
              </span>)
            }</div>
          <div>
            {edit ? (
              <input
                type="number"
                onChange={(e) => setNewGrade(e.target.value)}
                onKeyPress={handleKeyPress}
                value={newGrade}
              ></input>
              ) : (
              <span onDoubleClick={toggleEditMode} id={id}>
                {newGrade}
              </span>)
            }</div>
          <div>
            {edit ? (
              <input
                type="text"
                onChange={(e) => setNewGrader(e.target.value)}
                onKeyPress={handleKeyPress}
                value={newGrader}
              ></input>
              ) : (
              <span onDoubleClick={toggleEditMode} id={id}>
                {newGrader}
              </span>)
            }</div>
          <div>{set.setname}</div>
          <div>{set.setyear}</div>

    </li>
  );
}

export default Card;
