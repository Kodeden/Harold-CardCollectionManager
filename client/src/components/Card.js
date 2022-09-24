function Card({ id, cardnumber, cardname, price, majorcard, quantityowned, cardcondition, grade, grader, set, frontpic, backpic }) {

  return (
    <li id={id}>
          <div>{cardnumber}</div>
          <div>{cardname}</div>
          <div>${price}</div>
          <div>{majorcard ? "X" : null}</div>
          <div>{quantityowned}</div>
          <div>{cardcondition}</div>
          <div>{grade}</div>
          <div>{grader}</div>
          <div>{set.setname}</div>
          <div>{set.setyear}</div>

    </li>
  );
}

export default Card;
