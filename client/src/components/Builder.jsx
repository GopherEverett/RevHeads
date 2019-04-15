import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class Builder extends Component {

    state = {
        builder: {},
        cars: []
    }

    componentDidMount() {
        const builderId = this.props.match.params.id;
        this.fetchBuilder(builderId)
    }

    fetchBuilder = async (builderId) => {
        try {
            const builderRes = await axios.get(`/api/v1/builders/${builderId}`)
            this.setState({
                builder: builderRes.data,
                cars: builderRes.data.cars
            })
        }
        catch (err) {
            console.log(err)
            this.setState({ error: err.message })
        }
    }


    render() {
        return (
            <div>
                <img src={this.state.builder.photo_url} alt="" />
                <h1>{this.state.builder.name}</h1>
                <h2>{this.state.builder.location}</h2>
                {this.state.cars.map(car => (
                    <div key={car.id}>
                        <Link to={`/car/${car.id}`}><h4>{car.name}</h4></Link>
                    </div>
            ))}
            </div>
        )
    }
}
