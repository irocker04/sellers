const ApiError = require('../errors/ApiError.js');
const {OrderModel} = require('../models/models.js')

class OrderController {
    async create(req, res, next) {
        let {info} = req.body;

        if (!info) {
            return next(ApiError.badRequest('info is required'));
        }

        const order = await OrderModel.create({info})
        return res.status(201).json(order)
    }

    async getAll(req, res) {
        let {page, limit} = req.query
        page = page || 1
        limit = (limit || 10) * 1
        let offset = page * limit - limit

        const orders = await OrderModel.findAndCountAll({
            limit, offset,
            order: [
                ['id', 'DESC']
            ]
        })

        return res.json({data: orders.rows, count: orders.count})
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const order = await OrderModel.findOne(
            {
                where: {id},
            },
        )
        if (!order) {
            return next(ApiError.notFound(`Order with ID ${id} not found`))
        }
        return res.json(order)
    }

    async update(req, res, next) {
        const {id} = req.params
        const order = await OrderModel.findOne(
            {
                where: {id},
            },
        )
        if (!order) {
            return next(ApiError.notFound(`Order with ID ${id} not found`))
        }

        let {info} = req.body;

        if (!info) {
            return next(ApiError.badRequest('info is required'));
        }

        order.info = info;
        await order.save();

        return res.json(order)
    }

    async delete(req, res, next) {
        const {id} = req.params

        const order = await OrderModel.findOne(
            {
                where: {id},
            },
        )
        if (!order) {
            return next(ApiError.notFound(`Order with ID ${id} not found`))
        }

        await order.destroy();

        return res.status(204).json();
    }
}

module.exports = new OrderController()
