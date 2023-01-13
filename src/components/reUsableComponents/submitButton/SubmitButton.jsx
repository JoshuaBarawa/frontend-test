import './submitbutton.css'

const SubmitButton = ({pending, handleOnSubmit}) => {

    const loading = () =>{
        return <div class="lds-dual-ring"></div>
    }

    return (
        <div>
        {!pending?
            <button type='button' className="submit-btn" onClick={handleOnSubmit}>Submit</button>:
            <button type='button' className="submit-btn disabled" disabled="disabled">{loading()}</button>
        }
        </div>
    )
}

export default SubmitButton