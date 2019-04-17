import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'

export default class Project extends Component {

state = {
  project: {},
  reDir: false
}

  componentDidMount() {
    const projectId = this.props.match.params.id;
    this.fetchProject(projectId)
  }

  fetchProject = async (projectId) => {
    try {
      const projectRes = await axios.get(`/api/v1/projects/${projectId}`)
      this.setState({
        project: projectRes.data
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  handleDelete = async () => {
    try {
        await axios.delete(`/api/v1/projects/${this.props.match.params.id}`)
        this.setState({
            reDir: true
        })
    }
    catch (err) {
        console.log(err)
    }
}

  render() {
    return (
      <div>
      <img src={this.state.project.photo_url} alt=''/>
        <p>{this.state.project.title}</p>
        <p>Date Started: {this.state.project.date_begin}</p>
        <p>Date Complete: {this.state.project.date_end}</p>
        <p>About... {this.state.project.details}</p>
        <Button color="danger" onClick={this.handleDelete}>{`Delete ${this.state.project.title}`}</Button>
      </div>
    )
  }
}
