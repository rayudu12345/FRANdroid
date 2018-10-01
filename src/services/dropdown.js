import React from 'react';
import AlertBox from '../Core/AlertBox'
import {Alert} from 'react-native';
import { SERVICE_URL, ORIGIN } from '../components/Constants'

// const SERVICE_URL = 'http://183.82.109.71:9090/fr/public/';
//  const ORIGIN = 'http://183.82.109.71';


 export const IdBasedDistrictAPI = function(options) {
     debugger;
     var params ={
       state_id:options.params.state_id,

     }
     fetch(SERVICE_URL+'get-district-by-userid', {
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },
         body: JSON.stringify(params)
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
           Alert.alert('Reason','Network request failed');
     });
 }

 export const OraganizationAPI = function(options) {
     debugger;
     var  case_id=options.params.case_id;

     console.log(case_id,'reducer param');

     fetch(SERVICE_URL+'case-organizations?case_id='+case_id, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },
     }).then((responseText) => {
         if (responseText.status == 200) {
             responseText.json().then(function(json) {
                 return options.success(json);
             });
         } else {
             responseText.json().then(function(json) {
                 return options.error(json);
             });
         }
     }).catch((error) => {
         console.warn(error);
         Alert.alert('Reason','Network request failed');
     });
 }

 export const DetectMatchedAPI = function(options) {
     debugger;
      console.log(options.params,'options.params');
       var source_image=options.params.source_image;
       var id =options.params.id;

       console.log(source_image,'fff');
     fetch(SERVICE_URL+`case-matches-by-source?source=`+source_image+'&id='+id, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },

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
           Alert.alert('Reason','Network request failed');
     });
 }

 export const GetCommentAPI = function(options) {
     debugger;

       var matched_id=options.params.matched_id;
       var id= options.params.id;
       var case_id=options.params.case_id
       var url = SERVICE_URL+`case-comments-by-id?matched_id=`+matched_id+'&id='+id+'&case_id='+case_id;
       console.log(url,'urk');

     fetch(url, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },

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
           Alert.alert('Reason','Network request failed');
     });
 }

 export const DetectCommentAPI = function(options) {
     debugger;
     var params ={
       matched_id:options.params.matched_id,
       name:options.params.name,
       user_id:options.params.user_id,
       comment:options.params.comment,
       type:options.params.type,
       case_id:options.params.case_id

     }
     console.log(params,'comment params');
     fetch(SERVICE_URL+'case-results-comment', {
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },
         body: JSON.stringify(params)
     }).then((responseText) => {
         if (responseText.status == 200) {
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
           Alert.alert('Reason','Network request failed');
     });
 }


 export const FaceBookDetectCommentAPI = function(options) {
     debugger;
     var params ={
       matched_id:options.params.matched_id,
       name:options.params.name,
       comment:options.params.comment

     }
     console.log(params,'comment params');
     fetch(SERVICE_URL+'matched-facebook-results-comment-api', {
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },
         body: JSON.stringify(params)
     }).then((responseText) => {
         if (responseText.status == 200) {
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
           Alert.alert('Reason','Network request failed');
     });
 }


 export const GetAllLanguagesAPI = function(options) {
     debugger;

     //console.log(params,'comment params');
     fetch(SERVICE_URL+'get-all-languages', {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },

     }).then((responseText) => {
         if (responseText.status == 200) {
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
           Alert.alert('Reason','Network request failed');
     });
 }


 export const GetAllStatesAPI = function(options) {
     debugger;

     console.log(options.params.user_id,'options.params.user_id');
     var user_id = options.params.user_id;
     fetch(SERVICE_URL+'get-user-states?user_id='+user_id, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },

     }).then((responseText) => {
         if (responseText.status == 200) {
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
           Alert.alert('Reason','Network request failed');
     });
 }

 export const GetCCIAPI = function(options) {
     debugger;

     console.log(options.params.district_id,'options.params.district_id');
     var district_id = options.params.district_id;
     fetch(SERVICE_URL+'get-ccis-home-by-district?district_id='+district_id, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },

     }).then((responseText) => {
         if (responseText.status == 200) {
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
           Alert.alert('Reason','Network request failed');
     });
 }

 export const ResucueDistrictAPI = function(options) {
     debugger;


     fetch(SERVICE_URL+'get-all-rescue-home-districts', {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },

     }).then((responseText) => {
         if (responseText.status == 200) {
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
           Alert.alert('Reason','Network request failed');
     });
 }

 export const  GetRecursiveHomeAPI = function(options) {
     debugger;

     console.log(options.params.district_id,'options.params.user_id');
     var district_id = options.params.district_id;
     fetch(SERVICE_URL+'get-rescue-home-by-district?district_id='+district_id, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },

     }).then((responseText) => {
         if (responseText.status == 200) {
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
           Alert.alert('Reason','Network request failed');
     });
 }

 export const GetStatesAPI = function(options) {
     debugger;


     fetch(SERVICE_URL+'get-all-states', {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },

     }).then((responseText) => {
         if (responseText.status == 200) {
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
           Alert.alert('Reason','Network request failed');
     });
 }


 export const GetEnrollStateAPI = function(options) {
     debugger;
     var nation_id= options.params.nation_id;

     fetch(SERVICE_URL+'get-states-by-nation?nation_id='+nation_id, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },

     }).then((responseText) => {
         if (responseText.status == 200) {
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
           Alert.alert('Reason','Network request failed');
     });
 }

 export const GetNationalityAPI = function(options) {
     debugger;


     fetch(SERVICE_URL+'get-all-nations', {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },

     }).then((responseText) => {
         if (responseText.status == 200) {
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
           Alert.alert('Reason','Network request failed');
     });
 }

 export const ImageDetailsAPI = function(options) {
     debugger;
     //var params ={
       var matched_id=options.params.matched_id

     //}

     fetch(SERVICE_URL+'preson-search-histroy-by-id-api?matched_id='+matched_id, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         }
     }).then((responseText) => {
         if (responseText.status == 200) {
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
           Alert.alert('Reason','Network request failed');
     });
 }


 export const  DistrictIdBasedSubDivisionAPI = function(options) {
     debugger;

     fetch(SERVICE_URL+'sub-division-by-district-id?district_id='+options.params.district_id, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },

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
           Alert.alert('Reason','Network request failed');
     });
 }

 export const  CircleIdBasedPoliceAPI = function(options) {
     debugger;

     fetch(SERVICE_URL+'/police-stations-by-circle-inpector?circle_id='+options.params.circle_id, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },

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
           Alert.alert('Reason','Network request failed');
     });
 }


 export const  SubDivisionIdBasedCircleAPI = function(options) {
     debugger;

     fetch(SERVICE_URL+'circle-inpector-by-sub-division?sub_division_id='+options.params.sub_division_id, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },

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
           Alert.alert('Reason','Network request failed');
     });
 }


 export const DistrictIdbasedPoliceAPI = function(options) {
     debugger;
     var params ={
       d_id:options.params.d_id
     }
     fetch(SERVICE_URL+'get-police-station-districtid', {
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },
         body: JSON.stringify(params)
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
           Alert.alert('Reason','Network request failed');
     });
 }

 export const EditPersonAPI = function(options) {
     debugger;
       var person_id=options.params.person_id

     fetch(SERVICE_URL+'get-person-details-by-id?person_id='+person_id, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },
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
           Alert.alert('Reason','Network request failed');
     });
 }


 export const UpdateEnrolAPI = function(options) {

   console.log(options.params,'options.params ree');
  // var photo=options.params.photo;
     var name=options.params.name;
     var alias_name=options.params.alias_name;
     var aadhar_num=options.params.aadhar_num;
     var dob=options.params.dob;
     var age=options.params.age;
     var height=options.params.height;
     var color=options.params.color;
     var guardian_type=options.params.guardian_type;
     var guardian_name=options.params.guardian_name;
     var gender=options.params.gender;
     var identification_marks=options.params.identification_marks;
     var address= options.params.address;
     var person_case_type=JSON.stringify(options.params.person_case_type);
     var person_case_category=JSON.stringify(options.params.person_case_category);
     var crime_details=JSON.stringify(options.params.crime_details);
     var user_id=options.params.user_id;
     var latitude=options.params.latitude;
     var longitude=options.params.longitude;
     var person_id = options.params.person_id;

     //console.log(person_case_type,'person_case_type');

     var formdata  = new FormData();
     console.log(options.params.identification_proofs.length,'options.params.identification_proofs.length');
     if(options.params.identification_proofs.length>0){
     for(let i=0; i<options.params.identification_proofs.length;i++){
       formdata.append('identification_proofs[]', {
         uri: options.params.identification_proofs[i].uri,
       type: options.params.identification_proofs[i].type,
       name: options.params.identification_proofs[i].name
     });      }
   }
   if(options.params.photo.length>0){
   for(let i=0; i<options.params.photo.length;i++){
     formdata.append('photo[]', {
       uri: options.params.photo[i].uri,
     type: options.params.photo[i].type,
     name: options.params.photo[i].name
   });      }
 }
     debugger;
     // var params ={
     //   photo:options.params.photo,
     //   name:options.params.name,
     //   alias_name:options.params.alias_name,
     //   aadhar_num:options.params.aadhar_num,
     //   dob:options.params.dob,
     //   age:options.params.age,
     //   height:options.params.height,
     //   color:options.params.color,
     //   guardian_type:options.params.guardian_type,
     //   guardian_name:options.params.guardian_name,
     //   gender:options.params.gender,
     //   identification_marks:options.params.identification_marks,
     //   address:options.params.address,
     //   person_case_type:options.params.person_case_type,
     //   person_case_category:options.params.person_case_category,
     //   crime_details:options.params.crime_details,
     //   user_id:options.params.user_id,
     //   latitude:options.params.latitude,
     //   longitude:options.params.longitude,
     //   person_id:options.params.person_id,
     //   identification_proofs:options.params.identification_proofs
     // }
     var data = '?person_id='+person_id+'&name='+name+'&alias_name='+alias_name+'&aadhar_num='+aadhar_num+'&dob='+dob+'&age='+age+'&height='+height+'&color='+color+'&guardian_type='+guardian_type+'&guardian_name='+guardian_name+'&gender='+gender+'&identification_marks='+identification_marks+'&address='+address+'&person_case_type='+person_case_type+'&person_case_category='+person_case_category+'&crime_details='+crime_details+'&user_id='+user_id+'&latitude='+latitude+'&longitude='+longitude;
     fetch(SERVICE_URL+'update-person-details-api'+data, {
         method: 'POST',
         headers: {
             'Content-Type':(options.params.identification_proofs.length>0 || options.params.photo.length>0)?'multipart/form-data':'application/json',
             'Origin':ORIGIN
         },
         body: (options.params.identification_proofs.length>0 || options.params.photo.length>0)?formdata:null
     }).then((responseText) => {
         if (responseText.status == 200) {
             responseText.json().then(function(json) {
                 return options.success(json);
             });
         } else {
             responseText.json().then(function(json) {
                 return options.error(json);
             });
         }
     }).catch((error) => {
         console.warn(error);
           Alert.alert('Reason','Network request failed');
     });
 }


 export const GetAllDistrictAPI = function(options) {
     debugger;
     var params ={
       state_id:options.params.state_id,

     }
     var url = SERVICE_URL+'get-district-by-userid';

     fetch(url, {
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         },
         body: JSON.stringify(params)
     }).then((responseText) => {
         if (responseText.status == 200) {
             responseText.json().then(function(json) {
                 return options.success(json);
             });
         } else {
             responseText.json().then(function(json) {
                 return options.error(json);
             });
         }
     })
     .catch((error) => {
         AlertBox(options.errorMessage);
     });
 }

 export const ImageDeleteAPI = function(options) {
     debugger;

     var url = SERVICE_URL + 'IP_image_delete?id='+options.params.id+'&img='+options.params.img;

     fetch(url, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         }
     }).then((responseText) => {
         if (responseText.status == 200) {
             responseText.json().then(function(json) {
                 return options.success(json);
             });
         } else {
             responseText.json().then(function(json) {
                 return options.error(json);
             });
         }
     })
     .catch((error) => {
         AlertBox(options.errorMessage);
     });
 }


 export const PersonDeleteAPI = function(options) {
     debugger;

     var url = SERVICE_URL + 'delete-cases-list?person_id='+options.params.person_id+'&case_id='+options.params.case_id;

     fetch(url, {
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Origin': ORIGIN
         }
     }).then((responseText) => {
         if (responseText.status == 200) {
             responseText.json().then(function(json) {
                 return options.success(json);
             });
         } else {
             responseText.json().then(function(json) {
                 return options.error(json);
             });
         }
     })
     .catch((error) => {
         AlertBox(options.errorMessage);
     });
 }
