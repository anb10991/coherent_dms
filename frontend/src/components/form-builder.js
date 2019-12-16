import $ from "jquery";
import React, { Component, createRef } from "react";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder/dist/form-builder.min.js");
require("formBuilder/dist/form-render.min.js");

class FormBuilder extends Component {
    fb = createRef();
    formBuilder;

    componentDidMount() {
        this.formBuilder = $(this.fb.current).formBuilder({
            dataType:"json",
            onCloseFieldEdit: this.onCloseFieldEdit,
            editOnAdd: true,
            formData: this.props.content,
            disabledActionButtons: ['data', 'save', 'clear'],
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.content !== this.props.content) {
            this.formBuilder.actions.setData(this.props.content);
        }
    }

    onCloseFieldEdit = () => {
        let fieldArray = JSON.parse(this.formBuilder.actions.getData('json', true));
        this.props.handleFormData(JSON.stringify(fieldArray));
    }
  
    render() {
      return <div id="fb-editor" ref={this.fb} />;
    }
}

export default FormBuilder;