import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'

export default class AddCarForm extends Component {

state = {
    newCar:{
        name: '',
        make: '',
        model: '',
        year: '',
        photo_url: '',
        builder: this.props.builderId
    }
}

handleChange = (evt) => {
    const copyNewCar = { ...this.state.newCar }
    copyNewCar[evt.target.name] = evt.target.value
    this.setState({ newCar: copyNewCar })
}

createCar = async (evt) => {
    evt.preventDefault()
    try {
        await axios.post('/api/v1/cars/', {
            name: this.state.newCar.name,
            make: this.state.newCar.make,
            model: this.state.newCar.model,
            year: this.state.newCar.year,
            photo_url: this.state.newCar.photo_url,
            builder: this.state.newCar.builder
        });
        this.props.toggleAddForm()
        const builderId = this.props.builderId;
        this.props.fetch(builderId)
    }
    catch (err) {
        console.log(err)
    }
}

    render() {
        return (
            <div>
                <Form inline onSubmit={this.createCar}>
                    <FormGroup>
                        <Label for="name" hidden>Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Name" onChange={this.handleChange} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="make" hidden>Make</Label>
                        <Input type="text" name="make" id="make" placeholder="Make" onChange={this.handleChange} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="model" hidden>Model</Label>
                        <Input type="text" name="model" id="model" placeholder="Model" onChange={this.handleChange} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="year" hidden>Year</Label>
                        <Input type="text" name="year" id="year" placeholder="Year" onChange={this.handleChange} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="photo_url" hidden>Photo URL</Label>
                        <Input type="text" name="photo_url" id="photo_url" placeholder="Photo URL" onChange={this.handleChange} />
                    </FormGroup>
                    {' '}
                    <Button>Submit</Button>
                </Form>
            </div>
        )
    }
}
