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
          chartData:{}
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
          }).then(( res )=> console.log( res ));
        }

      }, 30000);
    }

    componentWillMount(){
        this.getChartData();
    }
    
      getChartData(){
        // Ajax calls here
        this.setState({
          chartData:{
            labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
            datasets:[
              {
                label:'Population',
                data:[
                  617594,
                  181045,
                  153060,
                  106519,
                  105162,
                  95072
                ],
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ]
              }
            ]
          }
        });
      }

    render() {
        return (
            <div className="max-width" >
                <HeaderComponent/>
                <ButtonGroupComponent/>
                <Chart chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>
                
            </div>
        );
    }
}

export default NavbarComponent;