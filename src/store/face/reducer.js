import * as ActionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isSentOTP:false,
  sentOTPResponse:{},
  galleryView: {},
  galleryViewSubject: {},
  enrollment:{},
  enrollmentSuccess:false,
  recognizeResponse:[],
  recognizeStatus:false,
  media:{},
  personType:{},
  isLoggedin: false,
  loginResponse:{},
  isUpdate:false,
  updateData:{},
  enrolResponse:{},
  isEnroledin:false,
  isMoved:false,
  movePersonType:{},
  isSDKEnroledin:false,
  isUpdatedin:false,
  isUpdatedPerson:false,
  updateResponse:{},
  updatePersonResponse:{},
  SDKEnrolResponse:{},
  userDashboard:{},
  detect:{},
  isDetected:false,
  image_data:{},
  case_type_id:{},
  person_id:{},
  fb_id:{},
  case_type_person:{},
  case_category_person:{},
  isImageDetected:false,
  detectImage:{},
  phoneNumber: '',
  isOTPVerified:false,
  OTPVerificationResponse:{},
  addUserReponse:{},
  isAddUser:false,
  response:{},
  mathcedList:{},
  detectOnly:{},
  isOnlyDetected:false,
  userPersonList:[],
  logout:{},
  edit_person:{},
  isEdited:false,
  user_login:{},
  personList:[],
  individualList:{},
  individualListFace:{},
  isIndividual:false,




});

export default function reduce(state = initialState, action = {}) {
  debugger;
  switch (action.type) {
    case ActionTypes.CHECK_OTP_SENT_SUCCESS:
      return state.merge({
        sentOTPResponse: action.data,
        isSentOTP:true
      });
      break;
    case ActionTypes.CHECK_OTP_SENT_FAILED:
      return state.merge({
        sentOTPResponse: action.data,
        isSentOTP:false
      });
      break;
    case ActionTypes.OTP_VERIFICATION_SUCCESS:
      return state.merge({
        OTPVerificationResponse: action.data,
        isOTPVerified:true
      });
      break;
    case ActionTypes.OTP_VERIFICATION_FAILED:
      return state.merge({
        OTPVerificationResponse: action.data,
        isOTPVerified:false
      });
      break;
      case ActionTypes.MOVE_PERSON_TYPE_SUCCESS:
        return state.merge({
          movePersonType: action.data,
          isMoved:true
        });
        break;
      case ActionTypes.MOVE_PERSON_TYPE_FAILED:
        return state.merge({
          movePersonType: action.data,
          isMoved:false
        });
        break;
    case ActionTypes.EDIT_PERSON_SUCCESS:
      return state.merge({
        isEdited:true,
        edit_person: action.data
      });
      break;
    case ActionTypes.EDIT_PERSON_FAILED:
      return state.merge({
        isEdited:false,
        edit_person: action.data
      });
      break;
    case ActionTypes.UPDATE_SUCCESS:
      return state.merge({
        isUpdate:true,
        updateData: action.data
      });
      break;
    case ActionTypes.UPDATE_FAILED:
      return state.merge({
        isUpdate:false,
        updateData: action.data
      });
      break;
    case ActionTypes.ADD_USER_SUCCESS:
      return state.merge({
        addUserReponse: action.data,
        isAddUser:true
      });
      break;
    case ActionTypes.LOAD_MEDIA_FAILED:
      return state.merge({
        addUserReponse: action.data,
        isAddUser:false
      });
      break;
  case ActionTypes.USER_LOGOUT:
    return state.merge({
      logout: action.data,
    });
    break;
case ActionTypes.USER_LOGIN:
  return state.merge({
    user_login: action.data,
  });
  break;
  case ActionTypes.ENROL_UPDATE_SUCCESS:
    debugger;
    return state.merge({
      isUpdatedin:true,
      updateResponse: action.data
    });
    break;
  case ActionTypes.ENROL_UPDATE_FAILED:
    return state.merge({
      isUpdatedin:false,
      updateResponse: action.data
    });
    break;
  case ActionTypes.UPDATE_PERSON_SUCCESS:
    debugger;
    return state.merge({
      isUpdatedPerson:true,
      updatePersonResponse: action.data
    });
    break;
  case ActionTypes.UPDATE_PERSON_FAILED:
    return state.merge({
      isUpdatedPerson:false,
      updatePersonResponse: action.data
    });
    break;
    case ActionTypes.ENROLLMENT_SUCCESS:
      return state.merge({
        enrollment: action.data,
        enrollmentSuccess:true
      });
      break;
    case ActionTypes.ENROLLMENT_FAILED:
      return state.merge({
        enrollment: action.data,
        enrollmentSuccess:false
      });
      break;
    case ActionTypes.SET_LOGIN_STATUS:
        debugger;
        return state.merge({
          isOTPVerified: true,
          isSentOTP:true,
          OTPVerificationResponse: action.loginStatus
        });
        break;
    case ActionTypes.LOGOUT:
      debugger;
      return state.merge({
        isSentOTP:false,
        isOTPVerified:false,
        sentOTPResponse:{},
      });
      break;
  case ActionTypes.LOAD_MATHED_LIST:
    return state.merge({
      mathcedList: action.mathcedList
    });
    break;
  case ActionTypes.LOAD_INDIVIDUAL_LIST:
    return state.merge({
      individualList: action.individualList
    });
    break;
  case ActionTypes.LOAD_INDIVIDUAL_LIST_FACE_SUCCESS:
    return state.merge({
      isIndividual:true,
      individualListFace: action.individualList,
    });
    break;
  case ActionTypes.LOAD_INDIVIDUAL_LIST_FACE_FAILED:
    return state.merge({
        isIndividual:false,
      individualListFace: action.individualList
    });
    break;
  case ActionTypes.LOAD_USER_PERSON_LIST:
    return state.merge({
      userPersonList: action.userPersonList
    });
    break;
    case ActionTypes.LOAD_PERSON_LIST:
      return state.merge({
        personList: action.personList
      });
      break;
    case ActionTypes.SET_IMAGE_DATA:
      return state.merge({
        image_data: action.image_data
      });
      break;
  case ActionTypes.SET_CASE_ID:
    return state.merge({
      case_type_id: action.case_type_id
    });
    break;
case ActionTypes.SET_PERSON_TYPE:
  return state.merge({
    personType: action.data
  });
  break;
  case ActionTypes.SET_DETECT:
    return state.merge({
      response: action.response
    });
    break;
  case ActionTypes.SET_PERSON_ID:
    return state.merge({
      person_id: action.person_id
    });
    break;
    case ActionTypes.SET_FB_ID:
      return state.merge({
        fb_id: action.fb_id
      });
      break;
    case ActionTypes.SET_PHONE_NUMBER:
      return state.merge({
        phoneNumber: action.data.phone
      });
      break;
    case ActionTypes.LOGIN_SUCCESS:
      debugger;
      return state.merge({
        isLoggedin: true,
        loginResponse: action.data
      });
      break;
    case ActionTypes.LOGIN_FAILED:
      return state.merge({
        isLoggedin: false,
        loginResponse: action.data
      });
      break;

    case ActionTypes.DETECT_SUCCESS:
      debugger;
      return state.merge({
        isDetected: true,
        detect: action.data
      });
      break;
    case ActionTypes.DETECT_FAILED:
      return state.merge({
        isDetected: false,
        detect: action.data
      });
      break;
    case ActionTypes.DETECT_ONLY_SUCCESS:
      debugger;
      return state.merge({
        isOnlyDetected: true,
        detectOnly: action.data
      });
      break;
    case ActionTypes.DETECT_ONLY_FAILED:
      return state.merge({
        isOnlyDetected: false,
        detectOnly: action.data
      });
      break;

  case ActionTypes.DETECT_IMAGE_SUCCESS:
    debugger;
    return state.merge({
      isImageDetected: true,
      detectImage: action.detectImage
    });
    break;
  case ActionTypes.DETECT_IMAGE_FAILED:
    return state.merge({
      isImageDetected: false,
      detectImage: action.detectImage
    });
    break;
    case ActionTypes.USER_DASHBOARD:
      debugger;
      return state.merge({
        userDashboard: action.data
      });
      break;
    case ActionTypes.CASE_TYPE:
      debugger;
      return state.merge({
        case_type_person: action.data
      });
      break;
    case ActionTypes.CASE_CATEGORY:
      debugger;
      return state.merge({
        case_category_person: action.data
      });
      break;
    case ActionTypes.ENROL_SUCCESS:
      debugger;
      return state.merge({
        isEnroledin: true,
        enrolResponse: action.data
      });
      break;
    case ActionTypes.ENROL_FAILED:
      return state.merge({
        isEnroledin: false,
        enrolResponse: action.data
      });
      break;
      case ActionTypes.ENROL_SDK_SUCCESS:
        debugger;
        return state.merge({
          isSDKEnroledin: true,
          SDKEnrolResponse: action.data
        });
        break;
      case ActionTypes.ENROL_SDK_FAILED:
        return state.merge({
          isSDKEnroledin: false,
          SDKEnrolResponse: action.data
        });
        break;

    case ActionTypes.SET_EMPTY:
     return state.merge({
       detect: null,
       isMoved:false,
       detectOnly:null,
       isOnlyDetected:false,
       isDetected: false,
       isImageDetected:false,
       detectImage:null,
       isEdited:false,
       response:null,
       isEnroledin: false,
       enrolResponse:null,
       isSDKEnroledin:false,
       SDKEnrolResponse:null,
       updateResponse:null,
       isIndividual:false,
       isUpdatedin:false,
       isUpdatedPerson:false,
       isUpdate:false,
       updatePersonResponse:null,
       personList:[]
     });
     break;
    case ActionTypes.FACERECOGNITION_SUCCESS:
    debugger;
      return state.merge({
        detect: action.data,
        isDetected:true
      });
      break;
    case ActionTypes.FACERECOGNITION_FAILED:
    debugger;
      return state.merge({
        detect: action.data,
        isDetected:false
      });
      break;
    case ActionTypes.LOAD_GALLERY_VIEW_SUCCESS:
      return state.merge({
        galleryView: action.data
      });
      break;
    case ActionTypes.LOAD_GALLERY_VIEW_FAILED:
      return state.merge({
        galleryView: action.data
      });
      break;
      case ActionTypes.LOAD_GALLERY_VIEW_SUBJECT_SUCCESS:
        return state.merge({
          galleryViewSubject: action.data
        });
        break;
      case ActionTypes.LOAD_GALLERY_VIEW_SUBJECT_FAILED:
        return state.merge({
          galleryViewSubject: action.data
        });
        case ActionTypes.LOAD_MEDIA_SUCCESS:
          return state.merge({
            media: action.data
          });
          break;
        case ActionTypes.LOAD_MEDIA_FAILED:
          return state.merge({
            media: action.data
          });
        break;

    default:
      return state;
  }
}

export function getEmptyData(globalState) {
    debugger;
return {
  detect:null,
  detectImage:null,
  enrolResponse:null,
  SDKEnrolResponse:null,
  updatePersonResponse:null,
  personList:[]
}
}


// export function getMatchedListView(globalState) {
//     debugger;
//     var mathcedList = globalState.face.mathcedList;
//
//     var mathcedListView = [];
//     mathcedList.forEach(function(mathced) {
//        var temp = mathced.merge({
//        });
//        mathcedListView.push(temp);
//     });
//
//
//
//     var dataSource = mathcedListView;
//
//     return dataSource;
// }

export function getMatchedListView(globalState) {
    debugger;
    return globalState.face.mathcedList;


}

export function getLogoutResponse(globalState) {
    debugger;
    return globalState.face.logout;


}
export function getUserLoginResponse(globalState) {
    debugger;
    return globalState.face.user_login;


}


export function getIndividualListView(globalState) {
    debugger;
    return globalState.face.individualList;


}
export function getIndividualListFaceView(globalState) {
    debugger;
    return globalState.face.individualListFace;


}
export function isIndividual(globalState) {
    debugger;
    return globalState.face.isIndividual;
}

export function getUpdateData(globalState) {
    debugger;
    return globalState.face.updateData;


}

export function isMoved(globalState) {
    debugger;
    return globalState.face.isMoved;
}

export function getMovePersonType(globalState) {
    debugger;
    return globalState.face.movePersonType;


}
export function isUpdate(globalState) {
    debugger;
    return globalState.face.isUpdate;
}
export function getUserPersonListView(globalState) {
    debugger;
    return globalState.face.userPersonList;


}

export function getPersonListView(globalState) {
    debugger;
    return globalState.face.personList;


}

export function getPersonType(globalState) {
    debugger;
    return globalState.face.personType;


}

export function getSentOTPResponse(globalState) {
   return globalState.face.sentOTPResponse;
}

export function isSentOTP(globalState) {
    debugger;
    return globalState.face.isSentOTP;
}

export function getOTPVerificationResponse(globalState) {
   return globalState.face.OTPVerificationResponse;
}

export function isOTPVerified(globalState) {
    debugger;
    return globalState.face.isOTPVerified;
}

export function getAddUserResponse(globalState) {
   return globalState.face.addUserReponse;
}

export function isAddUser(globalState) {
    debugger;
    return globalState.face.isAddUser;
}

export function getGalleryView(globalState) {
  debugger;
  console.log(globalState);
  return globalState.face.galleryView.subject_ids || [];
}

export function getPhone(globalState) {
  debugger;
  return globalState.face.phoneNumber;
}

export function getImageResponse(globalState) {
  debugger;
  return globalState.face.image_data;
}

export function getCaseIdResponse(globalState) {
  debugger;
  return globalState.face.case_type_id;
}

export function getPersonIdResponse(globalState) {
  debugger;
  return globalState.face.person_id;
}

export function getFbIdResponse(globalState) {
  debugger;
  return globalState.face.fb_id;
}
export function getGalleryViewSubject(globalState) {
  debugger;
  console.log(globalState);
  return globalState.face.galleryViewSubject.subject_ids || [];
}

export function getEnrollmentResponse(globalState) {
  debugger;
  return globalState.face.enrollment || {};
}

export function getDetect1Response(globalState) {
  debugger;
  return globalState.face.response || {};
}

export function isUserLoogedin(globalState) {
  debugger;
  return globalState.face.isLoggedin;
}

export function getEditPersonResponce(globalState) {
    debugger;
    return globalState.face.edit_person;
}
export function isEdited(globalState) {
    debugger;
    return globalState.face.isEdited;
}

export function getLoginResponse(globalState) {
  debugger;
  return globalState.face.loginResponse;
}



export function isUserDetected(globalState) {
  debugger;
  return globalState.face.isDetected;
}

export function getDetectResponse(globalState) {
  debugger;
  return globalState.face.detect;
}

export function isOnlyUserDetected(globalState) {
  debugger;
  return globalState.face.isOnlyDetected;
}

export function getDetectOnlyResponse(globalState) {
  debugger;
  return globalState.face.detectOnly;
}

export function isImageDetected(globalState) {
  debugger;
  return globalState.face.isImageDetected;
}

export function getDetectImageResponse(globalState) {
  debugger;
  return globalState.face.detectImage;
}

export function getUserDashboardResponse(globalState) {
  debugger;
  return globalState.face.userDashboard;
}

export function getCaseTypesResponse(globalState) {
  debugger;
  return globalState.face.case_type_person;
}

export function getCaseCategoryResponse(globalState) {
  debugger;
  return globalState.face.case_category_person;
}

export function isUserEnroledin(globalState) {
  debugger;
  return globalState.face.isEnroledin;
}

export function getEnrolResponse(globalState) {
  debugger;
  return globalState.face.enrolResponse;
}

export function isSDKUserEnroledin(globalState) {
  debugger;
  return globalState.face.isSDKEnroledin;
}

export function getSDKEnrolResponse(globalState) {
  debugger;
  return globalState.face.SDKEnrolResponse;
}

export function getEnrollmentStatus(globalState) {
  debugger;
  return globalState.face.enrollmentSuccess === true;
}

export function getRecognizeResponse(globalState) {
  debugger;
  return globalState.face.recognizeResponse || [];
}

export function getRecognizeStatus(globalState) {
  debugger;
  return globalState.face.recognizeStatus === true;
}

export function getMedia(globalState) {
  debugger;
  console.log(globalState);
  return globalState.face.media.face_ids || [];
}

export function getUpdateResponce(globalState) {
    debugger;
    return globalState.face.updateResponse;
}
export function isUpdatedin(globalState) {
    debugger;
    return globalState.face.isUpdatedin;
}

export function getUpdatePersonResponce(globalState) {
    debugger;
    return globalState.face.updatePersonResponse;
}
export function isUpdatedPerson(globalState) {
    debugger;
    return globalState.face.isUpdatedPerson;
}
