import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux/es/exports'
import {AllTicket} from '../features/tickets/ticketSlice'
import TicketItem from '../components/TicketItem'
const Tickets = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {tickets,loading} = useSelector(state => state.ticket)



  useEffect(() => {
    dispatch(AllTicket())
    
},[dispatch])

if(loading){
    return <div>Loading...</div>
}
  return (
      <>
        <h1>Tickets List</h1> 
        <div className='tickets'>
          <div className='ticket-headings'>
              <div>Date</div>
              <div>Product</div>
              <div>Description</div>
              <div>Status</div>
              <div></div>
          </div>
        {tickets.map(ticket => (
        <TicketItem key={ticket._id} ticket={ticket} />
        ))}
        </div>
      </>
        
         
  

 
  )
}

export default Tickets