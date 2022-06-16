import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getTicket,closeTicket} from '../features/tickets/ticketSlice'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const SingleTicket = () => {
    const {ticket,loading,error} = useSelector(state => state.ticket)
    const dispatch = useDispatch()
    const params = useParams()

    const navigate = useNavigate()
    useEffect(() => {
        if(error){
            toast.error(error)
        }
        dispatch(getTicket(params.id))
    },[error,dispatch,params.id])

    const onTicketClosed = () => {
        dispatch(closeTicket(params.id))
        toast.success('Ticket closed')
        navigate('/view-ticket')
    }
    if(loading){
        return <div>Loading...</div>
    }

    return (  
        <div className='ticket-page'>
            <header className='ticket-header'>
                <h2>Ticket ID : {ticket._id} 
                <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>Date Submitted : {new Date(ticket.createdAt).toLocaleDateString('fr-FR')}</h3>
                <hr/>
            <div className='ticket-desc'>
                <h3>Description of Issue</h3>
                <p>{ticket.description}</p>
            </div>
            </header>
            {
                ticket.status !== 'closed' && 
                <div className='ticket-action'>
                    <button className='btn btn-block btn-danger' onClick={onTicketClosed}>Close Ticket</button>
                </div>

            }
        </div>
    )
}

export default SingleTicket