import React, { Component } from 'react'
import axios from 'axios'
import { Form, Input, Label, FormGroup, Button, Card, CardBody, CardText } from 'reactstrap'


const VINAUDIT_KEY = process.env.REACT_APP_VINAUDIT_KEY

export default class VinLookup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            stuff: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({ value: evt.target.value });
    }

    handleSubmit(evt) {
        console.log('bang')
        evt.preventDefault()
        axios.get(`http://marketvalue.vinaudit.com/getmarketvalue.php?key=${VINAUDIT_KEY}&vin=${this.state.value}&format=json`)
            .then(res => {
                this.setState({
                    stuff: res.data
                })
            })
    }



    // async handleSubmit(evt) {
    //     evt.preventDefault();
    //     console.log(evt)
    //     try {
    //         const res = await axios.get(`https://specifications.vinaudit.com/v3/specifications?vin=${this.state.value}&key=R38ZUUYAU4S6FED&format=json`);
    //         this.setState({
    //             stuff: res.data
    //         })
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    render() {
        return (
            <div>
                <h2>Enter VIN to look up history</h2>
                <Form inline onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="vin" hidden>VIN</Label>
                        <Input type="text" name="vin" id="vin" placeholder="VIN" value={this.state.value} onChange={this.handleChange} />
                    </FormGroup>
                    {' '}
                    <Button type='submit'>Submit</Button>
                </Form>
                <Card>
                    <CardBody>
                        <CardText tag='h2'>Average value: ${this.state.stuff.mean}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}