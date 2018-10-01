import _ from 'lodash';
import * as types from './actionTypes';
import {
  IdBasedDistrictAPI,
  DistrictIdbasedPoliceAPI,
  EditPersonAPI,
  UpdateEnrolAPI,
  GetAllDistrictAPI,
  PersonDeleteAPI,
  DistrictIdBasedSubDivisionAPI,
  SubDivisionIdBasedCircleAPI,
  CircleIdBasedPoliceAPI,
  ImageDeleteAPI,
  DetectCommentAPI,
  FaceBookDetectCommentAPI,
  ImageDetailsAPI,
  GetAllStatesAPI,
  GetRecursiveHomeAPI,
  GetStatesAPI,
  GetCCIAPI,
  ResucueDistrictAPI,
  GetAllLanguagesAPI,
  DetectMatchedAPI,
  GetCommentAPI,
  GetEnrollStateAPI,
  GetNationalityAPI,
  OraganizationAPI

} from '../../services/dropdown';

export function idbasedDistrict(options) {
  debugger;
  return dispatch => {
    IdBasedDistrictAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.USER_ID_BASED_DISTRICT,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.USER_ID_BASED_DISTRICT,
          data:json
        });
      }
    })
  }
}

export function oraganization(options) {
  debugger;
  return dispatch => {
    OraganizationAPI({
      params:options.params,
      errorMessage:'User id has been failed',
      success: function(json) {
        dispatch({
          type: types.ORAGANIZATION,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type: types.ORAGANIZATION,
          data:json
        });
      }
    })
  }
}

export function detectMatched(options) {
  debugger;
  return dispatch => {
    DetectMatchedAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.DETECT_MATCHED_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.DETECT_MATCHED_FAILED,
          data:json
        });
      }
    })
  }
}

export function getComment(options) {
  debugger;
  return dispatch => {
    GetCommentAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.GET_COMMENT_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.GET_COMMENT_FAILED,
          data:json
        });
      }
    })
  }
}

export function getAllLanguages(options) {
  debugger;
  return dispatch => {
    GetAllLanguagesAPI({
      params:options.params,
      errorMessage:'languages empty',
      success: function(json) {
        dispatch({
          type:types.LANGUAGES,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.LANGUAGES,
          data:json
        });
      }
    })
  }
}

export function getEnrollState(options) {
  debugger;
  return dispatch => {
    GetEnrollStateAPI({
      params:options.params,
      errorMessage:'languages empty',
      success: function(json) {
        dispatch({
          type:types.ENROLL_ALL_STATES,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.ENROLL_ALL_STATES,
          data:json
        });
      }
    })
  }
}

export function getNationality(options) {
  debugger;
  return dispatch => {
    GetNationalityAPI({
      params:options.params,
      errorMessage:'languages empty',
      success: function(json) {
        dispatch({
          type:types.NATIONALITY,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.NATIONALITY,
          data:json
        });
      }
    })
  }
}



export function getAllStates(options) {
  debugger;
  return dispatch => {
    GetAllStatesAPI({
      params:options.params,
      errorMessage:'languages empty',
      success: function(json) {
        dispatch({
          type:types.STATES,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.STATES,
          data:json
        });
      }
    })
  }
}

export function getRecursiveHome(options) {
  debugger;
  return dispatch => {
    GetRecursiveHomeAPI({
      params:options.params,
      errorMessage:'languages empty',
      success: function(json) {
        dispatch({
          type:types.RECURSE_HOME,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.RECURSE_HOME,
          data:json
        });
      }
    })
  }
}


export function getCCI(options) {
  debugger;
  return dispatch => {
    GetCCIAPI({
      params:options.params,
      errorMessage:'languages empty',
      success: function(json) {
        dispatch({
          type:types.CCI,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.CCI,
          data:json
        });
      }
    })
  }
}


export function setCaseId(data = {}) {
   return {
      type: types.SET_CRIME_STATE,
      data: data
   };
}

export function getRecueHome(options) {
  debugger;
  return dispatch => {
    GetRecursiveHomeAPI({
      params:options.params,
      errorMessage:'languages empty',
      success: function(json) {
        dispatch({
          type:types.RECURSE_HOME_RESCUE,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.RECURSE_HOME_RESCUE,
          data:json
        });
      }
    })
  }
}


export function getRescueCCI(options) {
  debugger;
  return dispatch => {
    GetCCIAPI({
      params:options.params,
      errorMessage:'languages empty',
      success: function(json) {
        dispatch({
          type:types.CCI_RESCUE,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.CCI_RESCUE,
          data:json
        });
      }
    })
  }
}

export function getStates(options) {
  debugger;
  return dispatch => {
    GetStatesAPI({
      params:options.params,
      errorMessage:'languages empty',
      success: function(json) {
        dispatch({
          type:types.ALL_STATES,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.ALL_STATES,
          data:json
        });
      }
    })
  }
}

export function setPersonId(person_id = {}) {
   return {
      type: types.SET_PERSON_ID,
      person_id: person_id
   };
}

export function detectComment(options) {
  debugger;
  return dispatch => {
    DetectCommentAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.DETECT_COMMENT,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.DETECT_COMMENT,
          data:json
        });
      }
    })
  }
}

export function faceBookDetectComment(options) {
  debugger;
  return dispatch => {
    FaceBookDetectCommentAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.FACEBOOK_DETECT_COMMENT,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.FACEBOOK_DETECT_COMMENT,
          data:json
        });
      }
    })
  }
}

export function imageDetails(options) {
  debugger;
  return dispatch => {
    ImageDetailsAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.IMAGE_DETAILS_SUCCESS,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.IMAGE_DETAILS_FAILED,
          data:json
        });
      }
    })
  }
}

export function districtIdBasedSubDivision(options) {
  debugger;
  return dispatch => {
    DistrictIdBasedSubDivisionAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.DISTRICT_ID_BASED_SUBDIVISION,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.DISTRICT_ID_BASED_SUBDIVISION,
          data:json
        });
      }
    })
  }
}


export function subDivisionIdBasedCircle(options) {
  debugger;
  return dispatch => {
    SubDivisionIdBasedCircleAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.SUBDIVSION_ID_BASED_CIRCLE,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.SUBDIVSION_ID_BASED_CIRCLE,
          data:json
        });
      }
    })
  }
}

export function circleIdBasedPolice(options) {
  debugger;
  return dispatch => {
    CircleIdBasedPoliceAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.CIRCLE_ID_BASED_POLICE,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.CIRCLE_ID_BASED_POLICE,
          data:json
        });
      }
    })
  }
}



export function districtIdbasedPolice(options) {
  debugger;
  return dispatch => {
    DistrictIdbasedPoliceAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.DISTRICT_ID_BASED_POLICE_STATION,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.DISTRICT_ID_BASED_POLICE_STATION,
          data:json
        });
      }
    })
  }
}


export function districtIdbasedRecursivePolice(options) {
  debugger;
  return dispatch => {
    DistrictIdbasedPoliceAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.DISTRICT_ID_BASED_RECURSIVE_POLICE_STATION,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.DISTRICT_ID_BASED_RECURSIVE_POLICE_STATION,
          data:json
        });
      }
    })
  }
}


export function resucueDistrict(options) {
  debugger;
  return dispatch => {
    ResucueDistrictAPI({
      params:options.params,
      errorMessage:'phone does not exist',
      success: function(json) {
        dispatch({
          type:types.RESCUE_DISTRICT,
          data:json
        });
      },
      error: function(json) {
        dispatch({
          type:types.RESCUE_DISTRICT,
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


export function setEmpty(data={}) {
  return {
    type: types.SET_EMPTY,
    data: {}

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

export function  getAllDistrict(options) {
  debugger;
  return dispatch => {
  GetAllDistrictAPI({
      params:options.params,
      errorMessage:'Phone number does not exist',
      success: function(json) {
        dispatch({
          type:types.GET_ALL_DISTRICT,
          getAllDistrict:json
        })
      },
      error: function(json) {
        dispatch({
          type:types.GET_ALL_DISTRICT,
          getAllDistrict:json
        });
      }
    })
  }
}

export function  imageDelete(options) {
  debugger;
  return dispatch => {
  ImageDeleteAPI({
      params:options.params,
      errorMessage:'Phone number does not exist',
      success: function(json) {
        dispatch({
          type:types.IMAGE_DELETE,
          data:json
        })
      },
      error: function(json) {
        dispatch({
          type:types.IMAGE_DELETE,
          data:json
        });
      }
    })
  }
}

export function  personDelete(options) {
  debugger;
  return dispatch => {
  PersonDeleteAPI({
      params:options.params,
      errorMessage:'Phone number does not exist',
      success: function(json) {
        dispatch({
          type:types.PERSON_DELETE_SUCCESS,
          data:json
        })
      },
      error: function(json) {
        dispatch({
          type:types.PERSON_DELETE_FAILED,
          data:json
        });
      }
    })
  }
}
