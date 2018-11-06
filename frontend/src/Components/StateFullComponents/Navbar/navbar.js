import React, { Component, Fragment } from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import HeaderComponent from '../../containers/DefaultLayout/HeaderComponent';
import ButtonGroupComponent from '../../StateFullComponents/ButtonGroup/buttonGroupComponent';
import Chart from '../chartComponents/realtimeLineChart';
import { toast, ToastContainer } from 'react-toastify';
import { Button, ButtonGroup } from 'reactstrap';
import './navbar.css';


import axios from 'axios';


class NavbarComponent extends Component {

  constructor() {
    super();
    this.state = {
      chartData: {
        labels: ['Water limit Used', 'Water limit Left', 'Water limit exceeded'],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }]
      },
      barChartData: []
    };
    this.onButtonClickHandler = this.onButtonClickHandler.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.getChartDataMonth = this.getChartDataMonth.bind(this);
    this.getChartDataYear = this.getChartDataYear.bind(this);
    this.notify = this.notify.bind(this)

  }

  notify = (toToast) => {
    console.log("notification pressed");
    toast(toToast, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }


  getChartData = () => {
    //var HOSTNAME = 'cryptic-wildwood-24739.herokuapp.com';
    //var PORT = 4000;
    axios.get('/api/getUsageToday', {
      params: {
        user_id: this.props.location.state.userData.user_id
      }
    }).then((res) => {
      console.log(res)
      let pieData = [res.data.data.sum, res.data.data.water_remaining, res.data.data.water_exceeded]

      // res.data.data.sum === 85 || res.data.data.sum === 90 || 
      // res.data.data.sum === 95 || res.data.data.sum === 138
      if (res.data.data.sum >=45 ) {
        this.notify(`The water consumption has reached ${res.data.data.sum} liters `)
      }

      let doughnutData = {
        labels: ['Water limit Used', 'Water limit Left', 'Water limit exceeded'],
        datasets: [
          {
            data: pieData,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }]
      }

      let barChartData = [];
      let usageBYHour = [...res.data.data.usage_by_hour];
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < usageBYHour.length; j++) {
          if (i === usageBYHour[j].hour) {
            barChartData.push({
              x: i,
              y: usageBYHour[j].water_used
            });
          }
        }
        if (barChartData.length === i)
          barChartData.push({ x: i, y: 0 });
      }

      this.setState({
        chartData: doughnutData,
        barChartData
      })
    });
    this.notify();
  }

  getChartDataMonth = () => {
    //var HOSTNAME = 'cryptic-wildwood-24739.herokuapp.com';
    //var PORT = 4000;
    axios.get('/api/getUsageMonth', {
      params: {
        user_id: this.props.location.state.userData.user_id
      }
    }).then((res) => {
      console.log(res)
      let pieData = [res.data.data.monthData, res.data.data.water_remaining, res.data.data.water_exceeded]

      let doughnutData = {
        labels: ['Water limit Used', 'Water limit Left', 'Water limit exceeded'],
        datasets: [
          {
            data: pieData,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }]
      }

      let barChartData = [];
      let usageByDate = [...res.data.data.usage_by_date];
      for (let i = 0; i < 31; i++) {
        for (let j = 0; j < usageByDate.length; j++) {
          if ((i + 1) === usageByDate[j].DAY) {
            barChartData.push({
              x: usageByDate[j].DAY,
              y: usageByDate[j].water_used
            });
          }
        }
        if (barChartData.length === i)
          barChartData.push({ x: i + 1, y: 0 });
      }

      this.setState({
        chartData: doughnutData,
        barChartData
      })
    });
  }

  getChartDataYear = () => {

    // var HOSTNAME = 'cryptic-wildwood-24739.herokuapp.com';
    // var PORT = 4000;
    console.log("Year called");
    axios.get('/api/getUsageYear', {
      params: {
        user_id: this.props.location.state.userData.user_id
      }
    }).then((res) => {
      console.log(res)
      let pieData = [res.data.data.monthData, res.data.data.water_remaining, res.data.data.water_exceeded]

      let doughnutData = {
        labels: ['Water limit Used', 'Water limit Left', 'Water limit exceeded'],
        datasets: [
          {
            data: pieData,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }]
      }

      let barChartData = [];
      let usageByDate = [...res.data.data.usage_by_date];
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < usageByDate.length; j++) {
          if ((i + 1) === usageByDate[j].MONTH) {
            barChartData.push({
              x: usageByDate[j].MONTH,
              y: usageByDate[j].water_used
            });
          }
        }
        if (barChartData.length === i)
          barChartData.push({ x: i + 1, y: 0 });
      }

      this.setState({
        chartData: doughnutData,
        barChartData
      })
    });
  }

  onButtonClickHandler = (event, queryString) => {
    event.preventDefault();
    console.log(queryString);
  }

  componentWillMount() {
    this.getChartData();
  }

  componentDidMount() {

    setInterval(() => {

      let randomWaterStore = Math.floor(Math.random() * Math.floor(2));

      if (randomWaterStore === 1) {
        let data = {
          user_id: this.props.location.state.userData.user_id,
          water_used: Math.random().toFixed(4)
        }
        //var HOSTNAME = 'cryptic-wildwood-24739.herokuapp.com';
        //var PORT = 4000;
        axios.post('/api/storeWaterUsed', data)
          .then((res) => console.log(res));

        this.getChartData();
      }

    }, 30000);
  }

  render() {
    return (
      <div className="max-width" >
        <HeaderComponent />
        <ButtonGroup>
          <Button active onClick={e => this.getChartData()}>Day</Button>
          <Button active onClick={e => this.getChartDataMonth()}>Month</Button>
          <Button active onClick={e => this.getChartDataYear()}>Year</Button>
        </ButtonGroup>
        <Chart chartData={this.state} />
        <ToastContainer />
      </div>
    );
  }
}

export default NavbarComponent;