import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AddBuilderForm from './AddBuilderForm'
import { Button, Card, Col } from 'reactstrap'

export default class extends Component {

    state = {
        error: '',
        builders: [],
        isAddFormDisp: false
    }

    toggleAddForm = () => {
        this.setState((state) => {
            return ({ isAddFormDisp: !state.isAddFormDisp })
        })
    }

    componentDidMount() {
        this.fetchBuilders();
    }

    fetchBuilders = async () => {
        try {
            const res = await axios.get('/api/v1/builders/');
            this.setState({ builders: res.data });
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
            <br/>
                <h2 style={{ color: 'white' }}>Builders</h2>
                {this.state.builders.map((builder, i) => (
                    <div key={i}>
                        <Card style={{ backgroundColor: "rgba(242, 244, 247, .75)" }}>
                            <Link to={`/builder/${builder.id}/`} style={{ textDecoration: 'none', color: 'blue' }}><h2>{builder.name}</h2></Link>
                            <h3>Cars: {builder.cars.length}</h3>
                        </Card>
                        <br/>
                    </div>
                ))}
                {this.state.isAddFormDisp ?
                    <AddBuilderForm toggleAddForm={this.toggleAddForm} fetch={this.fetchBuilders} />
                    :
                    <Button color="success" onClick={this.toggleAddForm}>+ Builder</Button>}
            </Col>
        )
    }

}