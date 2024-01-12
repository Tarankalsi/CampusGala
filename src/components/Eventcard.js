
import { Link } from "react-router-dom"
import './Eventcard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Eventcard(props) {


    const { event } = props
    console.log(props)
    return (
        <div>

            <div className="col">
                <div className="card card-cover  overflow-hidden text-bg-dark rounded-4 shadow-lg eventCard" >
                    <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                        <ul className="d-flex list-unstyled mt-auto">
                            <li className="me-auto">
                                <FontAwesomeIcon icon="fa-regular fa-calendar" />
                            </li>




                        </ul>
                    </div>
                </div>
                <div className="event-de"><Link className="event-link">
                    <h3 className=" mt-2 mb-4 display-6  fw-bold">{event.eventName}</h3>
                    </Link>
                    <small>{event.description}</small>
                    </div>

            </div>
        </div>
    )
}

export default Eventcard
