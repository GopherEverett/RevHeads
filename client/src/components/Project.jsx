import React, { Component } from 'react'
import axios from 'axios'
import { Button, Card, CardTitle, CardImg, CardText, CardBody, Col } from 'reactstrap'
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
      const projectRes = await axios.get(`/api/v1/projects/${projectId}/`)
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
      await axios.delete(`/api/v1/projects/${this.props.match.params.id}/`)
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
      <div style={{ fontFamily: "Prompt" }}>
        <br />
        {this.state.isEditFormShow ?
          <EditProjectForm
            project={this.state.project}
            handleChange={this.handleChange}
            editProject={this.editProject}
            fetchProject={this.fetchProject} />
          :
          <div>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Card style={{ backgroundColor: "rgba(242, 244, 247, .7)" }}>
                <CardBody>
                  <CardTitle tag="h2">{this.state.project.title}</CardTitle>
                  <CardImg src={this.state.project.photo_url} alt='' />
                  <CardText tag="h3">Date Started: {this.state.project.date_begin}</CardText>
                  <CardText tag="h3">Date Complete: {this.state.project.date_end}</CardText>
                  <CardText tag="h3">About: {this.state.project.details}</CardText>
                  <br />
                  <Button color="danger" onClick={this.handleDelete}>{`Delete ${this.state.project.title}`}</Button>
                  <Button className="float-right" color='warning' onClick={this.toggleEditForm}>{`Edit ${this.state.project.title}`}</Button>
                </CardBody>
              </Card>
            </Col>
          </div>
        }
      </div>
    )
  }
}
