import React, { Component, Fragment } from 'react';
import HeaderComponent  from '../../containers/DefaultLayout/HeaderComponent';

import axios from 'axios';


class PaymentComponent extends Component {

    constructor(){
        super();
        this.state = {}
      
    }

    componentWillMount(){
    //   this.getChartData();
    }

    componentDidMount() {
      
    }

    render() {
        return (
            <div className="max-width" >
                <HeaderComponent/>
                {/* <ButtonGroup>
                    <Button active onClick={e => this.getChartData()}>Day</Button>
                    <Button active onClick={e => this.getChartDataMonth()}>Month</Button>
                    <Button active onClick={e => this.getChartDataYear()}>Year</Button>
                </ButtonGroup>   */}
                <p>Payments component</p>
            </div>
        );
    }
}

export default PaymentComponent;