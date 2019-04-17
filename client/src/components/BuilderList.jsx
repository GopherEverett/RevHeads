import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AddBuilderForm from './AddBuilderForm'
import { Button, Card } from 'reactstrap'

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
            const res = await axios.get('/api/v1/builders');
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
            <div>
            <h2>Builders</h2>
                {this.state.builders.map(builder => (
                    <Card key={builder.id}>
                        <Link to={`/builder/${builder.id}`} >{builder.name}</Link>
                        <p>Cars: {builder.cars.length}</p>
                    </Card>
                ))}
                { this.state.isAddFormDisp ? 
                <AddBuilderForm toggleAddForm={this.toggleAddForm} fetch={this.fetchBuilders}/> 
                : 
                <Button color="success" onClick={this.toggleAddForm}>+ Builder</Button>  }
            </div>
        )
    }

}