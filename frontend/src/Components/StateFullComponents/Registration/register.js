import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Input, Button, Card, CardBody } from 'mdbreact';
import './register.css';

export default class RegistrationPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "user",
      house_number: "",
      street: "",
      postcode: "",
      locality_id: "714fe24b-d253-4077-974a-7ee69da60018",
      municipalities: [],
      localities: []
    }

    this.onRegisterFormSubmit = this.onRegisterFormSubmit.bind(this);
  }

  componentDidMount(prevProps, prevState) {
    var HOSTNAME = 'localhost';
    var PORT = 4000;
    axios.get('http://' + HOSTNAME + ':' + PORT + '/api/getMunicipalites').then(response => {
      console.log(response);
      if (this.state.municipalities.length === 0) {
        let municipalities = response.data.municipalities.map(municipality => {
          return {
            id: municipality.uuid,
            municipality_name: municipality.municipality_name
          }
        })
        this.setState({
          municipalities: municipalities
        });
        console.log(this.state.municipalities);
      }

    });
    console.log(this.state.municipalities);
  }

  onRegisterFormSubmit = (event) => {
    event.preventDefault();
    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      role: 1,
      house_number: this.state.house_number,
      street: this.state.street,
      postcode: this.state.postcode,
      locality_id: "714fe24b-d253-4077-974a-7ee69da60018",
    }
    var HOSTNAME = 'localhost';
    var PORT = 4000;
    axios.post('http://' + HOSTNAME + ':' + PORT + '/api/registerUser', data)
      .then((response) => {

        if (response.status === 200) {
          this.props.history.push("/");
        }
        console.log(response);
      });
  }

  render() {
    return (
      <Container >
        <Row>
          <Col md="3"></Col>
          <Col md="6">
            <Card>
              <CardBody>
                <form>
                  <p className="h4 text-center py-4">Sign up</p>
                  <div className="grey-text">
                    <Input name="first_name"
                      value={this.state.first_name}
                      onChange={(e) => this.setState({
                        first_name: e.target.value
                      })}
                      label="First name"
                      icon="user"
                      group type="text"
                      validate error="wrong"
                      success="right" />
                    <Input name="last_name"
                      value={this.state.last_name}
                      onChange={(e) => this.setState({
                        last_name: e.target.value
                      })}
                      label="Last name"
                      icon="user"
                      group type="text"
                      validate error="wrong"
                      success="right" />
                    <Input name="email"
                      value={this.state.email}
                      onChange={(e) => this.setState({
                        email: e.target.value
                      })}
                      label="Email"
                      icon="envelope"
                      group type="email"
                      validate error="wrong"
                      success="right" />
                    <Input name="password"
                      value={this.state.password}
                      onChange={(e) => this.setState({
                        password: e.target.value
                      })}
                      label="Password"
                      icon="lock"
                      group type="password"
                      validate />
                    <Input name="phone_num"
                      label="Phone no"
                      icon="user"
                      group type="text"
                      validate error="wrong"
                      success="right" />
                    <Input name="house_number"
                      value={this.state.house_number}
                      onChange={(e) => this.setState({
                        house_number: e.target.value
                      })}
                      label="House number"
                      icon="envelope"
                      success="right" />
                    <Input name="street"
                      value={this.state.street}
                      onChange={(e) => this.setState({
                        street: e.target.value
                      })}
                      label="Street"
                      validate />
                    <Input name="postcode"
                      label="Postcode"
                      group type="text"
                      validate error="wrong"
                      success="right" />

                  </div>
                  <div className="text-center py-4 mt-3">
                    <Button onClick={(e) => this.onRegisterFormSubmit(e)} color="cyan" type="submit">Register</Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};
