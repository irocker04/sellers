const ApiError = require('../errors/ApiError.js');
const {BuyerModel} = require('../models/models.js')

class BuyerController {
    async create(req, res, next) {
        let {info} = req.body;

        if (!info) {
            return next(ApiError.badRequest('info is required'));
        }

        const buyer = await BuyerModel.create({info})
        return res.status(201).json(buyer)
    }

    async getAll(req, res) {
        let {page, limit} = req.query
        page = page || 1
        limit = (limit || 10) * 1
        let offset = page * limit - limit

        const buyers = await BuyerModel.findAndCountAll({
            limit, offset,
            order: [
                ['id', 'DESC']
            ]
        })

        return res.json({data: buyers.rows, count: buyers.count})
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const buyer = await BuyerModel.findOne(
            {
                where: {id},
            },
        )
        if (!buyer) {
            return next(ApiError.notFound(`Buyer with ID ${id} not found`))
        }
        return res.json(buyer)
    }

    async update(req, res, next) {
        const {id} = req.params
        const buyer = await BuyerModel.findOne(
            {
                where: {id},
            },
        )
        if (!buyer) {
            return next(ApiError.notFound(`Buyer with ID ${id} not found`))
        }

        let {info} = req.body;

        if (!info) {
            return next(ApiError.badRequest('info is required'));
        }

        buyer.info = info;
        await buyer.save();

        return res.json(buyer)
    }

    async delete(req, res, next) {
        const {id} = req.params

        const buyer = await BuyerModel.findOne(
            {
                where: {id},
            },
        )
        if (!buyer) {
            return next(ApiError.notFound(`Buyer with ID ${id} not found`))
        }

        await buyer.destroy();

        return res.status(204).json();
    }
}

module.exports = new BuyerController()
