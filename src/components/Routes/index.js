import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import * as routes from './constants'
import NavBar from '../NavBar';
import BuscarPage from '../BuscarPage';
import CadastrarPage from '../CadastrarPage';
import EditarPage from '../EditarPage';
import LoginPage from '../LoginPage';

import { withAuthentication } from '../HigherOrder'

class Routes extends Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar />

                    <Route 
                        exact path={routes.LOGIN_PAGE}
                        component={LoginPage} 
                    />

                    <Route 
                        exact path={routes.BUSCAR_PAGE}
                        component={BuscarPage} 
                    />
        
                    <Route 
                        exact path={routes.CADASTRAR_PAGE}
                        component={CadastrarPage} 
                    />
        
                    <Route 
                        exact path={routes.EDITAR_PAGE}
                        component={EditarPage} 
                    />
                </div>
            </Router>
        )
    }
}

export default withAuthentication(Routes) 