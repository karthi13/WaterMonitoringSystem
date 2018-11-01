import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class ButtonGrpComponent extends Component {

    onButtonClickHandler = (event, queryString) => {
        event.preventDefault();
        console.log(queryString);
    }

    render() {
        return (
            <div>
                <ButtonGroup>
                    <Button onClick={e => this.onButtonClickHandler(e,"Day")}>Day</Button>
                    <Button onClick={e => this.onButtonClickHandler(e,"Month")}>Month</Button>
                    <Button onClick={e => this.onButtonClickHandler(e,"Year")}>Year</Button>
                </ButtonGroup>
            </div>
        );
    }

}

export default ButtonGrpComponent;