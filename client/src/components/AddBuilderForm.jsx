import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'

export default class AddBuilderForm extends React.Component {

state = {
    newBuilder:{
        name: '',
        location: ''
    }
}

handleChange = (evt) => {
    const copyNewBuilder = { ...this.state.newBuilder }
    copyNewBuilder[evt.target.name] = evt.target.value
    this.setState({ newBuilder: copyNewBuilder })
}

    render() {
        return (
            <Form inline>
                <FormGroup>
                    <Label for="name" hidden>Name</Label>
                    <Input type="text" name="name" id="name" placeholder="Name" />
                </FormGroup>
                {' '}
                <FormGroup>
                    <Label for="location" hidden>Location</Label>
                    <Input type="text" name="location" id="location" placeholder="Location" />
                </FormGroup>
                {' '}
                <Button>Submit</Button>
            </Form>
        );
    }
}