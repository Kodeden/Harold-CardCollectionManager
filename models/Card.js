export default (sequelize, DataTypes) => {
    const Card = sequelize.define(
      "card",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        cardnumber: {
          type: DataTypes.STRING,
          allowNull: false,
          required: true,
        },
        cardname: {
          type: DataTypes.STRING,
          allowNull: false,
          required: true,
        },
        price: {
          type: DataTypes.REAL,
        },
        majorcard: {
          type: DataTypes.TINYINT,
        },
        quantityowned: {
          type: DataTypes.INTEGER,
          allowNull: false,
          required: true,
        },
        cardcondition: {
          type: DataTypes.INTEGER,
        },
        grade: {
          type: DataTypes.REAL,
        },
        grader: {
          type: DataTypes.STRING,
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    return Card;
  };