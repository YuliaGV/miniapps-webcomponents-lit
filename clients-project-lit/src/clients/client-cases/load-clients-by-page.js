import { Client } from "../models/client"

/*
    @param {number} page
    @returns {Promise<Client[]>}
*/

export const loadClientsByPage =  async(page = 1) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`
    const response = await fetch(url)
    const {data, pages} = await response.json();

    const clients = data.map( client => new Client(client))
    return {clients, pages}
}


