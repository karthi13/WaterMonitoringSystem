import React, { Component, Fragment } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import './adminchartComponents.css';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

class AdminChart extends Component {
    constructor(props) {

        super(props);
        this.state = {
        }
    }

    render() {
        const data = [
            { x: 0, y: 8 },
            { x: 1, y: 5 },
            { x: 2, y: 4 },
            { x: 3, y: 9 },
            { x: 4, y: 1 },
            { x: 5, y: 7 },
            { x: 6, y: 6 },
            { x: 7, y: 3 },
            { x: 8, y: 2 },
            { x: 9, y: 0 },
            { x: 10, y: 8 },
            { x: 11, y: 5 },
            { x: 12, y: 4 },
            { x: 13, y: 9 },
            { x: 14, y: 1 },
            { x: 15, y: 7 },
            { x: 16, y: 6 },
            { x: 17, y: 3 },
            { x: 18, y: 2 },
            { x: 19, y: 5 },
            { x: 20, y: 6 }
        ];

        const doughnut = {
            labels: [
              'Red',
              'Green',
              'Yellow',
            ],
            datasets: [
              {
                data: [300, 50, 100],
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                ],
                hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                ],
              }
            ],
          };

        
        return (
            <div>
                <Row>
                    <Col xs="12" sm="12" lg="4">
                            <div className="card">
                                <Row>
                                    <Col sm="6">
                                        <CardTitle className="mb-0">Water Usage1</CardTitle>
                                        <div className="small text-muted">November 2015</div>
                                    </Col>
                                </Row>
                                <div className="chart-wrapper" style={{ height: 200 + 'px', marginTop: 10 + 'px' }}>
                                    <Doughnut data={doughnut} />
                                </div>
                            </div>
                    </Col>

                    <Col xs="12" sm="12" lg="4">
                        
                            <div className="card">
                                <Row>
                                    <Col sm="6">
                                        <CardTitle className="mb-0">Water Usage2</CardTitle>
                                        <div className="small text-muted">November 2015</div>
                                    </Col>
                                </Row>
                                <div className="chart-wrapper" style={{ height: 200 + 'px', marginTop: 10 + 'px' }}>
                                    <Doughnut data={doughnut} />
                                </div>
                            </div>
                        
                    </Col>
                    <Col xs="12" sm="12" lg="4">
                    
                            <div className="card">
                                <Row>
                                    <Col sm="6">
                                        <CardTitle className="mb-0">Water Usage3</CardTitle>
                                        <div className="small text-muted">November 2015</div>
                                    </Col>
                                </Row>
                                <div className="chart-wrapper" style={{ height: 200 + 'px', marginTop: 10 + 'px' }}>
                                    <Doughnut data={doughnut} />
                                </div>
                            </div>
                        
                    </Col>

                </Row>
                <Row>
                        <Col xs="12" sm="12" lg="4">
                                <div className="card">
                                    <Row>
                                        <Col sm="5">
                                            <CardTitle className="mb-0">1</CardTitle>
                                            <div className="small text-muted">November 2015</div>
                                        </Col>
                                    </Row>
                                    <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 10 + 'px' }}>
                                        <XYPlot height={300} width={300}>
                                            <VerticalGridLines />
                                            <HorizontalGridLines />
                                            <XAxis />
                                            <YAxis />
                                            <LineSeries data={data} />
                                        </XYPlot>
                                    </div>
                                </div>
                        </Col>

                           <Col xs="12" sm="12" lg="4">
                                <div className="card">
                                    <Row>
                                        <Col sm="5">
                                            <CardTitle className="mb-0">1</CardTitle>
                                            <div className="small text-muted">November 2015</div>
                                        </Col>
                                    </Row>
                                    <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 10 + 'px' }}>
                                        <XYPlot height={300} width={300}>
                                            <VerticalGridLines />
                                            <HorizontalGridLines />
                                            <XAxis />
                                            <YAxis />
                                            <LineSeries data={data} />
                                        </XYPlot>
                                    </div>
                                </div>
                        </Col>
                        <Col xs="12" sm="12" lg="4">
                                <div className="card">
                                    <Row>
                                        <Col sm="5">
                                            <CardTitle className="mb-0">1</CardTitle>
                                            <div className="small text-muted">November 2015</div>
                                        </Col>
                                    </Row>
                                    <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 10 + 'px' }}>
                                        <XYPlot height={300} width={300}>
                                            <VerticalGridLines />
                                            <HorizontalGridLines />
                                            <XAxis />
                                            <YAxis />
                                            <LineSeries data={data} />
                                        </XYPlot>
                                    </div>
                                </div>
                        </Col>
                    
                </Row>
            </div>
        )
    }
}

export default AdminChart;