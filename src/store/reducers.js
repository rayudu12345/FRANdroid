import { combineReducers } from 'redux';

import face from './face/reducer';
import dropdown from './dropdown/reducer';

export default combineReducers({
    face,
    dropdown
});
