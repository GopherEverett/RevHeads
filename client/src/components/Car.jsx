import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { Button, Card, CardImg, CardText, CardTitle, CardBody, Col } from 'reactstrap'
import AddProjectForm from './AddProjectForm'

export default class Car extends Component {

    state = {
        car: {},
        projects: [],
        reDir: false,
        isAddFormDisp: false,
    }

    componentDidMount() {
        const carId = this.props.match.params.id;
        this.fetchCar(carId)
    }

    fetchCar = async (carId) => {
        try {
            const carRes = await axios.get(`/api/v1/cars/${carId}/`)
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

    handleVoteChangeUp = (evt) => {
        evt.preventDefault()
        let copyCar = { ...this.state.car }
        copyCar.votes += 1
        this.setState({ car: copyCar }, () => {
            this.updateVote()
        })
    }

    handleVoteChangeDown = (evt) => {
        evt.preventDefault()
        let copyCar = { ...this.state.car }
        copyCar.votes -= 1
        this.setState({ car: copyCar }, () => {
            this.updateVote()
        })
    }

    updateVote = async () => {
        try {
            await axios.put(`/api/v1/cars/${this.props.match.params.id}/`, this.state.car)
        }
        catch (err) {
            console.log(err)
        }
    }

    handleDelete = async () => {
        try {
            await axios.delete(`/api/v1/cars/${this.props.match.params.id}/`)
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
            <Col sm="12" md={{ size: 6, offset: 3 }} style={{ fontFamily: "Prompt" }}>
                <br />
                <Card style={{ backgroundColor: "rgba(242, 244, 247, .7)" }}>
                    <CardBody>
                        <CardImg top width="50%" src={this.state.car.photo_url} alt="" />
                        <CardTitle tag="h2">Name: {this.state.car.name}</CardTitle>
                        <CardText tag="h3">Make: {this.state.car.make}</CardText>
                        <CardText tag="h3">Model: {this.state.car.model}</CardText>
                        <CardText tag="h3">Year: {this.state.car.year}</CardText>
                        <CardText tag="h3">Votes: {this.state.car.votes}</CardText>
                        <Button onClick={this.handleVoteChangeUp}>⬆︎ vote</Button>
                        <Button onClick={this.handleVoteChangeDown}>⬇︎ vote</Button>
                        <h2>Projects: </h2>
                        {this.state.projects.map(project => (
                            <div key={project.id}>
                                <Link to={`/project/${project.id}/`} style={{ textDecoration: 'none', color: 'blue' }}><h4>{project.title}</h4></Link>
                            </div>
                        ))}
                        <br />
                <br/>
                <div>
                    {this.state.isAddFormDisp ?
                        <AddProjectForm toggleAddForm={this.toggleAddForm} carId={this.state.car.id} fetch={this.fetchCar} /> :
                        <Button color="success" onClick={this.toggleAddForm}>+ Project</Button>}
                        <Button className="float-right" color="danger" onClick={this.handleDelete}>{`Delete ${this.state.car.name}`}</Button>
                </div>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}
