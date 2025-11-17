import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

router.post('/register', (req, res) => {
  const {username, password} = req.body
  const hashedpass = bcrypt.hashSync(password, 8)
  console.log(hashedpass)
  res.sendStatus(201)
})

router.post('/login', (req, res) => {
  //password stored in db by brcrypt is always in encrypted form 
  //so we cant directly match the pass enetered by th euser 
  //we will encrypt the password enetered by user and then match it
  
  const {username, password} = req.body
  console.log(username, password)
  res.send("Login route working")
})

export default router
