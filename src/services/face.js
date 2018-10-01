import React from 'react';
import AlertBox from '../Core/AlertBox'
import {Alert} from 'react-native';
import { SERVICE_URL, ORIGIN } from '../components/Constants'

// const SERVICE_URL = 'http://183.82.109.71:9090/fr/public/';
//  const ORIGIN = 'http://183.82.109.71';
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




export const CheckOTPSentAPI = function(options) {
    debugger;
    var params ={
      phone_num:options.params.phone_num
    }
    fetch(SERVICE_URL+'send-mobile-otp', {
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
      Alert.alert('Reason','Network request failed');
        console.warn(error);
    });
}


export const EditPersonAPI = function(options) {
    debugger;
      var person_id=options.params.person_id;
      var case_id=options.params.case_id;

    fetch(SERVICE_URL + 'get-person-details?person_id='+person_id+'&case_id='+case_id, {
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


export const MovePersonTypeAPI = function(options) {
    debugger;
      var person_id=options.params.person_id;
      var new_case_id=options.params.new_case_id;
      var old_case_id = options.params.old_case_id
      var url = SERVICE_URL + 'move-person-case?person_id='+person_id+'&new_case_id='+new_case_id+'&old_case_id='+old_case_id;
      console.log(url,'url');
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


export const UpdateDataAPI = function(options) {
    debugger;
      var person_id=options.params.person_id
      var case_id= options.params.case_id==undefined?0:options.params.case_id
      console.log(person_id,'person_id');

    fetch(SERVICE_URL+'get-person-details-for-update?person_id='+person_id+'&case_id='+case_id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': ORIGIN
        },
    }).then((responseText) => {
        if (responseText.status == 200) {
            responseText.json().then(function(json) {
              console.log(json,'options.success');
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
    var comments = options.params.comments;
    var enrolled_at = options.params.enrolled_at;
    var height=options.params.height;
    var inch  = options.params.inch;
    var color=options.params.color;
    var guardian_type=options.params.guardian_type;
    var guardian_name=options.params.guardian_name;
    var gender=options.params.gender;
    var identification_marks=options.params.identification_marks;
    var address= options.params.address;
    var person_case_type=JSON.stringify(options.params.person_case_type);
    var known_languages=JSON.stringify(options.params.known_languages);
    var person_case_category=JSON.stringify(options.params.person_case_category);
    var crime_details=JSON.stringify(options.params.crime_details);
    var user_id=options.params.user_id;
    var latitude=options.params.latitude;
    var longitude=options.params.longitude;
    var person_id = options.params.person_id;
    var rstate_id=options.params.rstate_id;
    var rdistrict_id=options.params.rdistrict_id;
    var rps_id=options.params.rps_id;
    var rescue_id=options.params.rescue_id;
    var cci_id=options.params.cci_id;
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
    var data = '?person_id='+person_id+'&name='+name+'&inch='+inch+'&enrolled_at='+enrolled_at+'&comments='+comments+'&alias_name='+alias_name+'&rstate_id='+rstate_id+'&rdistrict_id='+rdistrict_id+'&rps_id='+rps_id+'&rescue_id='+rescue_id+'&cci_id='+cci_id+'&aadhar_num='+aadhar_num+'&dob='+dob+'&age='+age+'&height='+height+'&color='+color+'&guardian_type='+guardian_type+'&guardian_name='+guardian_name+'&gender='+gender+'&identification_marks='+identification_marks+'&address='+address+'&known_languages='+known_languages+'&person_case_type='+person_case_type+'&person_case_category='+person_case_category+'&crime_details='+crime_details+'&user_id='+user_id+'&latitude='+latitude+'&longitude='+longitude;
    console.log(data,'data');
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


export const UpdatePersonAPI = function(options) {

  console.log(options.params,'options.params ree');
 // var photo=options.params.photo;
    var name=options.params.name;
    var alias_name=options.params.alias_name;
    var aadhar_num=options.params.aadhar_num;
    var dob=options.params.dob;
    var age=options.params.age;
    var organization=options.params.oraganization;
    var comments = options.params.comments;
    var enrolled_at = options.params.enrolled_at;
    var height=options.params.height;
    var inch  = options.params.inch;
    var color=options.params.color;
    var state = options.params.state;
    var nationality = options.params.nationality;
    var guardian_type=options.params.guardian_type;
    var guardian_name=options.params.guardian_name;
    var gender=options.params.gender;
    var passport_no:options.params.passport_no;
    var passport_issue_date=options.params.passport_issue_date;
    var passport_issue_place=options.params.passport_issue_place;
    var passport_expiry_date=options.params.passport_expiry_date;
    var visa_no=options.params.visa_no;
    var visa_issue_date=options.params.visa_issue_date;
    var visa_expiry_date=options.params.visa_expiry_date;
    var unhcr_no=options.params.unhcr_no;
    var individual_no=options.params.individual_no;
    var identification_marks=options.params.identification_marks;
    var address= options.params.address;
    var person_case_type=JSON.stringify(options.params.person_case_type);
    var known_languages=JSON.stringify(options.params.known_languages);
    var person_case_category=JSON.stringify(options.params.person_case_category);
    var crime_details=JSON.stringify(options.params.crime_details);
    var user_id=options.params.user_id;
    var latitude=options.params.latitude;
    var longitude=options.params.longitude;
    var person_id = options.params.person_id;
    var rstate_id=options.params.rstate_id;
    var rdistrict_id=options.params.rdistrict_id;
    var rps_id=options.params.rps_id;
    var rescue_id=options.params.rescue_id;
    var cci_id=options.params.cci_id;
    var update_new = options.params.update_new;
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
    var data = '?person_id='+person_id+'&name='+name+'&organization='+organization+'&passport_no='+passport_no+'&passport_issue_date='+passport_issue_date+'&passport_issue_place='+passport_issue_place+'&passport_expiry_date='+passport_expiry_date+'&visa_no='+visa_no+'&visa_issue_date='+visa_issue_date+'&visa_expiry_date='+visa_expiry_date+'&unhcr_no='+unhcr_no+'&individual_no='+individual_no+'&state='+state+'&nationality='+nationality+'&update_new='+update_new+'&inch='+inch+'&enrolled_at='+enrolled_at+'&comments='+comments+'&alias_name='+alias_name+'&rstate_id='+rstate_id+'&rdistrict_id='+rdistrict_id+'&rps_id='+rps_id+'&rescue_id='+rescue_id+'&cci_id='+cci_id+'&aadhar_num='+aadhar_num+'&dob='+dob+'&age='+age+'&height='+height+'&color='+color+'&guardian_type='+guardian_type+'&guardian_name='+guardian_name+'&gender='+gender+'&identification_marks='+identification_marks+'&address='+address+'&known_languages='+known_languages+'&person_case_type='+person_case_type+'&person_case_category='+person_case_category+'&crime_details='+crime_details+'&user_id='+user_id+'&latitude='+latitude+'&longitude='+longitude;
    console.log(data,'data');
    fetch(SERVICE_URL+'update-case-record'+data, {
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

export const OtpVerifyAPI = function(options) {
    debugger;
    var params ={
      phone_num:options.params.phone_num,
      otp:options.params.otp,
      latitude:options.params.latitude,
      longitude:options.params.longitude
    }
    fetch(SERVICE_URL+'check-otp', {
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

export const AddUserAPI = function(options) {
    debugger;
    var params ={
      name:options.params.name,
      phone:options.params.phone,
      state_id:options.params.state_id,
      district_id:options.params.district_id,
      ps_id:options.params.ps_id,
      role:options.params.role,
      table_access:options.params.table_access
    };
      console.log(params,'params redux');
    fetch(SERVICE_URL+'add-user-json-api', {
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
          console.log('fdfdf');
            responseText.json().then(function(json) {

                return options.success(json);
            });
        }
    })
    .catch((error) => {
        console.warn(error);
        Alert.alert('Reason','Network request failed');
    });
}

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
        Alert.alert('Reason','Network request failed');
    });
}

export const LoginUserAPI = function(options) {
    debugger;
    var params = {
      email:options.params.email,
      password:options.params.password
    };

    fetch(SERVICE_URL+'user-login', {
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
    }).catch((error) => {
        console.warn(error);
      Alert.alert('Reason','Network request failed');
    });
}


export const CaseTypesAPI = function(options) {
    debugger;
    var params = {
      id:options.params.id
    };

    fetch(SERVICE_URL+'get-case-types-api', {
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
    }).catch((error) => {
        console.warn(error);
        Alert.alert('Reason','Network request failed');
    });
}

export const CaseCategoryAPI = function(options) {
    debugger;
    var params = {
      case_type_id:options.params.case_type_id
    };
    console.log(params,'reducer param');

    fetch(SERVICE_URL+'get-new-case-category-types-api', {
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
    }).catch((error) => {
        console.warn(error);
        Alert.alert('Reason','Network request failed');
    });
}

export const LoadMatchedListAPI = function(options) {
    debugger;
    var person_id=options.params.person_id;
    var url = SERVICE_URL + 'total-matched-records-list?person_id='+person_id;

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


export const LoadIndividualListAPI = function(options) {
    debugger;
    var person_id=options.params.person_id;
    var matched_id = options.params.matched_id==undefined?'':options.params.matched_id;
    console.log(person_id,'redux');
    console.log(matched_id,'undefined');
    var url = SERVICE_URL + 'get-person-details?person_id='+person_id+'&matched_id='+matched_id;
    console.log(url,'url');
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

export const LoadIndividualListFaceAPI = function(options) {
    debugger;
    var person_id=options.params.person_id;
    var matched_id = options.params.matched_id==undefined?'':options.params.matched_id;
    var case_id=options.params.case_id==undefined?0:options.params.case_id;
    //console.log(person_id,'redux');
    //console.log(matched_id,'undefined');
    var url = SERVICE_URL + 'get-person-details?person_id='+person_id+'&case_id='+case_id;
    console.log(url,'url');
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


export const LoadUserPersonListAPI = function(options) {
    debugger;
    //var data='role='+options.params.role+'&id='+options.params.id+'&ps_id='+options.params.ps_id+'&district_id='+options.params.district_id;
    //console.log(data,'data');
    console.log(options,'options.params');
    var id =options.params.id;
    var role =options.params.role;
    var ps_id=options.params.ps_id;
    var district_id=options.params.district_id;
    console.log(role+'__'+ps_id+'__'+district_id+'__'+id);
    var url = SERVICE_URL +'user-persons-list?id='+id+'&ps_id='+ps_id+'&district_id='+district_id+'&role='+role;
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

export const LoadPersonListAPI = function(options) {
    debugger;
    //var data='role='+options.params.role+'&id='+options.params.id+'&ps_id='+options.params.ps_id+'&district_id='+options.params.district_id;
    //console.log(data,'data');
    console.log(options,'options.params');
    var id =options.params.id;
    var role =options.params.role;
    var ps_id=options.params.ps_id;
    var district_id=options.params.district_id;
    var case_type_id = options.params.case_type_id;
    //console.log(role+'__'+ps_id+'__'+district_id+'__'+id+'__'+case_type_id);
    var url = SERVICE_URL +'persons-list?id='+id+'&ps_id='+ps_id+'&district_id='+district_id+'&role='+role+'&case_type_id='+case_type_id;
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


export const DetectUserAPI = function(options) {
  debugger;
var formdata  = new FormData();
var folderNames = options.params.folderNames;
  console.log(options.params,'params redux');
  var formdata  = new FormData();
  formdata.append('image', {
    uri: options.params.image.uri,
    type: options.params.image.type,
    name: options.params.image.name,
  });
    fetch('http://183.82.109.71:8080/VerifyFace/user/detect?matchingthreshhold=20&noofresults=20&folderNames='+folderNames, {
        method: 'POST',
        body: formdata,
        header: {
          'Content-Type':  'multipart/form-data',
          'Accept':'application/json',
           'Cache-Control': 'no-cache'
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
    }).catch((error) => {
        console.warn(error);
        Alert.alert('Reason','Network request failed');
    });
}

export const DetectUserOnlyAPI = function(options) {
  debugger;
  var folderNames = options.params.folderNames;
var matchingthreshhold = parseInt(options.params.matchingthreshhold);
var formdata  = new FormData();
  console.log(options,'params redux');
  //var formdata  = new FormData();
    var formdata  = new FormData();
  formdata.append('image', {
    uri: options.params.image.uri,
    type: options.params.image.type,
    name: options.params.image.Filename,
  });
    fetch('http://183.82.109.71:8080/VerifyFace/user/detect?noofresults=20&matchingthreshhold='+matchingthreshhold+'&folderNames='+folderNames, {
        method: 'POST',
        body: formdata,
        header: {
          'Content-Type':  'multipart/form-data',
          'Accept':'application/json',
           'Cache-Control': 'no-cache'
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
    }).catch((error) => {
        console.warn(error);
      Alert.alert('Reason','Network request failed');
    });
}

export const DetectImageAPI = function(options) {
    debugger;

    var params = {
       login_user_id: options.params.login_user_id,
       folder_name:options.params.folder_name,
       image_name:options.params.image_name,
       matched_id: options.params.matched_id,
       score:options.params.score,
       person_type:options.params.person_type,
       latitude:options.params.latitude,
       longitude:options.params.longitude,
       detected_by:options.params.detected_by
    };
console.log(params, 'redux params');
    fetch(SERVICE_URL+'case-detection', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': ORIGIN
        },
        body:JSON.stringify(params)
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

export const UserDashboardAPI = function(options) {
    debugger;
    var params = {
      id:options.params.id
    };
  console.log(params,'redux dashboard');
    fetch(SERVICE_URL+'cases-dashboard', {
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
    }).catch((error) => {
        console.warn(error);
      Alert.alert('Reason','Network request failed');
    });
}


export const UserLogoutAPI = function(options) {
    debugger;
    var params = {
      phone:options.params.phone
    };
  console.log(params,'redux logout');
    fetch(SERVICE_URL+'mobile-logout', {
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
    }).catch((error) => {
        console.warn(error);
      Alert.alert('Reason','Network request failed');
    });
}


export const UserLoginAPI = function(options) {
    debugger;
    var params = {
      phone:options.params.phone,
      latitude:options.params.latitude,
      longitude:options.params.longitude
    };
  console.log(params,'redux logout');
    fetch(SERVICE_URL+'mobile-login', {
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
    }).catch((error) => {
        console.warn(error);
      Alert.alert('Reason','Network request failed');
    });
}


export const EnrolUserAPI = function(options) {
    debugger;
    console.log(options.params,'options.params ree');
    var photo=options.params.photo;
      var name=options.params.name;
      var comments = options.params.comments;
      var enrolled_at = options.params.enrolled_at;
      var organization=options.params.oraganization;
      var alias_name=options.params.alias_name;
      var aadhar_num=options.params.aadhar_num;
      var dob=options.params.dob;
      var age=options.params.age;
      var state = options.params.state;
      var nationality = options.params.nationality;
      var height=options.params.height;
      var inch = options.params.inch;
      var color=options.params.color;
      var guardian_type=options.params.guardian_type;
      var guardian_name=options.params.guardian_name;
      var gender=options.params.gender;
      var passport_no=options.params.passport_no;
      var passport_issue_date=options.params.passport_issue_date;
      var passport_issue_place=options.params.passport_issue_place;
      var passport_expiry_date=options.params.passport_expiry_date;
      var visa_no=options.params.visa_no;
      var visa_issue_date=options.params.visa_issue_date;
      var visa_expiry_date=options.params.visa_expiry_date;
      var unhcr_no=options.params.unhcr_no;
      var individual_no=options.params.individual_no;
      var identification_marks=options.params.identification_marks;
      var address= options.params.address;
      var known_languages = JSON.stringify(options.params.known_languages);
      var person_case_type=JSON.stringify(options.params.person_case_type);
      var person_case_category=JSON.stringify(options.params.person_case_category);
      var crime_details=JSON.stringify(options.params.crime_details);
      var user_id=options.params.user_id;
      var latitude=options.params.latitude;
      var longitude=options.params.longitude;
      var rstate_id=options.params.rstate_id;
      var rdistrict_id=options.params.rdistrict_id;
      var rps_id=options.params.rps_id;
      var rescue_id=options.params.rescue_id;
      var cci_id=options.params.cci_id;

      console.log(person_case_type,'person_case_type');

      var formdata  = new FormData();
      console.log(photo,'options.params.identification_proofs.length');
      if(options.params.identification_proofs.length>0){
      for(let i=0; i<options.params.identification_proofs.length;i++){
        formdata.append('identification_proofs[]', {
          uri: options.params.identification_proofs[i].uri,
        type: options.params.identification_proofs[i].type,
        name: options.params.identification_proofs[i].name
      });      }
    }

    for(let i=0; i<options.params.photo.length;i++){
      formdata.append('photo[]', {
      uri: options.params.photo[i].uri,
      type: options.params.photo[i].type,
      name: options.params.photo[i].name
    });      }
 var data = '?name='+name+'&alias_name='+alias_name+'&organization='+organization+'&passport_no='+passport_no+'&passport_issue_date='+passport_issue_date+'&passport_issue_place='+passport_issue_place+'&passport_expiry_date='+passport_expiry_date+'&visa_no='+visa_no+'&visa_issue_date='+visa_issue_date+'&visa_expiry_date='+visa_expiry_date+'&unhcr_no='+unhcr_no+'&individual_no='+individual_no+'&state='+state+'&nationality='+nationality+'&inch='+inch+'&enrolled_at='+enrolled_at+'&comments='+comments+'&rstate_id='+rstate_id+'&rdistrict_id='+rdistrict_id+'&rps_id='+rps_id+'&rescue_id='+rescue_id+'&cci_id='+cci_id+'&aadhar_num='+aadhar_num+'&dob='+dob+'&age='+age+'&height='+height+'&color='+color+'&guardian_type='+guardian_type+'&guardian_name='+guardian_name+'&gender='+gender+'&identification_marks='+identification_marks+'&address='+address+'&known_languages='+known_languages+'&person_case_type='+person_case_type+'&person_case_category='+person_case_category+'&crime_details='+crime_details+'&user_id='+user_id+'&latitude='+latitude+'&longitude='+longitude;
 console.log(data,'data');
    fetch(SERVICE_URL+'save-case-record'+data, {
        method: 'POST',
        headers: {
            'Content-Type':'multipart/form-data',
            'Origin':ORIGIN
        },
        body: formdata
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

export const EnrolUserSDKAPI = function(options) {
    debugger;
    var formdata  = new FormData();
    //console.log(options.params,'options.params');
    var name=options.params.name;
    var folderNames=options.params.folderNames;
    var imageName=options.params.imageName;
    var psqno =options.params.psqno;
    formdata.append('image', {
      uri: options.params.image.uri,
      type: options.params.image.type,
      name: options.params.image.Filename
    });
    var url = 'http://183.82.109.71:8080/VerifyFace/user/enroll?name='+name+'&imageName='+imageName+'&psqno='+psqno+'&folderNames='+folderNames ;
    console.log(url, 'data url');
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type' :  'multipart/form-data',
            'Origin': 'http://183.82.109.71'
        },
        body: formdata
    }).then((responseText) => {
        if (responseText.status == 200) {
            responseText.json().then(function(json) {
                return options.success(json);
            });
        } else {
            Alert.alert('Reason','FR Server not reachable.');
            responseText.json().then(function(json) {
                return options.error(json);
            });
        }
    }).catch((error) => {
        console.warn(error);
        Alert.alert('Reason','FR Server not reachable.');
    });
}




export const FaceRecognitionAPI = function(options) {
    debugger;
    var formdata  = new FormData();
    formdata.append('detect_image[]', {
      uri: options.params.detect_image.uri,
      type: options.params.detect_image.type,
      name: options.params.detect_image.fileName
    });
    var detected_by=options.params.detected_by;

    var url = SERVICE_URL+"ajax-facebook-detect?detected_by="+detected_by;

    fetch(url, {
      method: 'POST',
      body: formdata,
      header: {
        'Content-Type':  'multipart/form-data',
        'Accept':'application/json',
         'Cache-Control': 'no-cache'
      }
    }).then((responseText) => {
       console.log('success===>', responseText);
       if(responseText.status == 200){
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
     }).catch((error) => {
         console.warn(error);
         Alert.alert('Reason','Network request failed');
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
        Alert.alert('Reason','Network request failed');
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
       Alert.alert('Reason','Network request failed');
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
    }).then(response =>response.json().then(data =>({status:response.status,body:data})))
    .then((responseText) => {
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
        Alert.alert('Reason','Network request failed');
    });
}
