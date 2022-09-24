export default (sequelize, DataTypes) => {
    const Set = sequelize.define(
      "set",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        setname: {
          type: DataTypes.STRING,
          allowNull: false,
          required: true,
        },
        setyear: {
          type: DataTypes.STRING,
          allowNull: false,
          required: true,
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    return Set;
  };