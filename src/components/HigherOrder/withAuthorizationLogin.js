import React from 'react'
import { withRouter } from 'react-router-dom'

import { FirebaseAuth } from '../../firebase';

import { BUSCAR_PAGE } from '../Routes/constants';

const withAuthorizationLogin = (Component) => {
    class WithAuthorizationLogin extends React.Component {
        componentDidMount() {
            const authCondition = (authCondition) => !!authCondition

            FirebaseAuth.onAuthStateChanged(authUser => {
                if(authCondition(authUser)) {
                    this.props.history.push(BUSCAR_PAGE)
                }
            })
        }

        render() {
            return (
                <Component />
            )
        }
    }

    return withRouter(WithAuthorizationLogin)
}

export default withAuthorizationLogin