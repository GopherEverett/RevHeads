import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'

export default class Car extends Component {

    state = {
        car: {},
        projects: [],
        reDir: false
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

    handleDelete = async () => {
        try {
            await axios.delete(`/api/v1/cars/${this.props.match.params.id}`)
            this.setState({
                reDir: true
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        if (this.state.reDir === true) {
            return <Redirect to='/builders/' />
        }
        return (
            <div>
                <img src={this.state.car.photo_url} alt="" />
                <h1>Name: {this.state.car.name}</h1>
                <h2>Make: {this.state.car.make}</h2>
                <h2>Model: {this.state.car.model}</h2>
                <h2>Year: {this.state.car.year}</h2>
                <Button color="danger" onClick={this.handleDelete}>{`Delete ${this.state.car.name}`}</Button>
                <h2>Projects: </h2>
                {this.state.projects.map(project => (
                    <div key={project.id}>
                        <Link to={`/project/${project.id}`}><h4>{project.title}</h4></Link>
                    </div>
                ))}
            </div>
        )
    }
}
