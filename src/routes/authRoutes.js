import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

router.post('/register', (req, res) => {
  const {username, password} = req.body
  const hashedpass = bcrypt.hashSync(password, 8)
  try{
    const insertUser = db.prepare(`INSERT INTO users(username, password)
      VALUES(?, ?)`)
      //prepare sql query
    const result = insertUser.run(username, hashedpass)
      //insert the values 

      //deafutl todo
    const defaulttodo = `Hello! add your first todo`
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) 
      VALUES(?, ?)`)
    insertTodo.run(result.lastInsertRowid, defaulttodo )

    //create a token
    const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'})
    res.json({token})
  }
  catch(err){
    console.log(err.message)
    res.sendStatus(503)
  }
  console.log(hashedpass)
  res.sendStatus(201)
})

router.post('/login', (req, res) => {
  //password stored in db by brcrypt is always in encrypted form 
  //so we cant directly match the pass enetered by th euser 
  //we will encrypt the password enetered by user and then match it
  
  const {username, password} = req.body
  try{
    const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`)
    const user = getUser.get(username)
    if(!user){
      return res.status(404).send({message: 'User Not Found!'})
    }
    const validPass = bcrypt.compareSync(password , user.password)
    if(!validPass){
      return res.status(401).send({message : 'Invalid Password'})
    }
    // 
    const tokenIs = jwt.sign({id: user.id},  process.env.JWT_SECRET, {expiresIn: '24h'})
    res.json({tokenIs})
  }
  catch(err){
    console.log(err.message)
    res.sendStatus(503)
  }
  console.log(username, password)
  res.send("Login route working")
})

export default router
