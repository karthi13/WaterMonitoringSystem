import React, { Component, Fragment } from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import HeaderComponent  from '../../containers/DefaultLayout/HeaderComponent';
import ButtonGroupComponent  from '../../StateFullComponents/ButtonGroup/buttonGroupComponent';
import Chart from '../chartComponents/realtimeLineChart';
import './navbar.css';


import axios from 'axios';


class NavbarComponent extends Component {

    constructor(){
        super();
        this.state = {
          chartData: {
            labels: [ 'Water limit Used','Water limit Left','Water limit exceeded'],
            datasets: [
              {
                data: [0,0,0],
                backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
                hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
              }]
          },
          barChartData: []
        }
    }

    componentDidMount() {
      
      setInterval(() => { 

        let randomWaterStore = Math.floor(Math.random() * Math.floor(2));

        if(randomWaterStore === 1){
          let data = {
            user_id: this.props.location.state.userData.user_id,
            water_used : Math.random().toFixed(4)
          }
          axios.post('http://localhost:4000/api/storeWaterUsed', data)
          .then(( res )=> console.log( res ));

          axios.get('http://localhost:4000/api/getUsageToday', {
            params: {
              user_id: this.props.location.state.userData.user_id
            }
          }).then(( res )=> {
            console.log(res)
            let pieData = [ res.data.data.sum,  res.data.data.water_remaining, res.data.data.water_exceeded]

            let doughnutData = {
              labels: [ 'Water limit Used','Water limit Left','Water limit exceeded'],
              datasets: [
                {
                  data: pieData,
                  backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
                  hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
                }]
            }

            let barChartData = [];
            let usageBYHour = [...res.data.data.usage_by_hour];
            for (let i = 0; i < 24; i++) { 
              for (let j = 0; j < usageBYHour.length; j++){
                if( i === usageBYHour[j]){
                  barChartData.push({
                    x : i,
                    y : usageBYHour[j].water_used
                  });
                }
              }
              if( barChartData.length === i)
                barChartData.push({ x : i, y : 0});
            }

            this.setState({
              chartData : doughnutData,
              barChartData
            })
          });
        }

      }, 30000);
    }

    render() {
        return (
            <div className="max-width" >
                <HeaderComponent/>
                <ButtonGroupComponent/>
                <Chart chartData={this.state}/>  
            </div>
        );
    }
}

export default NavbarComponent;