import express from 'express'
import db from '../db.js'

const router  = express.Router()

//getall todos from logged in users
router.get('/', (req, res)=>{
    const getTodo = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
    const todos = getTodo.all(req.userId)
    res.json(todos)
})

// create a new todo 
router.post('/', (req, res)=>{

})

// update a todo 
router.put('/:id', (req, res)=>{

})

//delete a todo 
router.delete('/:id', (req, res)=>{

})

export default router;