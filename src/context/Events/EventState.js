import { useState } from "react"
import eventContext from "./eventContext"

const EventState = (props) => {
    const host = 'http://localhost:5000'
    const eventsInitial = []


    const [events, setEvents] = useState(eventsInitial)

    //Add a Event
    const newEvent = async (
        eventName,
        eventDate,
        description,
        termsAndCondition,
        ticketPrice,
        totalTickets
    ) => {
        //API Call
        try {
            const response = await fetch(`${host}/api/admin/newevent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    eventName,
                    eventDate,
                    description,
                    termsAndCondition,
                    ticketPrice,
                    totalTickets
                })
            });

            const event = await response.json()

            if (!response.ok) {
                throw new Error("Failed to Create New Event");
            }

            setEvents([...events , event])

        } catch (error) {
            console.error("Error while creating new Event:", error);
        }
    }

    //Fetch All events from API
    const getEvents = async () => {
        try {
            const response = await fetch(`${host}/api/events/fetchallevents`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await response.json();
            console.log(json)
            setEvents(json)
        } catch (error) {
            console.error("Error while fetching all events new Event:", error);
        }
    }

    //Delete Event
    const deleteEvent = async (eventid) => {
        try {
            //API Call
            const response = await fetch(`${host}http://localhost:5000/api/admin/delete-event/${eventid}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await response.json
            console.log("Deleting Event" + eventid)
            const newEvents = events.filter((note) => { return events._id !== eventid })
            setEvents(newEvents)
        } catch (error) {
            console.error("Error while Deleting the Event:", error);
        }
        
    }

    return (
        <eventContext.Provider value={{
            events, newEvent, deleteEvent, getEvents
        }}>
            {props.children}
        </eventContext.Provider>
    )
}


export default EventState;