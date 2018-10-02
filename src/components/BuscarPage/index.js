import React, { Component } from 'react'
import BuscarForm from './BuscarForm' 
import BuscarList from './BuscarList' 

import { withAuthorization } from '../HigherOrder'

class BuscarPage extends Component {
    render() {
        return (
            <div>
                <BuscarForm/>
                <BuscarList/>
            </div>
        )
    }
}

export default withAuthorization(BuscarPage)
