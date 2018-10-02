import React, { createRef, Component } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import Modal from './EditarModalForm'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { toggleEditarModal } from '../../actions'

import { BUSCAR_PAGE } from '../Routes/constants'

import { withAuthorization } from '../HigherOrder'

import '../CadastrarPage/CadastrarPage.css';

class EditarPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hasLocation: false,
			latlng: {
				lat: -6.8873078,
				lng: -38.5627987,
			}
		}

		this.handleShow = this.handleShow.bind(this);
	}

	componentWillMount() {
		let latlng = this.props.evento.local.replace("(", "").replace(")", "").split(",")
		console.log(latlng)
		if (latlng[0]) {
			this.setState({
				hasLocation: true,
				latlng: latlng,
			})
		} else {
			this.props.history.push(BUSCAR_PAGE)
		}

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
		this.props.toggleEditarModal()
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
				<Modal latlng={this.state.latlng} />
			</Marker>
		) : null

		return (
			<div>
				<h1>Editar Evento</h1>
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

const mapStateToProps = state => ({ evento: state.evento })

const mapDispatchToProps = dispatch => bindActionCreators({ toggleEditarModal }, dispatch)

export default withAuthorization(connect(mapStateToProps, mapDispatchToProps)(EditarPage))