import React, { Component } from 'react'
import { Button, Modal, Form, FormGroup, Col, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { adicionarEvento, toggleCadastrarModal } from '../../actions'

import { withRouter } from 'react-router-dom'
import { BUSCAR_PAGE } from '../Routes/constants'
import '../LoginPage/Login.css'

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <Col sm={2}>
        <ControlLabel>{label}</ControlLabel>
      </Col>
      <Col sm={10}>
        <FormControl {...props} />
      </Col>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class CadastrarModalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      data: '',
      hora: '',
      classificacao: '',
      inteira: '',
      meia: '',
      foto: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();

    const uuidv1 = require('uuid/v1');

    const foto = this.state.foto

    const hash = uuidv1();
    
    const { lat, lng } = this.props.latlng
    const {  
      nome,
      data,
      hora,
      classificacao,
      inteira,
      meia,
    } = this.state

    const evento  = {
      nome,
      data,
      hora,
      local: `(${lat},${lng})`,
      classificacao,
      preco: {
        inteira,
        meia
      },
      hash
    }
    
    this.props.adicionarEvento(evento, foto)
    this.props.toggleCadastrarModal()
    this.props.history.push(BUSCAR_PAGE)
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showCadastrarModal} onHide={this.props.toggleCadastrarModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastrar Evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalNome">
                <Col componentClass={ControlLabel} sm={2}>
                  Nome
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Nome" required="true"
                    onChange={(e) => this.setState({ nome: e.target.value })}
                    value={this.state.nome} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalData">
                <Col componentClass={ControlLabel} sm={2}>
                  Data
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="00/00/0000" required="true"
                    onChange={(e) => this.setState({ data: e.target.value })}
                    value={this.state.data} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalHora">
                <Col componentClass={ControlLabel} sm={2}>
                  Hora
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="00:00" required="true"
                    onChange={(e) => this.setState({ hora: e.target.value })}
                    value={this.state.hora} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalClassificacao">
                <Col componentClass={ControlLabel} sm={2}>
                  Classificação
                </Col>
                <Col sm={10}>
                  <FormControl type="number" placeholder="Classificação"
                    required="true" min='0' max="18"
                    onChange={(e) => this.setState({ classificacao: e.target.value })}
                    value={this.state.classificacao} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalInteira">
                <Col componentClass={ControlLabel} sm={2}>
                  Preço de Inteira
                </Col>
                <Col sm={10}>
                  <FormControl type="number" placeholder="Preço de Inteira" 
                    required="true" min='0'
                    onChange={(e) => this.setState({ inteira: e.target.value })}
                    value={this.state.inteira} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalMeia">
                <Col componentClass={ControlLabel} sm={2}>
                  Preço da meia
                </Col>
                <Col sm={10}>
                  <FormControl type="number" placeholder="Preço da meia"
                    required="true" min='0'
                    onChange={(e) => this.setState({ meia: e.target.value })}
                    value={this.state.meia} />
                </Col>
              </FormGroup>
              <FieldGroup
                id="formControlsFile"
                type="file"
                label="File"
                required="true"
                onChange={(e) => this.setState({ foto: e.target.files[0] })}
              />
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <div className='col-align'>
                    <Button type="submit" className='button-color'>Salvar</Button>
                  </div>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.toggleCadastrarModal}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const MapStateToProps = state => ({ showCadastrarModal: state.eventos.showCadastrarModal })

const MapDispatchToProps = dispatch => bindActionCreators({ adicionarEvento, toggleCadastrarModal }, dispatch)

export default connect(MapStateToProps, MapDispatchToProps)(withRouter(CadastrarModalForm))