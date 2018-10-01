import _ from 'lodash';
import {AsyncStorage} from 'react-native';

import * as types from './actionTypes';
import {
  CheckOTPSentAPI,
  OtpVerifyAPI,
  EnrollmentAPI,
  LoadGalleryViewAPI,
  FaceRecognitionAPI,
  LoadGalleryViewSubjectAPI,
  LoadMediaAPI,
  EditPersonAPI,
  LoginUserAPI,
  EnrolUserAPI,
  UserDashboardAPI,
  DetectUserAPI,
  CaseTypesAPI,
  DetectImageAPI,
  DetectUserOnlyAPI,
  EnrolUserSDKAPI,
  AddUserAPI,
  LoadMatchedListAPI,
  LoadUserPersonListAPI,
  LoadIndividualListAPI,
  LoadIndividualListFaceAPI,
  LoadPersonListAPI,
  CaseCategoryAPI,
  UpdatePersonAPI,
  UpdateEnrolAPI,
  UserLogoutAPI,
  UserLoginAPI,
  UpdateDataAPI,
  MovePersonTypeAPI
} from '../../services/face';


const LOGIN_STATUS = 'LOGIN_STATUS';

export function setImageData(image_data = {}) {
   return {
      type: types.SET_IMAGE_DATA,
      image_data: image_data
   };
}

export function setCaseId(case_type_id = {}) {
   return {
      type: types.SET_CASE_ID,
      case_type_id: case_type_id
   };
}

export function setPersonType(data = {}) {
   return {
      type: types.SET_PERSON_TYPE,
      data: data
   };
}

export function setPersonId(person_id = {}) {
   return {
      type: types.SET_PERSON_ID,
      person_id: person_id
   };
}

export function updateEnrol(options) {
  debugger;
  return dispatch => {
    UpdateEnrolAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.ENROL_UPDATE_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.ENROL_UPDATE_FAILED,
          data:json
        });
      }
    })
  }
}

export function movePersonType(options) {
  debugger;
  return dispatch => {
    MovePersonTypeAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.MOVE_PERSON_TYPE_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.MOVE_PERSON_TYPE_FAILED,
          data:json
        });
      }
    })
  }
}

export function updatePerson(options) {
  debugger;
  return dispatch => {
    UpdatePersonAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.UPDATE_PERSON_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.UPDATE_PERSON_FAILED,
          data:json
        });
      }
    })
  }
}

export function editPerson(options) {
  debugger;
  return dispatch => {
    EditPersonAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.EDIT_PERSON_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.EDIT_PERSON_FAILED,
          data:json
        });
      }
    })
  }
}

export function updateData(options) {
  debugger;
  return dispatch => {
    UpdateDataAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.UPDATE_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.UPDATE_FAILED,
          data:json
        });
      }
    })
  }
}

export function setFbId(fb_id = {}) {
   return {
      type: types.SET_FB_ID,
      fb_id: fb_id
   };
}

export function setLoginStatus(loginStatus) {
  AsyncStorage.setItem(LOGIN_STATUS, JSON.stringify(loginStatus));
  return {
    type: types.SET_LOGIN_STATUS,
    loginStatus: loginStatus
  };
}

export function loadLoginStatus() {
  debugger;
  return dispatch => {
    AsyncStorage.getItem(LOGIN_STATUS).then((data)=>{
      const loginStatus = JSON.parse(data)
      debugger;
      if (loginStatus) {
        dispatch({
          type: types.SET_LOGIN_STATUS,
          loginStatus: loginStatus
        })
      }
    });
  }
}

export function checkOTPSent(options) {
  debugger;
  return dispatch => {
    CheckOTPSentAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.CHECK_OTP_SENT_SUCCESS,
          data:json
        });

      },
      error: function(json) {
        dispatch({
          type:types.CHECK_OTP_SENT_FAILED,
          data:json
        });
      }
    })
  }
}

export function logout() {
  return {
    type: types.LOGOUT
  };
}

export function otpVerify(options) {
  debugger;
  return dispatch => {
    OtpVerifyAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.OTP_VERIFICATION_SUCCESS,
          data:json
        });
        setLoginStatus(json);
      },
      error: function(json) {
        dispatch({
          type:types.OTP_VERIFICATION_FAILED,
          data:json
        });
      }
    })
  }
}


export function addUser(options) {
  debugger;
  return dispatch => {
    AddUserAPI({
      params:options.params,
      errorMessage:'User does not exist',
      success: function(json) {
        dispatch({
          type:types.ADD_USER_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.ADD_USER_FAILED,
          data:json
        });
      }
    })
  }
}


export function setPhoneNumber(data = {}) {
   return {
      type: types.SET_PHONE_NUMBER,
      data: data
   };
}

export function setDetect(response = {}) {
   return {
      type: types.SET_DETECT,
      response: response
   };
}

export function enrollment(options) {
  debugger;
  return dispatch => {
    EnrollmentAPI({
      params:options.params,
      errorMessage:'image does not exist',
      success: function(json) {
        dispatch({
          type:types.ENROLLMENT_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.ENROLLMENT_FAILED,
          data:json
        });
      }
    })
  }
}


export function userDashboard(options) {
  debugger;
  return dispatch => {
    UserDashboardAPI({
      params:options.params,
      errorMessage:'User id has been failed',
      success: function(json) {
        dispatch({
          type: types.USER_DASHBOARD,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type: types.USER_DASHBOARD,
          data:json
        });
      }
    })
  }
}

export function userLogout(options) {
  debugger;
  return dispatch => {
    UserLogoutAPI({
      params:options.params,
      errorMessage:'User id has been failed',
      success: function(json) {
        dispatch({
          type: types.USER_LOGOUT,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type: types.USER_LOGOUT,
          data:json
        });
      }
    })
  }
}

export function userLogin(options) {
  debugger;
  return dispatch => {
    UserLoginAPI({
      params:options.params,
      errorMessage:'User id has been failed',
      success: function(json) {
        dispatch({
          type: types.USER_LOGIN,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type: types.USER_LOGIN,
          data:json
        });
      }
    })
  }
}


export function  loadMatchedList(options) {
  debugger;
  return dispatch => {
  LoadMatchedListAPI({
      params:options.params,
      errorMessage:'Phone number does not exist',
      success: function(json) {
        dispatch({
          type:types.LOAD_MATHED_LIST,
          mathcedList:json
        })
      },
      error: function(json) {
        dispatch({
          type:types.LOAD_MATHED_LIST,
          mathcedList:json
        });
      }
    })
  }
}

export function  loadIndividualList(options) {
  debugger;
  return dispatch => {
  LoadIndividualListAPI({
      params:options.params,
      errorMessage:'Phone number does not exist',
      success: function(json) {
        dispatch({
          type:types.LOAD_INDIVIDUAL_LIST,
          individualList:json
        })
      },
      error: function(json) {
        dispatch({
          type:types.LOAD_INDIVIDUAL_LIST,
          individualList:json
        });
      }
    })
  }
}


export function  loadIndividualListFace(options) {
  debugger;
  return dispatch => {
  LoadIndividualListFaceAPI({
      params:options.params,
      errorMessage:'Phone number does not exist',
      success: function(json) {
        dispatch({
          type:types.LOAD_INDIVIDUAL_LIST_FACE_SUCCESS,
          individualList:json
        })
      },
      error: function(json) {
        dispatch({
          type:types.LOAD_INDIVIDUAL_LIST_FACE_FAILED,
          individualList:json
        });
      }
    })
  }
}


export function  loadUserPersonList(options) {
  debugger;
  return dispatch => {
  LoadUserPersonListAPI({
      params:options.params,
      errorMessage:'Phone number does not exist',
      success: function(json) {
        dispatch({
          type:types.LOAD_USER_PERSON_LIST,
          userPersonList:json
        })
      },
      error: function(json) {
        dispatch({
          type:types.LOAD_USER_PERSON_LIST,
          userPersonList:json
        });
      }
    })
  }
}

export function  loadPersonList(options) {
  debugger;
  return dispatch => {
  LoadPersonListAPI({
      params:options.params,
      errorMessage:'Phone number does not exist',
      success: function(json) {
        dispatch({
          type:types.LOAD_PERSON_LIST,
          personList:json
        })
      },
      error: function(json) {
        dispatch({
          type:types.LOAD_PERSON_LIST,
          personList:json
        });
      }
    })
  }
}

export function caseTypes(options) {
  debugger;
  return dispatch => {
    CaseTypesAPI({
      params:options.params,
      errorMessage:'User id has been failed',
      success: function(json) {
        dispatch({
          type: types.CASE_TYPE,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type: types.CASE_TYPE,
          data:json
        });
      }
    })
  }
}


export function caseCategory(options) {
  debugger;
  return dispatch => {
    CaseCategoryAPI({
      params:options.params,
      errorMessage:'User id has been failed',
      success: function(json) {
        dispatch({
          type: types.CASE_CATEGORY,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type: types.CASE_CATEGORY,
          data:json
        });
      }
    })
  }
}


export function loginUser(options) {
  debugger;
  return dispatch => {
    LoginUserAPI({
      params:options.params,
      errorMessage:'Login has been failed',
      success: function(json) {
        dispatch({
          type: types.LOGIN_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type: types.LOGIN_FAILED,
          data:json
        });
      }
    })
  }
}

export function detectUser(options) {
  debugger;
  return dispatch => {
    DetectUserAPI({
      params:options.params,
      errorMessage:'Detect has been failed',
      success: function(json) {
        dispatch({
          type: types.DETECT_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type: types.DETECT_FAILED,
          data:json
        });
      }
    })
  }
}

export function detectUserOnly(options) {
  debugger;
  return dispatch => {
    DetectUserOnlyAPI({
      params:options.params,
      errorMessage:'Detect has been failed',
      success: function(json) {
        dispatch({
          type: types.DETECT_ONLY_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type: types.DETECT_ONLY_FAILED,
          data:json
        });
      }
    })
  }
}

export function setEmpty(data={}) {
  return {
    type: types.SET_EMPTY,
    data: {}

  };
}
export function detectImage(options) {
  debugger;
  return dispatch => {
    DetectImageAPI({
      params:options.params,
      errorMessage:'image does not exist',
      success: function(json) {
        dispatch({
          type:types.DETECT_IMAGE_SUCCESS,
          detectImage:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.DETECT_IMAGE_FAILED,
          detectImage:json
        });
      }
    })
  }
}

export function enrolUser(options) {
  debugger;
  return dispatch => {
    EnrolUserAPI({
      params:options.params,
      errorMessage:'Enrol has been failed',
      success: function(json) {
        dispatch({
          type: types.ENROL_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type: types.ENROL_FAILED,
          data:json
        });
      }
    })
  }
}


export function enrolSDKUser(options) {
  debugger;
  return dispatch => {
    EnrolUserSDKAPI({
      params:options.params,
      errorMessage:'Enrol has been failed',
      success: function(json) {
        dispatch({
          type: types.ENROL_SDK_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type: types.ENROL_SDK_FAILED,
          data:json
        });
      }
    })
  }
}


export function faceRecognition(options) {
  debugger;
  return dispatch => {
    debugger;
    FaceRecognitionAPI({
      params:options.params,
      errorMessage:'Subject not found',
      success: function(json) {
        debugger;
        dispatch({
          type:types.FACERECOGNITION_SUCCESS,
          data:json
        });
      },
      error: function(json) {
          debugger;
        dispatch({
          type:types.FACERECOGNITION_FAILED,
          data:json
        });
      }
    })
  }
}

export function loadGalleryView(options) {
  return dispatch => {
    LoadGalleryViewAPI({
      params:options.params,
      errorMessage:'Gallery not found',
      success: function(json) {
        dispatch({
          type:types.LOAD_GALLERY_VIEW_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.LOAD_GALLERY_VIEW_FAILED,
          data:json
        });
      }
    })
  }
}

export function loadGalleryViewSubject(options) {
  return dispatch => {
    LoadGalleryViewSubjectAPI({
      params:options.params,
      errorMessage:'subject ID was not found',
      success: function(json) {
        dispatch({
          type:types.LOAD_GALLERY_VIEW_SUBJECT_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.LOAD_GALLERY_VIEW_SUBJECT_FAILED,
          data:json
        });
      }
    })
  }
}

export function loadMedia(options) {
    debugger;
  return dispatch => {
    LoadMediaAPI({
      params:options.params,
      errorMessage:'Media record not found',
      success: function(json) {
        dispatch({
          type:types.MEDIA_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.MEDIA_FAILED,
          data:json
        });
      }
    })
  }
}
