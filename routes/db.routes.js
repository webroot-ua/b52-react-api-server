const {Router} = require('express')
const config = require('config')
const Db = require('../models/Db')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create', async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')
    const { from } = req.body

    res.status(201).json({ from })
  } catch (e) {
    res.status(500).json({ message: 'Something going on... try to create some functions in the DB Model' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const logs = await Db.find({ user: req.user.userId }) // ???
    res.json(logs)
  } catch (e) {
    res.status(500).json({ message: 'Something going on... try to create some functions in the DB Model' })
  }
})

router.get('/:id', async (req, res) => {
  const user = await Db.findByiD(req.param.id) // ???
    res.json(user)
})

module.exports = router