import axios from 'axios';

function getaccesstoken() {
  return axios
    .get('https://firebimapi.herokuapp.com/api/forge/token')
    .then(function(response) {
      return response.data.data.token;
    })
    .catch(function(error) {
      console.log(error);
    });
}

const Client = { getaccesstoken };

export default Client;