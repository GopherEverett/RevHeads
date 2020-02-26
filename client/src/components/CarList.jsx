import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card, CardBody, Col } from 'reactstrap'


export default class CarList extends Component {

    state = {
        error: '',
        firstCars: [],
        cars: []
    }

    sortVoteOrder = () => {
        let holder = []
        let copyCars = [...this.state.firstCars]
        copyCars.map((oneCar) => {
           return holder.push(oneCar.votes)
        })
        holder.sort(function (a, b) { return b - a })
        let setToGoback = [];
        for (let i = 0; i < holder.length; i++) {
            for (let i2 = 0; i2 < copyCars.length; i2++) {
                if (holder[i] === copyCars[i2].votes) {
                    setToGoback.push(copyCars[i2])
                    copyCars.splice(i2, 1)
                }
            }
        }
        this.setState({ cars: setToGoback })
    }

    componentDidMount() {
        this.fetchCars().then(() => {
            this.sortVoteOrder()
        })
    }

    fetchCars = async () => {
        try {
            const res = await axios.get('/api/v1/cars/');
            this.setState({ firstCars: res.data });
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
                <br />
                <h2 style={{ color: "white" }}>Cars</h2>
                {this.state.cars.map((car) => (
                    <div key={car.id}>
                        <Card style={{ backgroundColor: "rgba(242, 244, 247, .7)" }}>
                            <CardBody>
                                <Link
                                    to={`/cars/${car.id}/`}
                                    style={{ textDecoration: 'none', color: 'blue' }}><h2>{car.name}</h2></Link>
                                <h3>Votes: {car.votes}</h3>
                            </CardBody>
                        </Card>
                        <br />
                    </div>
                ))}
            </Col>
        )
    }

}