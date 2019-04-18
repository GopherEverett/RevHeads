import React, { Component } from 'react'
import axios from 'axios'
import { Form, Input, Label, FormGroup, Button, Card, CardBody, CardText, Col } from 'reactstrap'


const VINAUDIT_KEY = process.env.REACT_APP_VINAUDIT_KEY

export default class VinLookup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            stuff: {},
            moreStuff: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitData = this.handleSubmitData.bind(this);
    }

    handleChange(evt) {
        this.setState({ value: evt.target.value });
    }

    handleSubmit(evt) {
        console.log('bang')
        evt.preventDefault()
        axios.get(`https://marketvalue.vinaudit.com/getmarketvalue.php?key=${VINAUDIT_KEY}&vin=${this.state.value}&format=json/`)
            .then(res => {
                this.setState({
                    stuff: res.data
                })
            }).then(() => {
                this.handleSubmitData()
            })
    }

    handleSubmitData() {
        // evt.preventDefault()
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${this.state.value}?format=json`)
            .then(res => {
                this.setState({
                    moreStuff: res.data.Results[0]
                })
            })
    }

    render() {
        return (
            <Col sm="12" md={{ size: 6, offset: 3 }}>
            <br/>
                <h2>Enter VIN</h2>
                <Form inline>
                    <FormGroup>
                        <Label for="vin" hidden>VIN</Label>
                        <Input type="text" name="vin" id="vin" placeholder="VIN" value={this.state.value} onChange={this.handleChange} />
                    </FormGroup>
                    <Button onClick={this.handleSubmit}>Get Info</Button>
                </Form>
                    <br/>
                <Card>
                    <CardBody>
                        <CardText tag='h2'>{this.state.stuff.vehicle}</CardText>
                        <CardText tag='h2'>Mileage: {this.state.stuff.mileage}</CardText>
                        <CardText tag='h2'>Average value: ${this.state.stuff.mean}</CardText>
                        <CardText tag='h2'>Engine Size: {this.state.moreStuff.DisplacementL}L</CardText>
                        <CardText tag='h2'>Engine HP: {this.state.moreStuff.EngineHP}</CardText>
                        <CardText tag='h2'>Made In: {this.state.moreStuff.PlantState} {this.state.moreStuff.PlantCountry}</CardText>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}