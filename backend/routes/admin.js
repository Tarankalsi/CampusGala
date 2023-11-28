const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Events = require('../models/Events')

//Route 1 : Add Event in Database :GET "/api/admin/addevent"
router.post('/newevent' , [
    body('eventName' , "Enter Valid EventName").notEmpty(),
    body('eventDate' , "Enter Valid Date").notEmpty(),
    body('description' , "Only 250 Characters allowed").isLength({max:300}),
    body('ticketPrice' , "Price should not be Empty").notEmpty()
], async (req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { eventName ,eventDate ,description ,termsAndCondition,ticketPrice,totalTickets} = req.body
        const event = new Events({
            eventName ,
            eventDate ,
            description ,
            termsAndCondition,
            ticketPrice,
            totalTickets
        })

        const savedEvent = await event.save()
        res.json(savedEvent)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }

})

//Route 2 : Update Event in Database :GET "/api/admin/updateevent"
router.put('/updateevent/:eventid', async (req,res) =>{
    try {
        // const {eventName ,eventDate ,description ,termsAndCondition,ticketPrice,totalTickets} = req.body
        const eventUpdates = { ...req.body };

        let event = await Events.findById(req.params.eventid)
        if(!event){
            return res.status(404).send("Event Not Found")
        }

        event = await Events.findByIdAndUpdate(req.params.eventid , {$set: eventUpdates} , {new : true} )

        res.json({event})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
})

//Route 3 : Update Event in Database :GET "/api/admin/delete-event"
router.delete('/delete-event/:eventid', async(req,res)=> {
    try {
        
        //Find the event and delete it
        let event = await Events.findById(req.params.eventid)
        if(!event){
            return res.status(404).send("Event Not Found")
        }
        event =  await Events.findByIdAndDelete(req.params.eventid)
        res.json({ "Success": "Event has been deleted", event: event })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
    
} )
module.exports = router