const sequelize = require('../db.js');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user',
{
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    
    email:
    {
        type: DataTypes.STRING,
        unique: true
    },

    password:
    {
        type: DataTypes.STRING
    },

    role:
    {
        type: DataTypes.STRING,
        defaultValue: "USER"
    }
})



const BasketDevice = sequelize.define('basket_Device',
{
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId:
    {
        type: DataTypes.INTEGER,
        unique:true,
        allowNull: false,
        onDelete: 'CASCADE'
    },
    deviceId:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE'
    },

})

const Device = sequelize.define('device',
{
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name:
    {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    price:
    {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    image:
    {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

const Type = sequelize.define('type',
{
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name:
    {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

const Brand = sequelize.define('brand',
{
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name:
    {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

const Rating = sequelize.define('rating',
{
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId:
    {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false
    },

    deviceId:
    {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false
    },
    rate:
    {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false
    }
})

const DeviceInfo = sequelize.define('device_Info',
{
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title:
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    description:
    {
        type: DataTypes.STRING,
        allowNull: false
    }
})


User.hasMany(BasketDevice)
BasketDevice.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)


Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device)



module.exports =
{
    User,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    DeviceInfo
}