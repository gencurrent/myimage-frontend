import React from 'react';

import PropTypes from 'prop-types';

import ToolHelper from 'components/ToolHelper';
import {
    Button,
    Form
} from 'react-bootstrap';

class ToolHelperFormResize extends React.Component {

    static propTypes = {
        resizeConfiguration: PropTypes.object.isRequired,
        onValuesUpdated: PropTypes.func.isRequired,
    }

    constructor(props){
        super(props);

        const {resizeConfiguration} = this.props;
        this.state = {
            width: this.props.resizeConfiguration.width,
            height: this.props.resizeConfiguration.height,
            keepAspect: true,
        };
        this.onValuesUpdated();
    }

    onWidthInput = (e) => {
        const value = e.target.value;
        const number = Number(value);
        
        let extension = {};
        if (this.state.keepAspect){
            const diffRatio = value / this.props.resizeConfiguration.width;
            const newHeight = Math.round(this.props.resizeConfiguration.height * diffRatio);
            extension.height = newHeight;
        }

        this.setState({
            width: number,
            ...extension,
        }, this.onValuesUpdated);
    }

    onHeightInput = (e) => {
        const value = e.target.value;
        const number = Number(value);
        
        let extension = {};
        if (this.state.keepAspect){
            const diffRatio = value / this.props.resizeConfiguration.height;
            const newWidth = Math.round(this.props.resizeConfiguration.width * diffRatio);
            extension.width = newWidth;
        }
        
        this.setState({
            height: number,
            ...extension
        }, this.onValuesUpdated);
    }

    onKeepAspectInput = e => {
        let newSizeState = {};
        if (!this.state.keepAspect){
            newSizeState = {
                width: this.props.resizeConfiguration.width,
                height: this.props.resizeConfiguration.height,
            };
        }
        
        this.setState({
            keepAspect: !this.state.keepAspect,
            ...newSizeState,
        }, this.onValuesUpdated)
    }

    onValuesUpdated = () => {
        this.props.onValuesUpdated && this.props.onValuesUpdated(this.state);
    }
    

    render(){
        return (

            <ToolHelper>
            <div>
                <Form className='tool-helper-form'>
                    <Form.Group>
                        <Form.Label>Width, px</Form.Label>
                        <Form.Control 
                            type="number"
                            pattern="[0-9]*" 
                            inputMode="numeric"
                            placeholder="Width" 
                            onChange={this.onWidthInput}
                            value={this.state.width}
                        />
                        <Form.Label>Height, px</Form.Label>
                        <Form.Control 
                            type="number"
                            pattern="[0-9]*" 
                            inputMode="numeric"
                            placeholder="Height"
                            onChange={this.onHeightInput}
                            value={this.state.height}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Check id="newId" type="checkbox" label="Keep aspect" defaultChecked={true} value={this.state.keepAspect} onChange={this.onKeepAspectInput}/>
                    </Form.Group>
                </Form>
            </div>

            </ToolHelper>
        )
    }
};

export default ToolHelperFormResize;