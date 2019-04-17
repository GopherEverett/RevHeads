import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'


export default class AddProjectForm extends Component {

    state = {
        newProject:{
            title: '',
            date_begin: '',
            date_end: '',
            details: '',
            photo_url: '',
            car: this.props.carId
        }
    }
    
    handleChange = (evt) => {
        const copyNewProject = { ...this.state.newProject }
        copyNewProject[evt.target.name] = evt.target.value
        this.setState({ newProject: copyNewProject })
    }

    createProject = async (evt) => {
        evt.preventDefault()
        try {
            await axios.post('/api/v1/projects/', {
                title: this.state.newProject.title,
                date_begin: this.state.newProject.date_begin,
                date_end: this.state.newProject.date_end,
                details: this.state.newProject.details,
                photo_url: this.state.newProject.photo_url,
                car: this.state.newProject.car
            });
            this.props.toggleAddForm()
            const carId = this.props.carId;
            this.props.fetch(carId)
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.createProject}>
                    <FormGroup>
                        <Label for="title" hidden>Title</Label>
                        <Input type="text" name="title" id="title" placeholder="Title" onChange={this.handleChange} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="date_begin" hidden>Date Started</Label>
                        <Input type="text" name="date_begin" id="date_begin" placeholder="Date Started" onChange={this.handleChange} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="date_end" hidden>Date Finished</Label>
                        <Input type="text" name="date_end" id="model" placeholder="Date Finished" onChange={this.handleChange} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="details" hidden>Year</Label>
                        <Input type="textarea" name="details" id="details" placeholder="Details" onChange={this.handleChange} />
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
