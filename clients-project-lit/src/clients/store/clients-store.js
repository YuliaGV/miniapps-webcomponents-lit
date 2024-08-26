import { loadClientsByPage } from "../client-cases/load-clients-by-page";

const state = {
    currentPage: 0,
    numOfPages: 0,
    clients: []
 
};


/*
    @returns {Promise<void>}
*/

const loadNextPage = async () => {
    const {clients, pages }= await loadClientsByPage(state.currentPage + 1)
    if(clients.length === 0) return;
    if(state.currentPage >= pages) return;

    state.currentPage++;
    state.numOfPages = pages;
    state.clients = clients;

    
};

const loadPreviousPage = async () => {
    if(state.currentPage <= 1) return;

    const {clients, pages }= await loadClientsByPage(state.currentPage - 1)
    state.currentPage--;
    state.numOfPages = pages;
    state.clients = clients;
};


const onClientChange = () => {
    throw new Error('Not implemented');
}


const reloadPage = async () => {
    throw new Error('Not implemented');

}

export default {
    loadNextPage,
    loadPreviousPage,
    onClientChange,
    reloadPage,

    getClients: () => [...state.clients],
    getCurrentPage: () => state.currentPage,
    getNumOfPages: () => state.numOfPages
};