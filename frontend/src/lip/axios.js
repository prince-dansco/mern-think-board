// import axios from "axios";


// const api = axios.create({
    //     baseURL: BASE_URL,
    // })
    // export default api;
    
    import axios from "axios";
    
    // const BASE_URL = import.meta.env.MODE === 'production' ? 'https://backend-note-think-board.onrender.com/api' : 'http://localhost:5001/api'
// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

    // const BASE_URL = import.meta.env.MODE === 'production'
    // ? 'https://backend-note-think-board-1.onrender.com/api'
    // : 'http://localhost:5001/api';


    const BASE_URL = import.meta.env.VITE_NODE_ENV === 'production' 
    ? 'https://backend-note-think-board-1.onrender.com/api' 
    : 'http://localhost:5001/api';
    
const api = axios.create({
    baseURL: BASE_URL,
})

export default api;