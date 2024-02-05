const router = require('express').Router()
const Resource = require('./model')
const { checkResource } = require('./middleware')

router.get('/', async (req,res,next) => {
    const data = await Resource.get()
    try {
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

router.post('/', checkResource, async (req,res,next) => {
    const data = await Resource.create(req.body)
    try {
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the resource router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
