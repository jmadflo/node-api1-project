const express = require('express')
const shortid = require('shortid')

const server = express()
server.use(express.json())

// data when server first runs
let users = [
    {
        id: 'abc',
        name: 'Juan Madero',
        bio: 'A person who is always right about everything. Truly astonishing!'
    },
    {
        id: 'def',
        name: 'Darth Vader',
        bio: 'Dark Lord of the Sith'
    }
]

// posts a new user
server.post('/api/users', (req, res) => {
    let newUser = {
        id: shortid.generate(),
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

// get the current list of users
server.get('/api/users', (req, res) => {
    // if users cannot be retrieved then users will not exist, but an empty users list is still a sucessful get. It's just that the list is empty.
    if (!users && users !== []) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    } else {
        res.status(201).json(users)
    }
})

server.get('/api/users/:id', (req, res) => {
    // user we want is the id that is equal to id
    const userToGet = users.find(user => {
        if(user.id == req.params.id){
            return user
        }
    })
    // for request to be successful, user must exist and be confirmed to be in the users array (seems reduntant, but that is the instruction)
    if (userToGet) {
        if (users.includes(userToGet)){
            res.status(201).json(userToGet)
        } else {
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        }
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.delete('/api/users/:id', (req, res) => {
    // find the user to be deleted with id
    const userToDelete = users.find(user => {
        if(user.id === req.params.id){
            return user
        }
    })
    // if userTo Delete doesn't exist then the user to delete wasn't found
    if (userToDelete) {
        // remove the userToDelete for the users array
        users = users.filter(user => {
            if (user.id !== req.params.id) {
                return user
            }
        })
        // if userToDelete is still in array, then there was an error
        if (users.includes(userToDelete)){
            res.status(500).json({ errorMessage: "The user could not be removed" })
        } else {
            res.status(201).json({ message: 'The deletion was a success!!!' })
        }
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.put('/api/users/:id',(req, res) => {
    // find the user to be edited using the id from the url
    const userToReplace = users.find(user => {
        if(user.id === req.params.id){
            return user
        }
    })
    // respond with error if request body is missing a name or bio
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        // if user with request url id doesn't exist, respond with an error
        if (userToReplace) {
            // replace the user that the client wants to edit
            const updatedUser = { id: req.params.id, name: req.body.name, bio: req.body.bio }
            users = users.map(user => {
                if (user.id === req.params.id) {
                    return updatedUser
                }
                return user
            })
            // if request body is in the users array then the editing was successful otherwise the replacement is not in the array and an error should be returned
            if (users.includes(updatedUser)) {
                res.status(200).json(req.body)
            } else {
                res.status(500).json({ errorMessage: "The user information could not be modified." })
            }
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    }
})

server.listen(8000, () => console.log('The API works'))