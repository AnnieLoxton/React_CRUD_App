const express = require('express');
const router = express.Router();
const fs = require('fs');

const content = JSON.parse(fs.readFileSync('./db.json'));


function saveData() {
    fs.writeFileSync('./db.json', JSON.stringify(content));
}

const generateID = () => {
    return Math.floor(Math.random() * Date.now());
}

//GET
router.get('/', (req, res) =>{
    res.json(content);
})

//GET a single project

//NB - Can't figure out how to get one single item from the json file.

//POST
router.post('/create', (req, res) => {
    const id = generateID();
    const newProject = Object.assign({id}, req.body);

    content.push(newProject);
    saveData();


    return res.json({
        message: 'new project added',
        content
    })
})

//PUT
router.put('/update/:id', (req, res) => {
    const id = Number(req.params.id);
    const newProject = Object.assign({id}, req.body);

    for (let i = 0; i < content.length; i++){
        if (content[i].id === id) {
            content[i] = newProject;
        }
    }
    saveData();

    return res.json({
        message: 'project updated',
        content
    })
})

//DELETE
router.delete('/delete/:id', (req, res) =>{
    const id = Number(req.params.id);

    for (let i = 0; i < content.length; i++){
        if (content[i].id === id) {
            content.splice(i, 1);
        }
    }
    saveData();

    return res.json({
        message: 'project deleted',
        content
    })
})

module.exports = router;