import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import AuthUserContext from '../HigherOrder/AuthUserContext';
import { FirebaseAuth } from '../../firebase'

import swal from 'sweetalert';

import './NavBar.css'

const NavBar = ({ authUser }) => (
    <div>
        <Navbar className='center-navbar'>
            <div className='navbar-brand grid-item-header'>
                EventosCZ
            </div>
            <div className='nav-color'>
                <AuthUserContext.Consumer>
                    {authUser =>
                        authUser && <Nav pullRight>
                        <NavItem eventKey={1} href="/buscar">
                            Buscar
                        </NavItem>
                        <NavItem eventKey={2} href="/cadastrar">
                            Cadastrar
                        </NavItem>
                        <NavItem eventKey={3} onClick={() => {
                            FirebaseAuth.signOut().then(function() {
                                // Sign-out successful.
                                swal("Sair", "feito com sucesso!", "success");
                            }).catch(function(error) {
                                // An error happened.
                                swal("Sair","ERRO ao sair!", "error");
                            });
                        }}>
                            Sair
                        </NavItem>
                    </Nav>}
                </AuthUserContext.Consumer>
            </div>
        </Navbar>
    </div>
)


export default NavBar
