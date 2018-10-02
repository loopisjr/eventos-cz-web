import { LISTAR_EVENTOS, EDITAR_LISTA_2 , TOGGLE_CADASTRAR_MODAL } from '../actions/types'

const INITIAL_STATE = {
    lista: {},
    lista2: {},
    showCadastrarModal: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LISTAR_EVENTOS:
            return { ...state, lista: action.payload, lista2: action.payload }

        case EDITAR_LISTA_2:
            return { ...state, lista2: action.payload }

        case TOGGLE_CADASTRAR_MODAL:
            return { ...state, showCadastrarModal: !state.showCadastrarModal }

        default:
            return state
    }
}