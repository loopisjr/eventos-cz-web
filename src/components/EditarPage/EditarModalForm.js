import React, { Component } from 'react'
import { Button , Modal , Form , FormGroup , Col , FormControl, ControlLabel ,HelpBlock, Image} from 'react-bootstrap';

import '../LoginPage/Login.css'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { editarEvento , toggleEditarModal } from '../../actions'

import { withRouter } from 'react-router-dom'
import { BUSCAR_PAGE } from '../Routes/constants'

import { FirebaseDB , Storage } from '../../firebase'

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


class EditarModalForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        nome: '',
        data: '',
        hora: '',
        classificacao: '',
        foto: '',
        inteira: '',
        meia: '',
        hash: '',
        key: ''
      }
  
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleSubmitEx = this.handleSubmitEx.bind(this)
      }

      componentWillMount() {

        const self = this
        console.log(this.props.evento.hash)
        Storage.child('eventos/'+ this.props.evento.hash).getDownloadURL().then(function(url) {

          const foto = url


          self.setState({ 
            nome: self.props.evento.nome,
            data: self.props.evento.data,
            hora: self.props.evento.hora,
            classificacao: self.props.evento.classificacao,
            foto: foto,
            inteira: self.props.evento.preco.inteira,
            meia: self.props.evento.preco.meia,
            hash: self.props.evento.hash,
            key: self.props.evento.key
          })

        })

        console.log(this.state)
      }

      handleSubmit(e) {
        e.preventDefault();

        const { lat, lng } = this.props.latlng
        const {  
          nome,
          data,
          hora,
          classificacao,
          inteira,
          meia,
          hash
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

        this.props.editarEvento(evento, this.state.foto , this.state.key)
        this.props.toggleEditarModal()
        this.props.history.push(BUSCAR_PAGE)

      }

      handleSubmitEx(){

        let desertRef = Storage.child('eventos/' + this.state.hash);

        // Delete the file
        desertRef.delete()

        let databaseRef = FirebaseDB.ref().child('eventos/'+ this.state.key)

        databaseRef.remove()

        this.props.history.push(BUSCAR_PAGE)

      }
  
      render() {
        return (
          <div>   
            <Modal show={this.props.evento.showEditarModal} onHide={this.props.toggleEditarModal}>
              <Modal.Header closeButton>
                <Modal.Title>Editar Evento</Modal.Title>
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
                      <FormControl type="text" placeholder="00/00" required="true"
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
                        required="true" min="0" max="18"
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
                        required="true" min="0"
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
                        required="true" min="0"
                        onChange={(e) => this.setState({ meia: e.target.value  })}
                        value={this.state.meia} />
                    </Col>
                  </FormGroup>
                  <Image src={this.state.foto} responsive />
                  <FieldGroup
                    id="formControlsFile"
                    type="file"
                    label="File"
                    onChange={(e) => this.setState({ foto: e.target.files[0] })}
                  />
                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <div className='col-align'>
                        <Button type="submit" className='button-color'>Salvar</Button>
                        <Button type="button" className='button-color' onClick={() => this.handleSubmitEx()}>Excluir</Button>
                      </div>
                    </Col>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.toggleEditarModal}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
}

const MapStateToProps = state => ({ evento: state.evento })

const MapDispatchToProps = dispatch => bindActionCreators({ editarEvento, toggleEditarModal }, dispatch)

export default connect(MapStateToProps, MapDispatchToProps)(withRouter(EditarModalForm))