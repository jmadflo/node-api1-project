const express = require('express')
const shortid = require('shortid')

const server = express()
server.use(express.json())

// data when server first runs
let users = [
    {
        id: 1,
        name: 'Juan Madero',
        bio: 'A person who is always right about everything. Truly astonishing!'
    }
]

// posts a new user
server.post('/api/users', (req, res) => {
    let newUser = {
        sid: shortid.generate(),
        ...req.body
    }
    // if new user is missing a name or bio key-value pair then return a 400 error
    if (!newUser.name || !newUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        users.push(newUser)
        // if user does not appear in array then there was a problem entering array into database otherwise post was successful
        if (users.includes(newUser)){
            res.status(201).json(newUser)
        } else {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }
    }
})



server.listen(8000, () => console.log('The API works'))