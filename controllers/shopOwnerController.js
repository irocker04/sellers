const ApiError = require('../errors/ApiError.js');
const {ShopOwnerModel} = require('../models/models.js')

class ShopOwnerController {
    async create(req, res, next) {
        let {info} = req.body;

        if (!info) {
            return next(ApiError.badRequest('info is required'));
        }

        const shopOwner = await ShopOwnerModel.create({info})
        return res.status(201).json(shopOwner)
    }

    async getAll(req, res) {
        let {page, limit} = req.query
        page = page || 1
        limit = (limit || 10) * 1
        let offset = page * limit - limit

        const shopOwners = await ShopOwnerModel.findAndCountAll({
            limit, offset,
            order: [
                ['id', 'DESC']
            ]
        })

        return res.json({data: shopOwners.rows, count: shopOwners.count})
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const shopOwner = await ShopOwnerModel.findOne(
            {
                where: {id},
            },
        )
        if (!shopOwner) {
            return next(ApiError.notFound(`ShopOwner with ID ${id} not found`))
        }
        return res.json(shopOwner)
    }

    async update(req, res, next) {
        const {id} = req.params
        const shopOwner = await ShopOwnerModel.findOne(
            {
                where: {id},
            },
        )
        if (!shopOwner) {
            return next(ApiError.notFound(`ShopOwner with ID ${id} not found`))
        }

        let {info} = req.body;

        if (!info) {
            return next(ApiError.badRequest('info is required'));
        }

        shopOwner.info = info;
        await shopOwner.save();

        return res.json(shopOwner)
    }

    async delete(req, res, next) {
        const {id} = req.params

        const shopOwner = await ShopOwnerModel.findOne(
            {
                where: {id},
            },
        )
        if (!shopOwner) {
            return next(ApiError.notFound(`ShopOwner with ID ${id} not found`))
        }

        await shopOwner.destroy();

        return res.status(204).json();
    }
}

module.exports = new ShopOwnerController()
