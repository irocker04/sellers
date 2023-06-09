const ApiError = require('../errors/ApiError.js');
const {ShopperModel} = require('../models/models.js')

class ShopperController {
    async create(req, res, next) {
        let {info} = req.body;

        if (!info) {
            return next(ApiError.badRequest('info is required'));
        }

        const shopper = await ShopperModel.create({info})
        return res.status(201).json(shopper)
    }

    async getAll(req, res) {
        let {page, limit} = req.query
        page = page || 1
        limit = (limit || 10) * 1
        let offset = page * limit - limit

        const shoppers = await ShopperModel.findAndCountAll({
            limit, offset,
            order: [
                ['id', 'DESC']
            ]
        })

        return res.json({data: shoppers.rows, count: shoppers.count})
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const shopper = await ShopperModel.findOne(
            {
                where: {id},
            },
        )
        if (!shopper) {
            return next(ApiError.notFound(`Shopper with ID ${id} not found`))
        }
        return res.json(shopper)
    }

    async update(req, res, next) {
        const {id} = req.params
        const shopper = await ShopperModel.findOne(
            {
                where: {id},
            },
        )
        if (!shopper) {
            return next(ApiError.notFound(`Shopper with ID ${id} not found`))
        }

        let {info} = req.body;

        if (!info) {
            return next(ApiError.badRequest('info is required'));
        }

        shopper.info = info;
        await shopper.save();

        return res.json(shopper)
    }

    async delete(req, res, next) {
        const {id} = req.params

        const shopper = await ShopperModel.findOne(
            {
                where: {id},
            },
        )
        if (!shopper) {
            return next(ApiError.notFound(`Shopper with ID ${id} not found`))
        }

        await shopper.destroy();

        return res.status(204).json();
    }
}

module.exports = new ShopperController()
