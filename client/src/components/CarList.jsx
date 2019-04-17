import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card } from 'reactstrap'

export default class CarList extends Component {

    state = {
        error: '',
        cars: []
    }

    componentDidMount() {
        this.fetchCars();
    }

    fetchCars = async () => {
        try {
            const res = await axios.get('/api/v1/cars');
            this.setState({ cars: res.data });
        }
        catch (err) {
            console.log(err)
            this.setState({ error: err.message })
        }
    }

    render() {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }
        return (
            <div>
            <h2>Cars</h2>
                {this.state.cars.map(car => (
                    <Card key={car.id}>
                        <Link to={`/car/${car.id}`} >{car.name}</Link>
                        <p>Votes: {car.votes}</p>
                    </Card>
                ))}
            </div>
        )
    }

}