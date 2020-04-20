module.exports = function (req, res, next)  {
    if (ObjectId.isValid(req.params.id)) {
        if (String(new ObjectId(req.params.id)) === req.params.id) {
            next()
        } else {
            return res.status(400).send('invalid id')
        }
    } else {
        return res.status(400).send('invalid id')
    }
}
