import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'

export default class AddBuilderForm extends React.Component {

    state = {
        newBuilder: {
            name: '',
            location: '',
            photo_url: ''
        }
    }

    handleChange = (evt) => {
        const copyNewBuilder = { ...this.state.newBuilder }
        copyNewBuilder[evt.target.name] = evt.target.value
        this.setState({ newBuilder: copyNewBuilder })
    }

    createBuilder = async (evt) => {
        evt.preventDefault()
        try {
            await axios.post('/api/v1/builders/', {
                name: this.state.newBuilder.name,
                location: this.state.newBuilder.location,
                photo_url: this.state.newBuilder.photo_url
            });
            this.props.toggleAddForm()
            this.props.fetch()
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <Form inline onSubmit={this.createBuilder} style={{ fontFamily: "Prompt" }}>
                <FormGroup>
                    <Label for="name" hidden>Name</Label>
                    <Input type="text" name="name" id="name" placeholder="Name" onChange={this.handleChange} />
                </FormGroup>
                {' '}
                <FormGroup>
                    <Label for="location" hidden>Location</Label>
                    <Input type="text" name="location" id="location" placeholder="Location" onChange={this.handleChange} />
                </FormGroup>
                {' '}
                <FormGroup>
                    <Label for="photo_url" hidden>Photo URL</Label>
                    <Input type="text" name="photo_url" id="photo_url" placeholder="Photo URL" onChange={this.handleChange} />
                </FormGroup>
                {' '}
                <Button>Submit</Button>
            </Form>
        );
    }
}