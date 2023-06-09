const ApiError = require('../errors/ApiError.js');
const {ShopperSharedInfoModel} = require('../models/models.js')

class ShopperSharedInfoController {
    async create(req, res, next) {
        let {info} = req.body;

        if (!info) {
            return next(ApiError.badRequest('info is required'));
        }

        const shopperSharedInfo = await ShopperSharedInfoModel.create({info})
        return res.status(201).json(shopperSharedInfo)
    }

    async getAll(req, res) {
        let {page, limit} = req.query
        page = page || 1
        limit = (limit || 10) * 1
        let offset = page * limit - limit

        const shopperSharedInfos = await ShopperSharedInfoModel.findAndCountAll({
            limit, offset,
            order: [
                ['id', 'DESC']
            ]
        })

        return res.json({data: shopperSharedInfos.rows, count: shopperSharedInfos.count})
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const shopperSharedInfo = await ShopperSharedInfoModel.findOne(
            {
                where: {id},
            },
        )
        if (!shopperSharedInfo) {
            return next(ApiError.notFound(`ShopperSharedInfo with ID ${id} not found`))
        }
        return res.json(shopperSharedInfo)
    }

    async update(req, res, next) {
        const {id} = req.params
        const shopperSharedInfo = await ShopperSharedInfoModel.findOne(
            {
                where: {id},
            },
        )
        if (!shopperSharedInfo) {
            return next(ApiError.notFound(`ShopperSharedInfo with ID ${id} not found`))
        }

        let {info} = req.body;

        if (!info) {
            return next(ApiError.badRequest('info is required'));
        }

        shopperSharedInfo.info = info;
        await shopperSharedInfo.save();

        return res.json(shopperSharedInfo)
    }

    async delete(req, res, next) {
        const {id} = req.params

        const shopperSharedInfo = await ShopperSharedInfoModel.findOne(
            {
                where: {id},
            },
        )
        if (!shopperSharedInfo) {
            return next(ApiError.notFound(`ShopperSharedInfo with ID ${id} not found`))
        }

        await shopperSharedInfo.destroy();

        return res.status(204).json();
    }
}

module.exports = new ShopperSharedInfoController()
