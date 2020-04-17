module.exports = function (req, res, next)  {
    if (ObjectId.isValid(req.params.id)) {
        if (String(new ObjectId(req.params.id)) === req.params.id) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}
