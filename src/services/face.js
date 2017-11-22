import React from 'react';
//import AlertBox from '../../index';
const app_id = 'e6d5551d';
const app_key = '7804284cf45dbec1d32ba5459e4472b2';
const header = {
    //'Accept': 'application/json',
    'Content-Type': 'application/json',
    'app_id' : app_id,
    'app_key' : app_key
};
const gallery_name = 'Travash';
const subject_id = "subject_id";

export const EnrollmentAPI = function(options) {
    debugger;
    var subject_id = options.params.subject_id;
    var image = options.params.image;
    var url = "https://api.kairos.com/enroll";
    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
          "image": image,
          "subject_id": subject_id,
          "gallery_name": gallery_name
        })
    }).then((responseText) => {
        if (responseText.status == 200) {
            console.log('success');
            responseText.json().then(function(json) {
                return options.success(json);
            });
        } else {
           console.log('failed');
            responseText.json().then(function(json) {
                return options.error(json);
            });
        }
    })
    .catch((error) => {
        console.warn(error);
    });
}

export const FaceRecognitionAPI = function(options) {
    debugger;

    var data  = new FormData();
    data.append(  'files', {uri: options.params.image});
    console.log('image',options.params.image);

    var url = "http://139.59.89.111:3000/kairos/recognizeImage";
    fetch(url, data,{
        method: 'POST',
      headers: {
        'Content-Type':  'multipart/form-data'
      },
      body:data
        }).then((responseText) => {
          debugger;
        if (responseText.status == 200) {
          debugger;
            console.log('success');
            responseText.json().then(function(json) {
                return options.success(json);
            });
        } else {
          debugger;
           console.log('failed');
            responseText.json().then(function(json) {
              debugger;
                return options.error(json);
            });
        }
    })
    .catch((error) => {
        console.warn(error);
        AlertBox(options.errorMessage);
    });
}

export const LoadGalleryViewAPI = function(options) {
    debugger;
    fetch("https://api.kairos.com/gallery/view", {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
            "gallery_name":"Travash"
        })
    }).then((responseText) => {
        if (responseText.status == 200) {
            console.log('success');
            responseText.json().then(function(json) {
                return options.success(json);
            });
        } else {
           console.log('failed');
            responseText.json().then(function(json) {
                return options.error(json);
            });
        }
    })
    .catch((error) => {
        console.warn(error);
        AlertBox(options.errorMessage);
    });
}

export const LoadGalleryViewSubjectAPI = function(options) {
    debugger;
    fetch("https://api.kairos.com/gallery/view_subject", {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
            "gallery_name":gallery_name,
            'subject_id':subject_id
        })
    }).then((responseText) => {
      debugger;
        if (responseText.status == 200) {
            console.log('success');
            responseText.json().then(function(json) {
              debugger;
                return options.success(json);
            });
        } else {
          debugger;
           console.log('failed');
            responseText.json().then(function(json) {
                return options.error(json);
            });
        }
    })
    .catch((error) => {
      debugger;
        console.warn(error);
       Alert.alert(options.errorMessage);
    });
}



export const LoadMediaAPI = function(options) {
    debugger;
    var id = options.params.id;
    var url = "https://api.kairos.com/v2/media?source=http://timesofap.com/newsimage1/cinema/2016/07/18/Jr-NTR.jpg&landmarks=1&timeout=60";
    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
            'subject_id':subject_id
        })
    }).then((responseText) => {
        if (responseText.status == 200) {
            console.log('success');
            responseText.json().then(function(json) {
                return options.success(json);
            });
        } else {
           console.log('failed');
            responseText.json().then(function(json) {
                return options.error(json);
            });
        }
    })
    .catch((error) => {
        console.warn(error);
    });
}
