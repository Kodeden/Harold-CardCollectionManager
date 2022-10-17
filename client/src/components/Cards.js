import React, { useState } from "react";
import "./Cards.css";
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import Card from "./Card.js"


// const client = new ApolloClient({
//   uri: 'http://localhost:4000',
//   cache: new InMemoryCache(),
// });

export default function Cards() {
   
    const [cardName, setCardName] = useState("");
    const [setName, setSetName] = useState("");
    const [year, setYear] = useState("");
    const [sortBy, setSortBy] = useState("cardnumber");
    const [ascdesc, setAscdesc] = useState("Asc");
    //const [cardlist, setCardlist] = useState([]);


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
            <div className="inputs">
                <div>Card Name:
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setCardName(e.target.value)}
                    value={cardName}
                ></input>
                {/*<button 
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
                                }
                            }
                          `, 
                          variables: {cardname: cardName}
                        }, ).then((result) => setCardlist(result.data.cardsByName)))}
                    >Search by Name</button>*/}
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
                <div>Sort by:
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="cardnumber">Card #</option>
                    <option value="cardname">Card Name</option>
                    <option value="price">Price</option>
                    <option value="majorcard">Major Card</option>
                    <option value="quantityowned">Number Owned</option>
                    <option value="cardcondition">Card Condition</option>
                    <option value="grade">Grade</option>
                    <option value="grader">Grader</option>
                </select>
                <select
                    value={ascdesc}
                    onChange={(e) => setAscdesc(e.target.value)}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                </div>
                {/*<button 
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
                                <button 
                    type="text"
                    name="text"
                    onClick={(e) => (setSearch(true))}
                    >All Cards 2</button>*/}
                    <button 
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
                    >Search</button>
            </div>
            <div>
                <ul className="listheader">
                    <li>
                        <div>Edit</div>
                        <div>Card #</div>
                        <div>Card Name</div>
                        <div>Price</div>
                        <div>Major</div>
                        <div>Owned</div>
                        <div>Condition</div>
                        <div>Grade</div>
                        <div>Grader</div>
                        <div>Set Name</div>
                        <div>Set Year</div>
                        <div>Images</div>
                        <div>Delete</div>
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