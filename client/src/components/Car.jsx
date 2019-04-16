import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Car extends Component {

    state = {
        car: {},
        projects: []
    }

    componentDidMount() {
        const carId = this.props.match.params.id;
        this.fetchCar(carId)
    }

    fetchCar = async (carId) => {
        try {
            const carRes = await axios.get(`/api/v1/cars/${carId}`)
            this.setState({
                car: carRes.data,
                projects: carRes.data.projects
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
                <img src={this.state.car.photo_url} alt="" />
                <h1>{this.state.car.name}</h1>
                <h2>{this.state.car.make}</h2>
                <h2>{this.state.car.model}</h2>
                <h2>{this.state.car.year}</h2>
                {this.state.projects.map(project => (
                    <div key={project.id}>
                        <Link to={`/project/${project.id}`}><h4>{project.title}</h4></Link>
                    </div>
                ))}
            </div>
        )
    }
}
