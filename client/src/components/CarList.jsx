import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card, CardBody, Col } from 'reactstrap'

export default class CarList extends Component {

    state = {
        error: '',
        cars: []
    }

    sortVoteOrder() {
        this.state.cars.map((eachCar) => {
            let holder = []
            holder.push(eachCar.votes)
            return holder
        }).then((holder) => {
            holder.sort(function(a, b){return a - b})
            return holder
        }).then((holder) => {
            holder.map((votes) => {

            })
        })
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
            <Col sm="12" md={{ size: 6, offset: 3 }} style={{ fontFamily: "Prompt" }}>
                <h2>Cars</h2>
                {this.state.cars.map(car => (
                    <div>
                        <Card key={car.id} style={{ backgroundColor: "rgba(242, 244, 247, .7)" }}>
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