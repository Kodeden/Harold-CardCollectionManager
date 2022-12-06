import React, { useState } from "react";
import "./Cards.css";
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import Card from "./Card.js"
import { Link } from "react-router-dom";


export default function Cards() {
   
    const [cardName, setCardName] = useState("");
    const [setName, setSetName] = useState("");
    const [year, setYear] = useState("");
    const [sortBy, setSortBy] = useState("cardnumber");
    const [ascdesc, setAscdesc] = useState("Asc");


    const CARDS = gql`
        query Query($cardname: String, $set: String, $year: String, $sortBy: String, $ascdesc: String) {
            cardsBySetAndName(cardname: $cardname, set: $set, year: $year, sortBy: $sortBy, ascdesc: $ascdesc) {
                id
                cardnumber
                cardname
                price
                majorcard
                quantityowned
                cardcondition
                grade
                grader
                frontpic
                backpic
                set {
                setname
                setyear
                }
            }
        }
     `;
    
    const [getCards, { data, loading, error }] = useLazyQuery(CARDS);

    const DELETE_CARD = gql`
    mutation Mutation($id: String) {
        deleteCard(id: $id)
    }
    `;
    const [deleteCard] = useMutation(DELETE_CARD, {
        onCompleted: data => console.log(data)
    });
    
    const handleDelete = (id) => {
      deleteCard({
        variables: {
            id: id},
        fetchPolicy : "network-only"});
      getCards({ 
        variables: { 
            cardname: cardName,
            set: setName,
            year: year,
            sortBy: sortBy,
            ascdesc: ascdesc
        },
        fetchPolicy : "network-only"
      });
    };
                    

    return (
        <main>
            <div className="inputbox">
                <div className="inputheader">Search cards</div>
                <div className="inputs">
                <div>
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setCardName(e.target.value)}
                    value={cardName}
                    placeholder="Card Name"
                ></input>
                </div>
                <div>
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setSetName(e.target.value)}
                    value={setName}
                    placeholder="Set Name"
                ></input>
                </div>
                <div>
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setYear(e.target.value)}
                    value={year}
                    placeholder="Year"
                ></input>
                </div>
                <div>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="cardnumber">Sort by</option>
                    <option value="cardnumber">Card #</option>
                    <option value="cardname">Card Name</option>
                    <option value="price">Price</option>
                    <option value="majorcard">Major Card</option>
                    <option value="quantityowned">Number Owned</option>
                    <option value="cardcondition">Card Condition</option>
                    <option value="grade">Grade</option>
                    <option value="grader">Grader</option>
                </select>
                </div>
                <div>
                <select
                    value={ascdesc}
                    onChange={(e) => setAscdesc(e.target.value)}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                </div>
                    <div 
                    className="gradbutton searchbutton"
                    type="text"
                    name="text"
                    onClick={(e) => (getCards({ 
                        variables: { 
                            cardname: cardName,
                            set: setName,
                            year: year,
                            sortBy: sortBy,
                            ascdesc: ascdesc
                        },
                        fetchPolicy : "network-only"
                    }))}
                    >Search</div>
            </div>
            </div>
            <div className="list">
                <div className="listtitle"><div>Card list</div><Link to="/NewCard" className="nounderline"><div className="gradbutton">Add Card</div></Link></div>
                <ul className="listheader">
                    <li className="listheaders">
                        <div>EDIT</div>
                        <div>CARD#</div>
                        <div>CARD NAME</div>
                        <div>PRICE</div>
                        <div>MAJOR</div>
                        <div>OWNED</div>
                        <div>CONDITION</div>
                        <div>GRADE</div>
                        <div>GRADER</div>
                        <div>SET NAME</div>
                        <div>SET YEAR</div>
                        <div>IMAGES</div>
                        <div>DELETE</div>
                    </li>
                </ul>
                <ul className="cardlist">    
                    {(!loading && !error && (data !== undefined)) ? (data.cardsBySetAndName.map((card) => {
                    return (
                        <Card
                            key={card.id}
                            {...card}
                            deleteCard={handleDelete}
                        />
                    );
                    })) : null }
                    {loading ? (<div>LOADING</div>) : null}
                </ul>
            </div>
        </main>
    );
  }