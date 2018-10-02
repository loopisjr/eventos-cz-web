import React, { Component } from 'react'
import { Row , ListGroup , Col , Button} from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { listarEventos , salvarEvento} from '../../actions'
import _ from 'lodash'

import { FirebaseDB , Storage} from '../../firebase'
import { withRouter } from 'react-router-dom'
import { EDITAR_PAGE } from '../Routes/constants'

import './BuscarList.css'

class BuscarList extends Component {
    constructor(props) {
        super(props)
    
        this.handleSubmitEx = this.handleSubmitEx.bind(this)
        this.handleSubmitEd = this.handleSubmitEd.bind(this)
    }

    componentWillMount() {
        this.props.listarEventos()
    }

    handleSubmitEx(key , hash){

        let desertRef = Storage.child('eventos/' + hash);

        // Delete the file
        desertRef.delete()

        let databaseRef = FirebaseDB.ref().child('eventos/'+ key)

        databaseRef.remove()

    }

    handleSubmitEd(value, key){

        value.key = key

        this.props.salvarEvento(value)
        this.props.history.push(EDITAR_PAGE)
    }

    render() {
        const { lista } = this.props

        return (
            <Row className="linha">
                <Col sm={8} smOffset={2}>
                    <ListGroup componentClass="ul">
                        {_.map(lista, (value, key) => (
                            <Row key={key} className="linha-li">
                                <li className="list-group-item" onClick={() => {}}>
                                    <b>Nome: </b> {value.nome}
                                    <Button type="button" className='buttonEx' onClick={() => this.handleSubmitEx(key , value.hash)}>Excluir</Button>
                                    <Button type="button" className='buttonEd' onClick={() => this.handleSubmitEd(value , key)}>Editar</Button>
                                </li>
                            </Row>    
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => ({ lista: state.eventos.lista2 })

const mapDisptchToProps = dispatch => bindActionCreators({ listarEventos , salvarEvento }, dispatch)

export default connect(mapStateToProps, mapDisptchToProps)(withRouter(BuscarList))