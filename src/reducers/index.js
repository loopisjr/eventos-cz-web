import { combineReducers } from 'redux'

import eventos from './eventosReducer'
import evento from './eventoReducer'

export default combineReducers({
    eventos,
    evento
})