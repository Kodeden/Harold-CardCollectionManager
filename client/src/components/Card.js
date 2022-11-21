import React, { useState } from "react";
import "./Card.css";
import { gql, useMutation } from '@apollo/client';
import { AiFillDelete, AiFillEdit, AiFillFileImage, AiFillCloseCircle } from "react-icons/ai";
import Collapse from '@mui/material/Collapse';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

function Card({ id, cardnumber, cardname, price, majorcard, quantityowned, cardcondition, grade, grader, frontpic, backpic, set, deleteCard }) {
  const [newPrice, setNewPrice] = useState(price);
  const [newMajor, setNewMajor] = useState(majorcard);
  const [newQuantity, setNewQuantity] = useState(quantityowned);
  const [newCondition, setNewCondition] = useState(cardcondition);
  const [newGrade, setNewGrade] = useState(grade);
  const [newGrader, setNewGrader] = useState(grader);
  const [edit, setEdit] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const deleteImage = async (frontpic, backpic) => {
    const res = await fetch("http://localhost:4001/images", {
        method: "DELETE",
        body: {frontpic: frontpic, backpic: backpic},
    });
  }

  return (
    <li id={id}>
      {edit ? (
          <button
            onClick={() => {
              handleEdit(id, newPrice, newMajor, newQuantity, newCondition, newGrade, newGrader)
              setEdit(false)}}
            >
            <AiFillEdit />
          </button>
          ) : (
          <button
            onClick={() => {setEdit(true)}}
            >
            <AiFillEdit />
          </button>)
        }
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
            ${(String(newPrice).indexOf('.') !== -1) ? String(newPrice).padEnd(String(newPrice).indexOf('.')+3, '0') : newPrice}
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
      <button
        onClick={() => {setDialogOpen(!dialogOpen)}}
        >
        <AiFillFileImage />
      </button>
      <button
        onClick={() => {setDeleteOpen(!deleteOpen)}}
        >
        <AiFillDelete />
      </button>
      <Collapse in={deleteOpen}>
        Really delete #{cardnumber} - {cardname}? 
        <button
          onClick={() => {
            setDeleteOpen(false);
            deleteImage(frontpic, backpic);
            deleteCard(id);
          }}
          >
          Yes
        </button>
        <button
          onClick={() => {setDeleteOpen(false)}}
          >
          No
        </button>
      </Collapse>
      <Dialog
        open={dialogOpen}>
        <DialogTitle>Card Images<button
          onClick={() => {setDialogOpen(!dialogOpen)}}
          >
          <AiFillCloseCircle />
          </button></DialogTitle>
        <div>
          <div>{frontpic}</div>
          <div>{backpic}</div>
          <img src={`http://localhost:4001/${frontpic}`}></img>          
          <img src={`http://localhost:4001/${backpic}`}></img>
        </div>
      </Dialog>
    </li>
  );
}

export default Card;
