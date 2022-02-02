let sampleURN;

// wait until the document is ready...
let cData;
$(document).ready(function () {
  jQuery.ajax({
    url: '/api/forge/mysqlsetup',
    success: function (model) {
      if (model) {
        cData = model.data;

        jQuery.notify('Please wait while model is being downloaded....', 'info');
        getMetaData(model.urn).then(response=>{
          let dataset = response.data.data.collection;

          showModel(model.urn, dataset, model.data);
        });

      }
    }
  });
});

function getMetaData(urn){
  return axios.post('/api/forge/metadata', {
    urn: urn
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });

}

function getForgeToken(callback) {
  jQuery.ajax({
    url: '/api/forge/oauth/token',
    success: function (oauth) {
      if (callback)
        callback(oauth.access_token, oauth.expires_in);
    }
  });
}

function getComponent(id) {
  return axios.get("/api/model/component", {
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
  return axios.put(`/api/model/update/${id}`, {
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

function downloadAsset() {
  return axios.get("/api/model/download", )
    .then(function (response) {
      console.log(response.data.buffer.data, )
      const reader = new FileReader;

      // Add a listener to handle successful reading of the blob
      reader.addEventListener('load', () => {
        reader.readAsDataURL(response.data.buffer);
        console.log(reader, '...reader')
      });

      const link = document.createElement("a");
      link.target = "_blank";
      link.download = response.data.filename;
      link.href = URL.createObjectURL(response.data.buffer);
      link.click();
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
