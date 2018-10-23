import React, { Component, Fragment } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import './chart.css';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
class Chart extends Component {
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
            { x: 9, y: 0 }
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
        return (
            <div>
                <Row>
                    <Col xs="4" sm="4" lg="4">
                        <Card className="pie-card">
                            <CardBody>
                                <Row>
                                    <Col sm="5">
                                        <CardTitle className="mb-0">Water Usage</CardTitle>
                                        <div className="small text-muted">November 2015</div>
                                    </Col>
                                </Row>
                                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                                    <Doughnut data={doughnut} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="8" sm="8" lg="8">
                        <Card className="line-card">
                            <CardBody>
                                <Row>
                                    <Col sm="5">
                                        <CardTitle className="mb-0">Water Usage</CardTitle>
                                        <div className="small text-muted">November 2015</div>
                                    </Col>
                                </Row>
                                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                                    <XYPlot height={300} width={300}>
                                        <VerticalGridLines />
                                        <HorizontalGridLines />
                                        <XAxis />
                                        <YAxis />
                                        <LineSeries data={data} />
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