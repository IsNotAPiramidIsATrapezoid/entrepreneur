const express = require('express')
const asyncify = require('express-asyncify')
const db = require('./')
const config = require('./config')
const api = asyncify(express.Router())

let service, Entrepreneur

api.use(express.json())
api.use(express.urlencoded({ extended: false }))

api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Request-Headers, Access-Control-Request-Method, Origin, X-Requested-With, Content-Type, Accept, DNT, Referer, User-Agent, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

api.use('*', async (req, res, next) => {
    console.log("si configura")
    if (!service) {
        try {
            service = await db(config.db)
            res.json({
                success: true
            })
        } catch (e) {
            return next(e)
        }

        Entrepreneur = service.Entrepreneur
    }
    next()
})

api.post('/createEntrepreneur', async (req, res, next) =>{
    
    try {
        let entrepredeur = await  Entrepreneur.createEntrepreneur(req.body)
        res.status(200).send({message: 'entrepredeur created successfully'})
    } catch (error) {
        return res.status(500).send({message: 'error creating entrepredeur'})
        //return res.status(500).send({message: error})
        return next(error)
    }    
})

api.get('/getAllEntrepreneurs', async (req, res, next)=>{
    let entrepreneurs = []
    try {
        entrepreneurs = await Entrepreneur.getAllEntrepreneurs()
    } catch (error) {
        return next(error)
    }
    res.send(entrepreneurs)
})

api.get('/getEntrepreneur/:id', async (req, res, next)=>{
    const { id } = req.params
    console.log("----------------------------------------")
    console.log("id")
    console.log("----------------------------------------")
    try {
        entrepreneur = await Entrepreneur.getEntrepreneurById(id)
    } catch (error) {
        return next(error)
    }
    res.send(entrepreneur)
})


module.exports = api