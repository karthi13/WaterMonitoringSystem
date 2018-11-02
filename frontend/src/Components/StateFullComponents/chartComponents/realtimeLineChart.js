import React, { Component, Fragment } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import './chart.css';
import {VerticalBarSeries, XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        console.log(this.props.chartData);
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
              }],
          };

          const divStyle = {
            marginLeft: 0,
            marginRight: 0
          };
        return (
            <div>
                <Row style={divStyle}>
                    <Col xs="12" sm="12" lg="4">
                        <Card className="pie-card">
                            <CardBody>
                                <Row>
                                    <Col sm="5">
                                        <CardTitle className="mb-0">Water Usage</CardTitle>
                                        <div className="small text-muted">November 2015</div>
                                    </Col>
                                </Row>
                                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                                    <Doughnut data={this.props.chartData.doughnut} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="12" lg="8">
                        <Card className="line-card">
                            <CardBody>
                                <Row>
                                    <Col sm="5">
                                        <CardTitle className="mb-0">Water Usage</CardTitle>
                                        <div className="small text-muted">November 2015</div>
                                    </Col>
                                </Row>
                                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                                    <XYPlot height={300} width={600}>
                                        <VerticalGridLines />
                                        <HorizontalGridLines />
                                        <XAxis />
                                        <YAxis />
                                        <VerticalBarSeries data={data} />
                                    </XYPlot>
                                </div>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default Chart;