import React, { Component } from 'react';
import axios from "axios";
import GeneratorList from "../Creation_Page/generator-list";
import GeneratorForm from "../Item_Components/generator-form"


export default class CreationManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomGeneratorList: []
        };

        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this)
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this)
    }

    handleSuccessfulFormSubmission(item) {
        this.setState({
            randomGeneratorList: [item].concat(this.state.randomGeneratorList)
        })
    }

    handleFormSubmissionError(error) {
        console.log("error", error)
    }

    getRandomTables() {
        axios.get('http://localhost:5000/tables', { withCredentials: true })
            .then(response => {
                this.setState({
                    randomGeneratorList: [...response.data]
                });
            })
            .catch(error => {
                console.log('Error in the API', error);
            });
    }

    componentDidMount() {
        this.getRandomTables();
    }
    render() {
        return (
            <div>
                <div className="creation-manager-wrapper">
                    <div className="upper-part-wrapper">
                        <GeneratorForm
                            handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
                            handleFormSubmissionError={this.handleFormSubmissionError} />
                    </div>
                    <div className="lower-part-wrapper">
                        {this.state.randomGeneratorList.map(item => {
                            return (<GeneratorList key={item.item_id} data={item} />)
                        })}

                    </div>
                </div>
            </div>
        );
    };
}