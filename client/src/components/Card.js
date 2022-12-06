import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';
import { AiFillCloseCircle } from "react-icons/ai";
import { IoImageOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';

function Card({ id, cardnumber, cardname, price, majorcard, quantityowned, cardcondition, grade, grader, frontpic, backpic, set, deleteCard }) {
  const [newPrice, setNewPrice] = useState(price);
  const [newMajor, setNewMajor] = useState(majorcard);
  const [newQuantity, setNewQuantity] = useState(quantityowned);
  const [newCondition, setNewCondition] = useState(cardcondition);
  const [newGrade, setNewGrade] = useState(grade);
  const [newGrader, setNewGrader] = useState(grader);
  const [newFrontpic, setNewFrontpic] = useState(frontpic);
  const [newBackpic, setNewBackpic] = useState(backpic);
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

  const UPDATE_FRONT = gql`
  mutation Mutation($id: String, $frontpic: String) {
    changeFrontPic(id: $id, frontpic: $frontpic) {
      frontpic
    }
  }
  `;
  const [updateFront] = useMutation(UPDATE_FRONT, {
      onCompleted: data => console.log(data)
  });

  const UPDATE_BACK = gql`
  mutation Mutation($id: String, $backpic: String) {
    changeBackPic(id: $id, backpic: $backpic) {
      backpic
    }
  }
  `;
  const [updateBack] = useMutation(UPDATE_BACK, {
      onCompleted: data => console.log(data)
  });

    
  const uploadImage = async (file) => {
    const formData = new FormData();
    if (file) {formData.append(file.name, file)};
    if (file) {
        const res = await fetch("http://localhost:4001/images", {
            method: "POST",
            body: formData,
        });
        const names = await res.json()
        // console.log(names);
        return names.message[0];}
    else return null;
  }

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

  const deleteImage = async (picname) => {
    const res = await fetch("http://localhost:4001/images/", {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({picname: picname})
    });
  }

  return (
    <li id={id}>
      {edit ? (
          <div><button
            className="listicon editicon"
            onClick={() => {
              handleEdit(id, newPrice, newMajor, newQuantity, newCondition, newGrade, newGrader)
              setEdit(false)}}
            >
            <TbEdit />
          </button></div>
          ) : (
          <div><button
            className="listicon editicon"
            onClick={() => {setEdit(true)}}
            >
            <TbEdit />
          </button></div>)
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
            className="majorbox"
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
      <div><button
        className="listicon"
        onClick={() => {setDialogOpen(!dialogOpen)}}
        >
        <IoImageOutline />
      </button></div>
      <div><button
        className="listicon"
        onClick={() => {setDeleteOpen(!deleteOpen)}}
        >
        <RiDeleteBin6Line />
      </button></div>
      <Dialog
        open={deleteOpen}>
        <DialogContent>
          <div className="deletedialog">
            <img className="deleteimage" alt="trash can" src={require("../images/deleteimage.png")}></img>
            <div className="deletetitle">Confirm delete!</div>
            <div className="deletetext">Do you really want to delete #{cardnumber}, {cardname}?</div>
            <div className="deletebuttons">
              <button
              className="gradbutton"
              onClick={() => {setDeleteOpen(false)}}
              >
              No
              </button>
              <button
                className="gradbutton yesbutton"
                onClick={() => {
                  setDeleteOpen(false);
                  deleteImage(frontpic);
                  deleteImage(backpic);
                  deleteCard(id);
                }}
                >
                Yes
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={dialogOpen}>
        <DialogContent style={{ overflow: "hidden" }}>
          <div className="imagestitle">
            Card Images<button
            className="listicon"
            onClick={() => {setDialogOpen(!dialogOpen)}}
            >
            <AiFillCloseCircle />
            </button>
          </div>
          <div className="imagescontainer">
            <div className="piccontainer">
            {newFrontpic ? <button
              className="gradbutton deleteimagebutton"
              onClick={() => {
                deleteImage(newFrontpic)
                updateFront({
                  variables: {
                      id: id,
                      frontpic: ""},
                  fetchPolicy : "network-only"})
                setNewFrontpic("")
              }}
              >
              Delete Front Image
            </button> : <input 
                      type="file" 
                      accept="image/*" 
                      multiple="" 
                      onChange={async (e) => {
                          const results = (await updateFront({
                            variables: {
                                id: id,
                                frontpic: await uploadImage(e.target.files[0])},
                            fetchPolicy : "network-only"}));
                          setNewFrontpic(results.data.changeFrontPic.frontpic);
                          
                      }}/>}
            <div>{newFrontpic ? <img alt="Card Front" src={`http://localhost:4001/${newFrontpic}`}></img> : <div>No Front Image Found</div>}</div>
            </div>
            <div className="piccontainer">
            {newBackpic ? <button
              className="gradbutton deleteimagebutton"
              onClick={() => {
                deleteImage(newBackpic)
                updateBack({
                  variables: {
                      id: id,
                      backpic: ""},
                  fetchPolicy : "network-only"})
                setNewBackpic("")
              }}
              >
              Delete Back Image
            </button> : <input 
                      type="file" 
                      accept="image/*" 
                      multiple="" 
                      onChange={async (e) => {
                          const results = (await updateBack({
                            variables: {
                                id: id,
                                backpic: await uploadImage(e.target.files[0])},
                            fetchPolicy : "network-only"}));
                          setNewBackpic(results.data.changeBackPic.backpic);
                          
                      }}/>}
            <div>{newBackpic ? <img alt="Card Back" src={`http://localhost:4001/${newBackpic}`}></img> : <div>No Back Image Found</div>}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </li>
  );
}

export default Card;
