import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { Link } from "react-router-dom";

export default function NewCard() {

    const [message, setMessage] = useState("");

    const ADD_CARD = gql`
    mutation Mutation(
        $cardnumber: String, 
        $cardname: String,
        $price: Float, 
        $setname: String, 
        $setyear: String, 
        $majorcard: Boolean, 
        $quantityowned: Int, 
        $cardcondition: String, 
        $grade: Float,
        $grader: String,
        $frontpic: String,
        $backpic: String) {
      addCard(
            cardnumber: $cardnumber, 
            cardname: $cardname, 
            price: $price, 
            setname: $setname, 
            setyear: $setyear, 
            majorcard: $majorcard, 
            quantityowned: $quantityowned, 
            cardcondition: $cardcondition, 
            grade: $grade, 
            grader: $grader, 
            frontpic: $frontpic, 
            backpic: $backpic) {
        cardname
      }
    }
    `;
    const [addCard] = useMutation(ADD_CARD, {
        onCompleted: data => setMessage(data.addCard.cardname + " added")
    });



    const [cardName, setCardName] = useState("");
    const [setName, setSetName] = useState("");
    const [year, setYear] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [price, setPrice] = useState("");
    const [majorCard, setMajorCard] = useState(false);
    const [numberOwned, setNumberOwned] = useState("");
    const [condition, setCondition] = useState("");
    const [grade, setGrade] = useState("");
    const [grader, setGrader] = useState("");
    const [frontpic, setFrontpic] = useState(null);
    const [backpic, setBackpic] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    
    const uploadImage = async (file) => {
        const formData = new FormData();
        if (file) {formData.append(file.name, file)};
        if (file) {
            const res = await fetch("http://localhost:4001/images", {
                method: "POST",
                body: formData,
            });
            const names = await res.json()
            console.log(names);
            return names.message[0];}
        else return null;

    }

    return (
        <main>
            <Link to="/" className="nounderline alignleft"><div className="gradbutton backbutton">Back to List View</div></Link>
            <div className="newcardcontainer">
                <div className="newcardtitle">Add new card</div>
                <div className="newcardinputs">
                    <div><span>CARD NAME</span>
                        <input
                            type="text"
                            name="text"
                            onChange={(e) => setCardName(e.target.value)}
                            value={cardName}
                        ></input>
                    </div>
                    <div><span>SET NAME</span>
                        <input
                            type="text"
                            name="text"
                            onChange={(e) => setSetName(e.target.value)}
                            value={setName}
                        ></input>
                    </div>
                    <div><span>YEAR</span>
                        <input
                            type="text"
                            name="text"
                            onChange={(e) => setYear(e.target.value)}
                            value={year}
                        ></input>
                    </div>
                    <div><span>CARD NUMBER</span>
                        <input
                            type="text"
                            name="text"
                            onChange={(e) => setCardNumber(e.target.value)}
                            value={cardNumber}
                        ></input>
                    </div>
                    <div><span>PRICE</span>
                        <span className="dollarsign"><input
                            className="priceinput"
                            type="number"
                            name="text"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        ></input></span>
                    </div>
                    <div><span>NUMBER OWNED</span>
                        <input
                            type="number"
                            name="text"
                            onChange={(e) => setNumberOwned(e.target.value)}
                            value={numberOwned}
                        ></input>
                    </div>
                    <div><span>CONDITION</span>
                        <select
                            value={condition}
                            onChange={(e) => {
                                setCondition(e.target.value)
                                console.log(condition)
                            }}
                        >
                            <option value=""></option>
                            <option value="P">P</option>
                            <option value="F">F</option>
                            <option value="G">G</option>
                            <option value="VG">VG</option>
                            <option value="VG-Ex">VG-Ex</option>
                            <option value="Ex">Ex</option>
                            <option value="Ex-Mt">Ex-Mt</option>
                            <option value="NM">NM</option>
                            <option value="NM-Mt">NM-Mt</option>
                            <option value="M">M</option>
                            <option value="GemM">GemM</option>
                        </select>
                    </div>
                    <div><span>GRADE</span>
                        <input
                            type="number"
                            name="text"
                            step="0.5"
                            onChange={(e) => setGrade(e.target.value)}
                            value={grade}
                        ></input>
                    </div>
                    <div><span>GRADER</span>
                        <input
                            type="text"
                            name="text"
                            onChange={(e) => setGrader(e.target.value)}
                            value={grader}
                        ></input>
                    </div>
                    <div className="newmajorcard">
                        <input
                            type="checkbox"
                            name="text"
                            onChange={(e) => setMajorCard(e.target.checked)}
                            checked={majorCard}
                        ></input>
                        <span>This is a major card</span>
                    </div>
                </div>
                <div className="newcardimages">
                    <div className="dropzonecontainer">
                        <input 
                            className="imageinput"
                            type="file" 
                            accept="image/*" 
                            multiple="" 
                            data-buttonText="Upload Front"
                            onChange={(e) => {
                                setFrontpic(e.target.files[0]);
                            }} />
                        <div className="dropzone"></div>
                        {frontpic ? <img alt="Front" className="cardimage" resizeMode="contain" src={URL.createObjectURL(frontpic)} /> : null}
                        {frontpic ? null : <img alt="Front" className="signage" src={require("../images/frontimagesignage.png")} />}
                    </div>
                    <div className="dropzonecontainer">
                        <input 
                            className="imageinput"
                            type="file" 
                            accept="image/*" 
                            multiple="" 
                            onChange={(e) => {
                                setBackpic(e.target.files[0])
                            }} />
                        <div className="dropzone"></div>
                        {backpic ? <img alt="Back" className="cardimage" resizeMode="contain" src={URL.createObjectURL(backpic)} /> : <img alt="Front" className="signage" src={require("../images/backimagesignage.png")} />}
                    </div>
                </div>
                <button 
                        className="gradbutton"
                        type="text"
                        name="text"
                        onClick={async (e) => {
                            const res = await addCard({
                                variables: {
                                    cardnumber: cardNumber, 
                                    cardname: cardName, 
                                    price: Number(price), 
                                    setname: setName, 
                                    setyear: year, 
                                    majorcard: Boolean(majorCard), 
                                    quantityowned: Number(numberOwned), 
                                    cardcondition: condition,
                                    grade: Number(grade), 
                                    grader: grader,
                                    frontpic: await uploadImage(frontpic),
                                    backpic: await uploadImage(backpic)},
                                fetchPolicy : "network-only"});
                            if (res) {setDialogOpen(true)};
                        }}
                >Add card</button>
                            <div>{message ? message : null}</div>
            </div>
            <Dialog
                open={dialogOpen}>
                <DialogContent>
                <div className="deletedialog">
                    <img className="deleteimage" alt="thumbs up" src={require("../images/thumbsup.png")}></img>
                    <div className="deletetitle">Card added</div>
                    <div className="deletetext">#{cardNumber}, {cardName} added successfully.</div>
                    <div className="deletebuttons">
                    <button
                    className="gradbutton"
                    onClick={() => {setDialogOpen(false)}}
                    >
                    Okay
                    </button>
                    </div>
                </div>
                </DialogContent>
            </Dialog>
        </main>
    );
  }