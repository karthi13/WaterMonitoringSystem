import React, { Component, Fragment } from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import HeaderComponent  from '../../containers/DefaultLayout/HeaderComponent';
import BtnGroup  from '../../StateLessComponents/buttonGroup';
import Chart from '../chartComponents/realtimeLineChart';
import './navbar.css';


class NavbarComponent extends Component {

    constructor(){
        super();
        this.state = {
          chartData:{}
        }
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
                
                    <BtnGroup/>
                
                
                    <Chart chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>
                
            </div>
        );
    }
}

export default NavbarComponent;