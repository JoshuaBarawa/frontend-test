import React, {useState} from "react";
import './input.css'

const InputField = (props) => {

    const [focused, setFocused] = useState(false)
    const {label, errorMessage, handleChange, ...inputProps} = props;

    const handleFocus = (e) =>{
        setFocused(true)
    }

    return(
        <div className="FormInput">

        <div className="form-group">
            <label className="form-label" >{label}</label>
            <input className="form-control" onChange={handleChange} {...inputProps} onBlur={handleFocus} focused={focused.toString()}/>  
            <span className="error">{errorMessage}</span>
        </div>
     </div>
    )

}

export default InputField