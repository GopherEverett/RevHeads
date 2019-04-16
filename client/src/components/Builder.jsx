import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'reactstrap'
import AddCarForm from './AddCarForm'


export default class Builder extends Component {

    state = {
        builder: {},
        cars: [],
        reDir: false,
        isAddFormDisp: false
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

    handleDelete = async () => {
        try {
            await axios.delete(`/api/v1/builders/${this.props.match.params.id}`)
            this.setState({
                reDir: true
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    toggleAddForm = () => {
        this.setState((state) => {
            return ({ isAddFormDisp: !state.isAddFormDisp })
        })
    }


    render() {
        if (this.state.reDir === true) {
            return <Redirect to='/builders/' />
        }
        return (
            <div>
                <img src={this.state.builder.photo_url} alt="" />
                <h1>{this.state.builder.name}</h1>
                <h2>{this.state.builder.location}</h2>
                <Button color="danger" onClick={this.handleDelete}>{`Delete ${this.state.builder.name}`}</Button>
                <h3>{this.state.builder.name}'s Cars</h3>
                {this.state.cars.map(car => (
                    <div key={car.id}>
                        <Link to={`/car/${car.id}`}><h4>{car.name}</h4></Link>
                    </div>
                ))}
                { this.state.isAddFormDisp ? 
                <AddCarForm builderId={this.state.builder.id} toggleAddForm={this.toggleAddForm} />
                :
                <Button color="success" onClick={this.toggleAddForm}>+Car</Button> }
            </div>
        )
    }
}
