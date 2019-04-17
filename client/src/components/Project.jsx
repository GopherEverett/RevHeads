import React, { Component } from 'react'
import axios from 'axios'
import { Button, Card, CardTitle, CardImg, CardText, CardBody } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import EditProjectForm from './EditProjectForm'

export default class Project extends Component {

  state = {
    project: {},
    reDir: false,
    isEditFormShow: false,
    updatedProject: {}
  }

  componentDidMount() {
    const projectId = this.props.match.params.id;
    this.fetchProject(projectId)
  }

  fetchProject = async (projectId) => {
    try {
      const projectRes = await axios.get(`/api/v1/projects/${projectId}`)
      this.setState({
        project: projectRes.data,
        isEditFormShow: false
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

  handleChange = (evt) => {
    const copyProject = { ...this.state.project }
    copyProject[evt.target.name] = evt.target.value
    this.setState({ project: copyProject })
  }

  editProject = async (evt) => {
    evt.preventDefault()
    try {
      await axios.put(`/api/v1/projects/${this.props.match.params.id}/`, {
        title: this.state.project.title,
        date_begin: this.state.project.date_begin,
        date_end: this.state.project.date_end,
        details: this.state.project.details,
        photo_url: this.state.project.photo_url,
        car: this.state.project.car
      })
      const projId = this.props.match.params.id
      this.fetchProject(projId)

    }
    catch (err) {
      console.log(err)
    }
  }

  toggleEditForm = () => {
    this.setState((state) => {
      return ({ isEditFormShow: !state.isEditFormShow })
    })
  }

  render() {
    if (this.state.reDir === true) {
      return <Redirect to='/cars/' />
    }
    return (
      <div>
        {this.state.isEditFormShow ?
          <EditProjectForm
            project={this.state.project}
            handleChange={this.handleChange}
            editProject={this.editProject}
            fetchProject={this.fetchProject} />
          :
          <div>
            <Card>
              <CardBody>
                <CardImg src={this.state.project.photo_url} alt='' />
                <CardTitle>{this.state.project.title}</CardTitle>
                <CardText>Date Started: {this.state.project.date_begin}</CardText>
                <CardText>Date Complete: {this.state.project.date_end}</CardText>
                <CardText>About... {this.state.project.details}</CardText>
              </CardBody>
            </Card>
            <Button color="danger" onClick={this.handleDelete}>{`Delete ${this.state.project.title}`}</Button>
            <Button color='warning' onClick={this.toggleEditForm}>{`Edit ${this.state.project.title}`}</Button>
          </div>
        }
      </div>
    )
  }
}
