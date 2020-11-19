import axios from 'axios';

export default function apiCall() {
    axios.get('/todos')
    .then((resp) => {console.log(resp.data);return resp.data})
   }
  