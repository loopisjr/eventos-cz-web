import React, { Component }  from 'react'
import { Row , Form , FormGroup , Col , FormControl , Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { editarLista } from '../../actions'

import './BuscarForm.css'

class BuscarForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nome: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    
    }

    handleSubmit(e){
        e.preventDefault();

        const { lista } = this.props

        const aux = {}

        if(!this.state.nome){
            this.props.editarLista(lista)
        }else {
            for (let array in lista) {
                if(lista[array].nome.indexOf(this.state.nome) !== -1){
                    aux[array] = lista[array]
                }
            }
            this.props.editarLista(aux)
        }
    }

    render() {
        return (
        <Row className='linha'>
            <Col sm={8} smOffset={2}>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="Nome do evento" 
                                onChange={(e) => this.setState({ nome: e.target.value })}
                                value={this.state.nome} />
                        </Col>
                    </FormGroup>{' '}
                    <Button type="submit" className='button-buscar'>Buscar</Button>
                </Form>
            </Col>
        </Row>
        )
    }
}

const mapStateToProps = state => ({ lista: state.eventos.lista })

const mapDispatchToProps = dispatch => bindActionCreators({ editarLista }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BuscarForm)