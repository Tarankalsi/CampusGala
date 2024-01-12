
import Eventcard from './Eventcard'
import eventContext from '../context/Events/eventContext'
import './Upcoming.css'
import React ,{useContext , useState , useEffect} from 'react'

function Upcoming() {

    const context = useContext(eventContext)
    console.log(context)
    const {events , getEvents} = context
    console.log(events)
    const [event , setEvent] = useState({
        eventName : "",
        eventDate : "",
        description : "",
        termsAndCondition : "",
        ticketPrice : "",
        totalTickets : ""
    })
    useEffect(() => {
        getEvents()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className="container px-4 py-5" id="custom-cards">
                <h2 className="pb-2 border-bottom">Upcoming Events</h2>

                <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                    {
                        events.map((event) => {
                            return <Eventcard key={event._id} event={event} />
                        })
                    }

                    {/* <Eventcard eventid={eventid} eventName={eventName} eventDate={eventDate}/> */}
                </div>
            </div>
        </div>
    )
}

export default Upcoming
