import React from 'react'

import AuthUserContext from './AuthUserContext'
import { FirebaseAuth } from '../../firebase'

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props)

            this.state = {
                authUser: null
            }
        }

        componentDidMount() {
            FirebaseAuth.onAuthStateChanged(authUser => {
                authUser
                    ? this.setState({ authUser })
                    : this.setState({ authUser: null })
            })
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component />
                </AuthUserContext.Provider>
            )
        }
    }

    return WithAuthentication
}

export default withAuthentication

