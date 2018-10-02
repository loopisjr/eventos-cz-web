import { eventosRef, Storage, FirebaseDB } from '../firebase'
import { LISTAR_EVENTOS, TOGGLE_CADASTRAR_MODAL, SALVAR_EVENTO_EDITAR, TOGGLE_EDITAR_MODAL, EDITAR_LISTA_2 } from './types';

export const adicionarEvento = (evento, foto) => {
    return async () => {
        eventosRef.push().set(evento)
        let Foto = Storage.child('eventos/' + evento.hash);
        Foto.put(foto)
    }
}

export const editarEvento = (evento, foto, key) => {
    return async () => {
        await FirebaseDB.ref('eventos').child(key).update(evento)

        //await Storage.child('eventos/' + evento.hash).delete()

        await Storage.child('eventos/' + evento.hash).put(foto)
    }
}

export const listarEventos = () => {
    return dispatch => {
        eventosRef.on('value', snapshot => {
            dispatch({
                type: LISTAR_EVENTOS,
                payload: snapshot.val()
            })
        })
    }
}

export const editarLista = (value) => {
    return {
        type: EDITAR_LISTA_2,
        payload: value
    }
}

export const salvarEvento = (value) => {
    return {
        type: SALVAR_EVENTO_EDITAR,
        payload: value
    }
}

export const toggleCadastrarModal = () => {
    return {
        type: TOGGLE_CADASTRAR_MODAL
    }
}

export const toggleEditarModal = () => {
    return {
        type: TOGGLE_EDITAR_MODAL
    }
}