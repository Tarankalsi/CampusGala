const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Events = require('../models/Events');
const Ticket = require('../models/Ticket');

const router = express.Router()


//Route 1 : Fetch All Events :POST "/api/events/fetchallevents"
router.get('/fetchallevents', async (req, res) => {
     try {
          const events = await Events.find()
          res.json(events)
     } catch (error) {
          console.error(error.message)
          res.status(500).send("Internal Server Error Occured")
     }
})

//Route 2 - Get details of a specific event. GET : /api/events/:eventid
router.get('/:eventid', async (req, res) => {
     try {
          const event = await Events.findById(req.params.eventid)
          if (!event) {
               return res.status(404).send("Event Not Found")
          }
          res.json(event)
     } catch (error) {
          console.error(error.message)
          res.status(500).send("Internal Server Error Occured")
     }
})

//Route 3 - Purchase Ticket of specific Event. POST: /api/events/:eventid/:userid/buyticket
router.post('/:eventid/:userid/buyticket', fetchuser, async (req, res) => {
     const { eventid, userid } = req.params
     const { numberOfTickets } = req.body

     try {
          const event = await Events.findById(eventid)

          if (!event) {
               return res.status(404).send("Event Not Found")
          }

          const tickets = []
          for (let i = 0; i < numberOfTickets; i++) {
               const ticket = new Ticket({
                    user: userid,
                    event: eventid
               })
               tickets.push(ticket)
          }

          const savedTickets = await Ticket.insertMany(tickets)

          res.json(savedTickets)
     } catch (error) {
          console.error(error.message)
          res.status(500).send("Internal Server Error Occured")
     }
})

//Route 4 - Get Purchased Tickets of specific Event. POST: /api/events/:eventid/gettickets
router.get('/:userid/gettickets', fetchuser, async (req, res) => {
     const { userid } = req.params

     try {
          const tickets = await Ticket.find({user:userid})
          if (!tickets) {
               return res.status(404).send("Ticket Not Found")
          }
          res.json(tickets)

     } catch (error) {
          console.error(error.message)
          res.status(500).send("Internal Server Error Occured")
     }
})
module.exports = router