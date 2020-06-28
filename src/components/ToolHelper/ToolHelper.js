import React from 'react';
import PropTypes from 'prop-types';

import ToolHelperForm from 'components/ToolHelperForm';

import ToolHelperIcon from 'resources/icon-tool-helper.png';


class ToolHelper extends React.Component {

    // static propTypes = {
    //     toolHelperForm: PropTypes.object
    // }

    constructor(props){
        super(props);

        this.state = {
            expanded: false,
        }
    }

    onToolHelperClicked = (e) => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render(){
        const classExpanded = this.state.expanded ? 'expanded' : '';
        return (
            <>
                <div className={`tool-helper ${classExpanded}`} onClick={this.onToolHelperClicked} >
                    <img src={ToolHelperIcon}/>
                </div>
                <div className={`tool-helper-panel ${classExpanded}`} >
                    {this.props.children}
                </div>
            </>
        )
    }
};

export default ToolHelper;