import React from "react";
import './textarea.css'

function TextArea (props){
    const {label, name, defaultValue, handleChange, error} = props;

    return(
  <div className="textarea">

        <div className="textarea-group">
            <label class="form-label" >{label}</label>
            <textarea
                name={name}
                className="text-control"
                onChange={handleChange}
                defaultValue={defaultValue}
            ></textarea>
            <span id="error">{error}</span>
        </div>
 </div>
    )

}

export default TextArea