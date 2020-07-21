import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withAlert } from 'react-alert';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom'
import { 
    Button 
} from 'react-bootstrap';

import TitleSubtitle from 'components/TitleSubtitle';


class PageResults extends React.Component {
    static propTypes = {
        operationType: PropTypes.string.isRequired,     // The current operation type
        operationHash: PropTypes.string.isRequired,     // The current operation hash to view results for
    }

    constructor(props){
        super(props);
        const {match: {params}} = this.props;
        this.params = params;
        this.fetchResults()
        this.state = {
            results: {}
        }
    }
    
    fetchResults = () => {
        const { operationType, operationHash } = this.params;
        axios.get(`/api/results/${operationType}/${operationHash}`)
            .then(res => {
                const results = res.data;
                this.setState({
                    results: results
                })
                console.log(`PageResults :: The response = `, res);
            })
            .catch(err => {
                this.setState({
                    results: {}
                })
                console.error(`Oops: something went wrong:`, err);
            })
    }

    onDownloadSingleRequired = (result) => {
        const link = document.createElement('a');
        link.href = `/${result.public}`;
        link.download = result.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Download results | MyImage.io</title>
                    <meta name='description' content="Download results for your cropping, resizing, formats editions and so on ..."/>
                </Helmet>
                <div className="container text-center">
                    <div className='row text-center'>
                        <div className='col-12'>

                            <TitleSubtitle
                                title="Download your results"
                                subtitle="View files below and download for 12 hours"
                            />
                            <div className='mx-auto'>

                                <div className='container'>
                                        {
                                            Object.keys(this.state.results).map(resultKey => {
                                                const result = this.state.results[resultKey];
                                                return (
                                                    <div className='row'>
                                                        <div className='col-12 my-2'>
                                                            <div className='page-results_image-container'>
                                                                <img src={`/${result.public}`} className='page-results_image-result' alt={`Image output`} />
                                                            </div>
                                                            <div className='my-1'>
                                                                        <Button onClick={() => {this.onDownloadSingleRequired(result)}}>Download</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>  
            </>
        )
    }
};

// export default withAlert()(PageResults);
export default withRouter(withAlert()(PageResults));