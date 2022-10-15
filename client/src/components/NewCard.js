import React, { useState } from "react";
import "./NewCard.css";
import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';


export default function NewCard() {

    // const client = new ApolloClient({
    //     link: createUploadLink({
    //         uri: 'http://localhost:4000',
    //     }),
    //     cache: new InMemoryCache(),
    //   });
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
        $cardcondition: Int, 
        $grade: Float,
        $grader: String) {
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
            grader: $grader) {
        cardname
      }
    }
    `;
    const ADD_FILE = gql`
    mutation singleUpload($file: Upload!) {
      singleUpload(file: $file) {
        url
      }
    }
    `;
    const [uploadFile] = useMutation(ADD_FILE, {
        onCompleted: data => console.log(data)
    });
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
    const [frontpic, setFrontpic] = useState("");
    const [backpic, setBackpic] = useState("");
    const getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            console.log(baseURL);
            resolve(baseURL);
          };
          console.log(fileInfo);
        });
      };

    return (
        <main>
            <div>Card Name:
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setCardName(e.target.value)}
                    value={cardName}
                ></input>
            </div>
            <div>Set Name:
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setSetName(e.target.value)}
                    value={setName}
                ></input>
            </div>
            <div>Year:
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setYear(e.target.value)}
                    value={year}
                ></input>
            </div>
            <div>Card Number:
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setCardNumber(e.target.value)}
                    value={cardNumber}
                ></input>
            </div>
            <div>Price: $
                <input
                    type="number"
                    name="text"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                ></input>
            </div>
            <div>Major Card:
                <input
                    type="checkbox"
                    name="text"
                    onChange={(e) => setMajorCard(e.target.checked)}
                    checked={majorCard}
                ></input>
            </div>
            <div>Number Owned:
                <input
                    type="number"
                    name="text"
                    onChange={(e) => setNumberOwned(e.target.value)}
                    value={numberOwned}
                ></input>
            </div>
            <div>Condition:
                <input
                    type="number"
                    name="text"
                    onChange={(e) => setCondition(e.target.value)}
                    value={condition}
                ></input>
            </div>
            <div>Grade:
                <input
                    type="number"
                    name="text"
                    onChange={(e) => setGrade(e.target.value)}
                    value={grade}
                ></input>
            </div>
            <div>Grader:
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setGrader(e.target.value)}
                    value={grader}
                ></input>
            </div>
            <div>
                Front Image
                <input 
                    type="file" 
                    accept="image/*" 
                    multiple="" 
                    onChange={async (e) => {
                        setFrontpic(e.target.files[0]);
                    }} />
                {frontpic ? <img alt="Front" className="cardimage" src={URL.createObjectURL(frontpic)} /> : null}
            </div>
            <div>
                Back Image
                <input 
                    type="file" 
                    accept="image/*" 
                    multiple="" 
                    onChange={(e) => {
                        setBackpic(e.target.files[0])
                    }} />
                {backpic ? <img alt="Back" className="cardimage" src={URL.createObjectURL(backpic)} /> : null}
            </div>
            <button 
                    type="text"
                    name="text"
                    onClick={(e) => addCard({
                        variables: {
                            cardnumber: cardNumber, 
                            cardname: cardName, 
                            price: Number(price), 
                            setname: setName, 
                            setyear: year, 
                            majorcard: Boolean(majorCard), 
                            quantityowned: Number(numberOwned), 
                            cardcondition: Number(condition),
                            grade: Number(grade), 
                            grader: grader},
                          fetchPolicy : "network-only"})}
            >Add Card</button>
            {/*<button 
                    type="text"
                    name="text"
                    onClick={(e) => uploadFile({
                        variables: {
                            file: frontpic},
                          fetchPolicy : "network-only"})}
            >test</button>
            <button 
                    type="text"
                    name="text"
                    onClick={(e) => {console.log((frontpic))}}
                        >test2</button>*/}
                        <div>{message ? message : null}</div>
        </main>
    );
  }