import $ from "jquery";
import React, { Component, createRef } from "react";
import Button from '@material-ui/core/Button';

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder/dist/form-render.min.js");

const renderStyle = {
    padding: "5px",
};

class FormRender extends Component {
    fb = createRef();
    
    state = {
        isValidated: false
    }

    validate = () => {
        const formLength = this.formEl.length;

        if (this.formEl.checkValidity() === false) {
            for(let i=0; i<formLength; i++) {
                const elem = this.formEl[i];
                const errorLabel = elem.parentNode.querySelector('.invalid-feedback');

                if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
                    if (!elem.validity.valid) {
                        errorLabel.textContent = elem.validationMessage;
                    } else {
                        errorLabel.textContent = '';
                    }
                }
            }

            return false;
        } else {
            for(let i=0; i<formLength; i++) {
                const elem = this.formEl[i];
                const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
                if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
                    errorLabel.textContent = '';
                }
            };

            return true;
        }
    }

    componentDidMount() {
        if (this.props.content) {
            let formRender = $(this.fb.current).formRender({datatype:"json", formData:this.props.content});
            
            $(this.fb.current).find('.form-control').on('change', () => {
                if (this.props.handleFormdata) {
                    this.props.handleFormdata(JSON.stringify(formRender.userData));
                }
            });
        }
        if (!this.props.showSubmit) {
            $(this.fb.current).find('.form-control').attr('disabled', '');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.content !== this.props.content) {
            let formRender = $(this.fb.current).formRender({datatype:"json", formData:this.props.content});

            $(this.fb.current).find('.form-control').on('change', () => {
                if (this.props.handleFormdata) {
                    this.props.handleFormdata(JSON.stringify(formRender.userData));
                }
            });
        }
        if (!this.props.showSubmit) {
            $(this.fb.current).find('.form-control').attr('disabled', '');
        }
    }

    handleSubmit = () => {
        if (this.validate()) {
            this.props.handleSubmit();
        }
    }
  
    render() {
      return <form ref={form => this.formEl = form} noValidate>
                <div id="fb-render" ref={this.fb} style={renderStyle} />
                {this.props.showSubmit && 
                <Button onClick={this.handleSubmit}>Submit</Button>}
            </form>;
    }
}

export default FormRender;