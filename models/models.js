const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const ShopperModel = sequelize.define('shopper', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    info: {type: DataTypes.JSON},
})
const ShopperSharedInfoModel = sequelize.define('shopper_shared_infos', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    info: {type: DataTypes.JSON},
})
const BuyerModel = sequelize.define('buyer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    info: {type: DataTypes.JSON},
})
const OrderModel = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    info: {type: DataTypes.JSON},
})
const ShopOwnerModel = sequelize.define('shop_owners', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    info: {type: DataTypes.JSON},
})
const InviteModel = sequelize.define('invite', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    info: {type: DataTypes.JSON},
})

module.exports = {
    ShopperModel,
    ShopperSharedInfoModel,
    BuyerModel,
    OrderModel,
    ShopOwnerModel,
    InviteModel,
}

