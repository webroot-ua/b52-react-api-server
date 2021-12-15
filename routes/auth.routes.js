const {Router} = require('express')
const bcrypt = require('bcryptjs')
const  jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('id', 'Empty ID').notEmpty(),
    check('password', 'Password has 4 digits').isLength({ min: 4 })
  ],
  async (req, res) => {
  try {
    console.log('Register Body: ', req.body)
    console.log('User: ', User)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect data during registration'
      })
    }

    const {id, password} = req.body

    const candidate = await User.findOne({ id })
    if (candidate) {
      return res.status(400).json({ message: 'Such ID already exists '})
    }

    // hashing the password 
    const hashedPassword = await bcrypt.hash(password, 13)
    const user = new User({ id, password: hashedPassword })

    await user.save()

    res.status(201).json({message: 'User created' })
  } catch (e) {
    res.status(500).json({ message: 'Something going on... try to create findOne() and save() in the DB Model' })
  }

})

// /api/auth/login
router.post(
  '/login',
  [
    check('id', 'Empty ID').notEmpty(),
    check('password', 'Input password').exists()
  ],
  async (req, res) => {
  try {
    console.log('Login Body: ', req.body)
    
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid login data'
      })
    }

    const { id, password } = req.body

    const user = await User.findOne({ id })

    if (!user) {
      return res.status(400).json({ message: 'User not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' })
    }

    const token = jwt.sign(
      { userId: iser.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )
    
    res.json({ token, userId: user.id })
  } catch (e) {
    res.status(500).json({ message: 'Something going on... try more' })
  }
})

module.exports = router