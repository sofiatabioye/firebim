import axios from 'axios';

function getaccesstoken() {
  return axios
    .get('http://localhost:4000/api/forge/token')
    .then(function(response) {
      return response.data.data.token;
    })
    .catch(function(error) {
      console.log(error);
    });
}

const Client = { getaccesstoken };

export default Client;