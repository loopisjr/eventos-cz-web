import React, { createRef, Component } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import CadastrarModalForm from './CadastrarModalForm'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleCadastrarModal } from '../../actions'

import { withAuthorization } from '../HigherOrder'

import './CadastrarPage.css';

class CadastrarPage extends Component {
	constructor() {
		super()

		this.state = {
			hasLocation: false,
			latlng: {
				lat: -6.8873078,
				lng: -38.5627987,
			}
		}

		this.handleShow = this.handleShow.bind(this);
	}

	handleShow() {
		this.setState({ show: true });
	}

	mapRef = createRef()

	handleClick = (e) => {
		this.setState({
			hasLocation: true,
			latlng: e.latlng
		})

		this.props.toggleCadastrarModal()
	}

	handleLocationFound = e => {
		this.setState({
			hasLocation: true,
			latlng: e.latlng,
		})
	}

	render() {
		const marker = this.state.hasLocation ? (
			<Marker position={this.state.latlng}>
				<CadastrarModalForm latlng={this.state.latlng} />
			</Marker>
		) : null

		return (
			<div>
				<h1>Cadastrar Evento</h1>
				<Map
					center={this.state.latlng}
					length={4}
					onClick={this.handleClick}
					onLocationfound={this.handleLocationFound}
					ref={this.mapRef}
					zoom={15}>
					<TileLayer
						attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					{marker}
				</Map>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ toggleCadastrarModal }, dispatch)

export default withAuthorization(connect(null, mapDispatchToProps)(CadastrarPage))