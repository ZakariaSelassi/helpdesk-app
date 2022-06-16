import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import {toast} from 'react-toastify'
const NewTicket = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const {error, loading} = useSelector(state => state.ticket)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [product,setProduct] = useState('')
  const [description, setDescription] = useState('')


    useEffect(() => {
      if(error){
        toast.error(error)
      }

     /*  if(!error){
        dispatch(reset())
        navigate('/tickets')
      } */
    },[error])

    const onSubmit =  (e) => {
      e.preventDefault()
      console.log(product,description)

      dispatch(createTicket({product,description}))
      // if dispatch is successful, send message toast

      if(!error){
        toast.success('Ticket created successfully')
        navigate('/')
      }
    
    }

    if(loading){
      return <h1>Loading...</h1>
    }
  return (

    <> 
    
    <section>
      <h1>Create New Ticket</h1>
      <p>Please fill out the form below</p>
    </section>
    <section className='form'>
      <div className='form-group'>
        <label htmlFor='name'>Customer Name</label>
        <input type="text" className='form-control' value={name} disabled />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Customer Email</label>
        <input type="email" className='form-control' value={email} disabled />
      </div>



      <form onSubmit={onSubmit}>

        <div className='form-group'>
          <label htmlFor='product'>Product</label>
          <select type="text"
           name='product' 
           id="product" 
           className='form-control' 
           value={product} onChange={(e) => setProduct(e.target.value)} >
            <option value="">Select Product</option>
            <option value="iPhone">iPhone</option>
            <option value="Playstation 5 ">Playstation 5</option>
            <option value="product3">Product 3</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea className='form-control' name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <button type="submit" className='btn btn-primary'>Submit</button>
      </form>
    </section>

  </>
   
  )
}

export default NewTicket