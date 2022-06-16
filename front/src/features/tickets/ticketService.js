import axios from 'axios'



const API_URL = 'api/tickets'


const createTicket = async (ticketData,token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`http://localhost:8081/${API_URL}`,ticketData,config)
    
    return response.data
}

const getAllTickets = async (token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.get(`http://localhost:8081/${API_URL}`,config)

    return response.data
}
const getSingleTickets = async (id,token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.get(`http://localhost:8081/${API_URL}/${id}`,config)

    return response.data
}

const closeTicket = async (id,token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.put(`http://localhost:8081/${API_URL}/${id}`,{status : 'closed'},config)

    return response.data
}
const ticketService ={
    createTicket,
    getAllTickets,
    getSingleTickets,
    closeTicket
}

export default ticketService;