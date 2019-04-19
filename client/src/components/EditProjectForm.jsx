import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';


export default class EditProjectForm extends Component {
    render() {
        return (
            <Col sm="12" md={{ size: 6, offset: 3 }} style={{ fontFamily: "Prompt" }}>
                <br />
                <Form onSubmit={this.props.editProject}>
                    <FormGroup>
                        <Label for="title" hidden>Title</Label>
                        <Input type="text" name="title" id="title" placeholder="Title" onChange={this.props.handleChange} value={this.props.project.title} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="date_begin" hidden>Date Started</Label>
                        <Input type="text" name="date_begin" id="date_begin" placeholder="Date Started" onChange={this.props.handleChange} value={this.props.project.date_begin} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="date_end" hidden>Date Finished</Label>
                        <Input type="text" name="date_end" id="model" placeholder="Date Finished" onChange={this.props.handleChange} value={this.props.project.date_end} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="details" hidden>Year</Label>
                        <Input type="textarea" name="details" id="details" placeholder="Details" onChange={this.props.handleChange} value={this.props.project.details} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="photo_url" hidden>Photo URL</Label>
                        <Input type="text" name="photo_url" id="photo_url" placeholder="Photo URL" onChange={this.props.handleChange} value={this.props.project.photo_url} />
                    </FormGroup>
                    {' '}
                    <Button>Edit</Button>
                </Form>
            </Col>
        )
    }
}
