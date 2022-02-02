import axios from 'axios';
const BASE_API_URL = "http://localhost:4000/api";

function getaccesstoken(callback) {
  return axios.get(BASE_API_URL+ '/forge/oauth/token')
    .then(function (response) {
      if(callback){
        callback(response.data.access_token, response.data.expires_in);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getComponent(id) {
  return axios.get(BASE_API_URL+ "/model/component", {
    params: {
      id: id
    }
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}


function updateComponent(id, data) {
  return axios.put( BASE_API_URL+ `/model/update/${id}`, {
      data: data
    },
  )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}


const Client = { getaccesstoken, getComponent, updateComponent };
export default Client;
