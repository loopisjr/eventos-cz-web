import React from 'react'
import { withRouter } from 'react-router-dom'

import AuthUserContext from './AuthUserContext';
import { FirebaseAuth } from '../../firebase';

import { LOGIN_PAGE } from '../Routes/constants';

const withAuthorization = (Component) => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            const authCondition = (authCondition) => !!authCondition

            FirebaseAuth.onAuthStateChanged(authUser => {
                if(!authCondition(authUser)) {
                    this.props.history.push(LOGIN_PAGE)
                }
            })
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser => authUser ? <Component /> : null}
                </AuthUserContext.Consumer>
            )
        }
    }

    return withRouter(WithAuthorization)
}

export default withAuthorization