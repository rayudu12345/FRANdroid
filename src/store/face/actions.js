import _ from 'lodash';
import * as types from './actionTypes';
import {
  EnrollmentAPI,
  LoadGalleryViewAPI,
  FaceRecognitionAPI,
  LoadGalleryViewSubjectAPI,

} from '../../services/face';

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


export function faceRecognition(options) {
  debugger;
  return dispatch => {
    FaceRecognitionAPI({
      params:options.params,
      errorMessage:'Subject not found',
      success: function(json) {
        dispatch({
          type:types.FACERECOGNITION_SUCCESS,
          data:json
        });
      },
      error: function(json) {
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
