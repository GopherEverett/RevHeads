import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card, CardBody, Col } from 'reactstrap'

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
            const res = await axios.get('/api/v1/cars/');
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
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <h2>Cars</h2>
                {this.state.cars.map(car => (
                    <div>
                        <Card key={car.id}>
                            <CardBody>
                                <Link to={`/car/${car.id}/`} style={{ textDecoration: 'none', color: 'blue' }}><h2>{car.name}</h2></Link>
                                <h3>Votes: {car.votes}</h3>
                            </CardBody>
                        </Card>
                        <br/>
                    </div>
                ))}
            </Col>
        )
    }

}