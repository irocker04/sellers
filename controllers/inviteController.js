const ApiError = require('../errors/ApiError.js');
const {InviteModel} = require('../models/models.js')

class InviteController {
    async create(req, res, next) {
        let {info} = req.body;

        if (!info) {
            return next(ApiError.badRequest('info is required'));
        }

        const invite = await InviteModel.create({info})
        return res.status(201).json(invite)
    }

    async getAll(req, res) {
        let {page, limit} = req.query
        page = page || 1
        limit = (limit || 10) * 1
        let offset = page * limit - limit

        const invites = await InviteModel.findAndCountAll({
            limit, offset,
            order: [
                ['id', 'DESC']
            ]
        })

        return res.json({data: invites.rows, count: invites.count})
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const invite = await InviteModel.findOne(
            {
                where: {id},
            },
        )
        if (!invite) {
            return next(ApiError.notFound(`Invite with ID ${id} not found`))
        }
        return res.json(invite)
    }

    async update(req, res, next) {
        const {id} = req.params
        const invite = await InviteModel.findOne(
            {
                where: {id},
            },
        )
        if (!invite) {
            return next(ApiError.notFound(`Invite with ID ${id} not found`))
        }

        let {info} = req.body;

        if (!info) {
            return next(ApiError.badRequest('info is required'));
        }

        invite.info = info;
        await invite.save();

        return res.json(invite)
    }

    async delete(req, res, next) {
        const {id} = req.params

        const invite = await InviteModel.findOne(
            {
                where: {id},
            },
        )
        if (!invite) {
            return next(ApiError.notFound(`Invite with ID ${id} not found`))
        }

        await invite.destroy();

        return res.status(204).json();
    }
}

module.exports = new InviteController()
