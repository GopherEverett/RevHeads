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

    sortVoteOrder=() =>{
        let holder = []
        let copyCars = [ ...this.state.cars ]
        console.log(copyCars)
        copyCars.map((oneCar) => {
            holder.push(oneCar.votes)
            console.log(holder)

        })
        // console.log(holder)
        holder.sort(function (a, b) { return b - a })
        // console.log(holder)
        let setToGoback = [];
        for (let i = 0; i < holder.length; i++) {
            for (let i2 = 0; i2 < copyCars.length; i2++) {
                console.log(copyCars)
                if (holder[i] === copyCars[i2].votes) {
                    setToGoback.push(copyCars[i2])
                    copyCars.splice(i2, 1)
                }
            }
        }
        console.log(setToGoback)
        this.setState({ cars: setToGoback })
    }
    // sortVoteOrder() {
    //     this.state.cars.map((eachCar) => {
    //         let holder = []
    //         holder.push(eachCar.votes)
    //         return holder
    //     }).then((holder) => {
    //         holder.sort(function(a, b){return a - b})
    //         return holder
    //     }).then((holder) => {
    //         holder.map((votes) => {

    //         })
    //     })
    // }

    componentDidMount() {
        this.fetchCars();
        this.sortVoteOrder();
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
                <button onClick={this.sortVoteOrder}> </button>
                <br />
                <h2 style={{ color: "white" }}>Cars</h2>
                {this.state.cars.map((car, i) => (
                    <div key={i}>
                        <Card style={{ backgroundColor: "rgba(242, 244, 247, .7)" }}>
                            <CardBody>
                                <Link to={`/car/${car.id}/`} style={{ textDecoration: 'none', color: 'blue' }}><h2>{car.name}</h2></Link>
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