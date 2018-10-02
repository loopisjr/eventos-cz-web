import { SALVAR_EVENTO_EDITAR , TOGGLE_EDITAR_MODAL} from '../actions/types'

const INITIAL_STATE = {
    nome: '',
    data: '',
    hora: '',
    local: '',
    classificacao: '',
    preco: {
        inteira: '',
        meia: ''
    },
    hash: '',
    foto: '',
    key: '',
    showEditarModal: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case SALVAR_EVENTO_EDITAR:
            return { ...state,  ...action.payload }

        case TOGGLE_EDITAR_MODAL:
            return { ...state, showEditarModal: !state.showEditarModal }

        default:
            return state
    }
}