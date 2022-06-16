import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate();

  const goToNewTicket = () => {
    navigate('/new-ticket')

  }

  const goToViewTicket = () => {
    navigate('/view-ticket')
  }
  return (
    <>
      <section className="homeMainContainer">
        <h1>What do you need help with ?</h1>
        <p> Please choose from an option below </p>
        <button className='homeCreateTicket' onClick={() => goToNewTicket()}>Create New Ticket</button>
        <button className='homeViewTicket' onClick={() => goToViewTicket()}>View My Tickets</button>
      </section>
    </>
  )
}

export default Home