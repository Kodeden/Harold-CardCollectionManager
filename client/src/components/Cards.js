import React, { useState } from "react";
import "./Cards.css";
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import Card from "./Card.js"


const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export default function Cards() {
    const [cardName, setCardName] = useState("");
    const [setName, setSetName] = useState("");
    const [year, setYear] = useState("");
    const [cardlist, setCardlist] = useState([]);

    // const ALL_CARDS = gql`
    //     query  Query {
    //         cards {
    //             id
    //             cardnumber
    //             cardname
    //             price
    //             majorcard
    //             quantityowned
    //             cardcondition
    //             grade
    //             grader
    //             set {
    //                 setname
    //                 setyear
    //             }
    //         }

    //     }
    // `;
    
    // const { data, loading, error } = useQuery(ALL_CARDS);

    return (
        <main>
            <div className="inputs">
                <div>Card Name:
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setCardName(e.target.value)}
                    value={cardName}
                ></input>
                <button 
                    type="text"
                    name="text"
                    onClick={(e) => (
                        client.query({
                          query: gql`
                            query Query($cardname: String) {
                                cardsByName(cardname: $cardname) {
                                id
                                cardnumber
                                cardname
                                price
                                majorcard
                                quantityowned
                                cardcondition
                                grade
                                grader
                                set {
                                    setname
                                    setyear
                                }
                                frontpic
                                backpic
                                }
                            }
                          `, 
                          variables: {cardname: cardName}
                        }, ).then((result) => setCardlist(result.data.cardsByName)))}
                >Search by Name</button>
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
                <button 
                    type="text"
                    name="text"
                    onClick={(e) => (
                        client.query({
                          query: gql`
                            query Query($set: String, $year: String) {
                                cardsBySet(set: $set, year: $year) {
                                id
                                cardnumber
                                cardname
                                price
                                majorcard
                                quantityowned
                                cardcondition
                                grade
                                grader
                                set {
                                    setname
                                    setyear
                                }
                                frontpic
                                backpic
                                }
                            }
                          `, 
                          variables: {set: setName, year: year}
                        }, ).then((result) => setCardlist(result.data.cardsBySet)))}
                >Search by Set and Year</button>
                <button 
                    type="text"
                    name="text"
                    onClick={(e) => (
                        client.query({
                          query: gql`
                            query  Query {
                                cards {
                                    id
                                    cardnumber
                                    cardname
                                    price
                                    majorcard
                                    quantityowned
                                    cardcondition
                                    grade
                                    grader
                                    set {
                                        setname
                                        setyear
                                      }
                                }

                            }
                          `,
                          fetchPolicy : "network-only"
                        }).then((result) => setCardlist(result.data.cards)))}
                >All Cards</button>
                                {/* <button 
                    type="text"
                    name="text"
                    onClick={(e) => (setCardlist(data.cards))}
                >All Cards 2</button> */}
            </div>
            <div>
                <ul className="list">
                    <li>
                        <div>Card Number</div>
                        <div>Card Name</div>
                        <div>Price</div>
                        <div>Major Card</div>
                        <div>Number Owned</div>
                        <div>Condition</div>
                        <div>Grade</div>
                        <div>Grader</div>
                        <div>Set Name</div>
                        <div>Set Year</div>
                    </li>
                    {cardlist.map((card) => {
                    return (
                        <Card
                            key={card.id}
                            {...card}
                        />
                    );
                    })}
                </ul>
            </div>
        </main>
    );
  }