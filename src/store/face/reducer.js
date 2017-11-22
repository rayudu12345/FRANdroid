import * as ActionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  galleryView: {},
  galleryViewSubject: {},
  enrollment:{},
  enrollmentSuccess:false,
  recognizeResponse:{},
  recognizeStatus:false,
  media:{}
});

export default function reduce(state = initialState, action = {}) {
  debugger;
  switch (action.type) {
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
    case ActionTypes.FACERECOGNITION_SUCCESS:
    debugger;
      return state.merge({
        recognizeResponse: action.data,
        recognizeStatus:true
      });
      break;
    case ActionTypes.FACERECOGNITION_FAILED:
    debugger;
      return state.merge({
        recognizeResponse: action.data,
        recognizeStatus:false
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

export function getGalleryView(globalState) {
  debugger;
  console.log(globalState);
  return globalState.face.galleryView.subject_ids || [];
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

export function getEnrollmentStatus(globalState) {
  debugger;
  return globalState.face.enrollmentSuccess === true;
}

export function getRecognizeResponse(globalState) {
  debugger;
  return globalState.face.recognizeResponse || {};
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
