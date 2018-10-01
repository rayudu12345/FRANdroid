import * as ActionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
id_based_district_response:{},
district_id_based_police_responce:{},
edit_person:{},
isEdited:false,
isUpdatedin:false,
updateResponse:{},
getAllDistrict:{},
divisions:{},
circle:{},
police:{},
img_delete:{},
person_delete:{},
person_id:{},
detect_comment:{},
facebook_detect_comment:{},
isImage:false,
image_details:{},
languages:{},
states:{},
all_states:{},
enroll_state:{},
nationality:{},
home_recursive:{},
cci_data:{},
isComment:false,
rescue_police:{},
rescue_cci:{},
rescue_home:{},
detect_matched:{},
isMatched:false,
isPersonDelete:false,
rescue_disreict:{},
get_comment:{},
oraganization:{}
});

export default function reduce(state = initialState, action = {}) {
  debugger;
  switch (action.type) {
    case ActionTypes.USER_ID_BASED_DISTRICT:
      return state.merge({
        id_based_district_response: action.data
      });
      break;
    case ActionTypes.DETECT_MATCHED_SUCCESS:
      return state.merge({
        isMatched:true,
        detect_matched: action.data
      });
      break;
    case ActionTypes.DETECT_MATCHED_FAILED:
      return state.merge({
        isMatched:false,
        detect_matched: action.data
      });
      break;
  case ActionTypes.ORAGANIZATION:
    return state.merge({
      oraganization: action.data
    });
    break;
  case ActionTypes.GET_COMMENT_SUCCESS:
    return state.merge({
      isComment:true,
      get_comment: action.data
    });
    break;
  case ActionTypes.GET_COMMENT_FAILED:
    return state.merge({
      isComment:false,
      get_comment: action.data
    });
    break;
  case ActionTypes.DETECT_COMMENT:
    return state.merge({
      detect_comment: action.data
    });
    break;
case ActionTypes.LANGUAGES:
  return state.merge({
    languages: action.data
  });
  break;
case ActionTypes.STATES:
  return state.merge({
    states: action.data
  });
  break;
case ActionTypes.ALL_STATES:
  return state.merge({
    all_states: action.data
  });
  break;
case ActionTypes.ENROLL_ALL_STATES:
  return state.merge({
    enroll_state: action.data
  });
  break;
case ActionTypes.NATIONALITY:
  return state.merge({
    nationality: action.data
  });
  break;
case ActionTypes.RECURSE_HOME:
  return state.merge({
    home_recursive: action.data
  });
  break;
case ActionTypes.CCI:
  return state.merge({
    cci_data: action.data
  });
  break;
case ActionTypes.RECURSE_HOME_RESCUE:
  return state.merge({
    rescue_home: action.data
  });
  break;
case ActionTypes.CCI_RESCUE:
  return state.merge({
    rescue_cci: action.data
  });
  break;
case ActionTypes.RESCUE_DISTRICT:
  return state.merge({
    rescue_disreict: action.data
  });
  break;
case ActionTypes.FACEBOOK_DETECT_COMMENT:
  return state.merge({
    facebook_detect_comment: action.data
  });
  break;
case ActionTypes.IMAGE_DETAILS_SUCCESS:
  return state.merge({
    isImage:true,
    image_details: action.data
  });
  break;
case ActionTypes.IMAGE_DETAILS_FAILED:
  return state.merge({
    isImage:false,
    image_details: action.data
  });
  break;
case ActionTypes.SET_PERSON_ID:
  return state.merge({
    person_id: action.person_id
  });
  break;
    case ActionTypes.DISTRICT_ID_BASED_SUBDIVISION:
      return state.merge({
        divisions: action.data
      });
      break;
    case ActionTypes.SUBDIVSION_ID_BASED_CIRCLE:
      return state.merge({
        circle: action.data
      });
      break;
    case ActionTypes.CIRCLE_ID_BASED_POLICE:
      return state.merge({
        police: action.data
      });
      break;
    case ActionTypes.DISTRICT_ID_BASED_POLICE_STATION:
      return state.merge({
        district_id_based_police_responce: action.data
      });
      break;
  case ActionTypes.DISTRICT_ID_BASED_RECURSIVE_POLICE_STATION:
    return state.merge({
      rescue_police: action.data
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
    case ActionTypes.GET_ALL_DISTRICT:
      return state.merge({
        getAllDistrict: action.getAllDistrict
      });
      break;
    case ActionTypes.SET_EMPTY:
     return state.merge({
       isEdited:false,
       isMatched:false,
       isPersonDelete:false,
       detect_matched:null,

     });
     break;
  case ActionTypes.IMAGE_DELETE:
    return state.merge({
      img_delete: action.data
    });
    break;
  case ActionTypes.PERSON_DELETE_FAILED:
    return state.merge({
      isPersonDelete:false,
      person_delete: action.data
    });
    break;
  case ActionTypes.PERSON_DELETE_SUCCESS:
    return state.merge({
        isPersonDelete:true,
      person_delete: action.data
    });
    break;
    default:
      return state;
    }
  }

  export function getIdBasedDistrictResponce(globalState) {
      debugger;
      return globalState.dropdown.id_based_district_response;
  }
  export function getOraganizationResponce(globalState) {
      debugger;
      return globalState.dropdown.oraganization;
  }

  export function isImage(globalState) {
      debugger;
      return globalState.dropdown.isImage;
  }
  export function isComment(globalState) {
      debugger;
      return globalState.dropdown.isComment;
  }

  export function getCommentData(globalState) {
      debugger;
      return globalState.dropdown.get_comment;
  }

  export function getImageDetailsResponce(globalState) {
      debugger;
      return globalState.dropdown.image_details;
  }

export function getDetectCommentResponce(globalState) {
    debugger;
    return globalState.dropdown.detect_comment;
}
export function getFaceBookDetectCommentResponce(globalState) {
    debugger;
    return globalState.dropdown.facebook_detect_comment;
}
  export function getDistrictIdBasedPoliceResponce(globalState) {
      debugger;
      return globalState.dropdown.district_id_based_police_responce;
}
export function getDistrictIdBasedRescuePoliceResponce(globalState) {
    debugger;
    return globalState.dropdown.rescue_police;
}

export function getEditPersonResponce(globalState) {
    debugger;
    return globalState.dropdown.edit_person;
}
export function getRescueDitrictResponce(globalState) {
    debugger;
    return globalState.dropdown.rescue_disreict;
}
export function isEdited(globalState) {
    debugger;
    return globalState.dropdown.isEdited;
}
export function getEnrollState(globalState) {
    debugger;
    return globalState.dropdown.enroll_state;
}

export function getNationality(globalState) {
    debugger;
    return globalState.dropdown.nationality;
}
export function getUpdateResponce(globalState) {
    debugger;
    return globalState.dropdown.updateResponse;
}

export function getDetectMathcedResponce(globalState) {
    debugger;
    return globalState.dropdown.detect_matched;
}
export function isMatched(globalState) {
    debugger;
    return globalState.dropdown.isMatched;
}
export function isUpdatedin(globalState) {
    debugger;
    return globalState.dropdown.isUpdatedin;
}

export function getAllDistrictResponse(globalState) {
    debugger;
    return globalState.dropdown.getAllDistrict;
}

export function getDivisionResponse(globalState) {
    debugger;
    return globalState.dropdown.divisions;
}

export function getAllLanguages(globalState) {
    debugger;
    return globalState.dropdown.languages;
}
export function getAllStates(globalState) {
    debugger;
    return globalState.dropdown.states;
}
export function getHomeRecursive(globalState) {
    debugger;
    return globalState.dropdown.home_recursive;
}
export function getCCI(globalState) {
    debugger;
    return globalState.dropdown.cci_data;
}

export function getRecueHome(globalState) {
    debugger;
    return globalState.dropdown.rescue_home;
}
export function getRescueCCI(globalState) {
    debugger;
    return globalState.dropdown.rescue_cci;
}
export function getStates(globalState) {
    debugger;
    return globalState.dropdown.all_states;
}

export function getCircleResponse(globalState) {
    debugger;
    return globalState.dropdown.circle;
}

export function getPoliceResponse(globalState) {
    debugger;
    return globalState.dropdown.police;
}

export function getPersonIdResponse(globalState) {
  debugger;
  return globalState.dropdown.person_id;
}


export function getDeleteResponse(globalState) {
    debugger;
    return globalState.dropdown.img_delete;
}

export function getPersonDeleteResponse(globalState) {
    debugger;
    return globalState.dropdown.person_delete;
}
export function isPersonDelete(globalState) {
    debugger;
    return globalState.dropdown.isPersonDelete;
}
