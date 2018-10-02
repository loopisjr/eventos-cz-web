import React, { Component } from 'react'
import { Form , FormGroup , Col , FormControl , Button , ControlLabel} from 'react-bootstrap';
import './Login.css'

import { FirebaseAuth } from '../../firebase'

import swal from 'sweetalert';

import { withRouter } from 'react-router-dom'
import { BUSCAR_PAGE } from '../Routes/constants'

class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            senha: ''
        }
    
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault();

        const self = this

        const email = this.state.email
        const password = this.state.senha

        FirebaseAuth.signInWithEmailAndPassword(email, password).then(function() {
            swal("Login", "feito com sucesso!", "success");
            self.props.history.push(BUSCAR_PAGE)
        }).catch(function(error) {
            console.log(error)
            swal("Login","Erro a Logar!", "error");
        })
    }

    render() {
        return (
            <div>
                <Col sm={6} smOffset={3}>
                    <div className='ajuste'></div>
                        <Form horizontal onSubmit={this.handleSubmit}>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={1}>
                                    Email
                                </Col>
                                <Col sm={11}>
                                    <FormControl type="email" placeholder="Email" required="true"
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                    value={this.state.email}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={1}>
                                    Senha
                                </Col>
                                <Col sm={11}>
                                    <FormControl type="password" placeholder="Senha" required="true"
                                    onChange={(e) => this.setState({ senha: e.target.value })}
                                    value={this.state.senha}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={12}>
                                    <div className='col-align'>
                                        <Button type="submit" className='button-color'>Sign in</Button>
                                    </div>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
            </div>
        )
    }
} 

export default withRouter(LoginPage)