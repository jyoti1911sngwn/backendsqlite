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
const {task} =req.body;
const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
insertTodo.run(req.userId, task)
res.json({id : result.lastInsertRowid, task , completed: 0})
})

// update a todo 
router.put('/:id', (req, res)=>{
    const {completed} = req.body
    const {id} = req.params
    const updateTodo = db.prepare(`UPDATE todos SET completed =? WHERE id= ?`)
    updateTodo.run(completed, id)
    res.json({message : 'Todo Completed'})

})

//delete a todo 
router.delete('/:id', (req, res)=>{

})

export default router;