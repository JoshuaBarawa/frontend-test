import React, { useState, useEffect } from 'react'
import './recordList.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import Loading from '../loadingScreen/Loading'
import Input from '../reUsableComponents/inputField/InputField'
import TextArea from '../reUsableComponents/textareaField/TextArea'
import SubmitButton from '../reUsableComponents/submitButton/SubmitButton'

import { getAllRecords, editRecord } from '../../api/APICalls';
import { setAllRecords, setRecord } from '../../redux/RecordSlice';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecordList = () => {

  const dispatch = useDispatch()
  const actionSelector = useSelector((state) => state.action)
  const recordSelector = useSelector((state) => state.record)

  const [activeModal, setActiveModal] = useState(false)
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10)
  const [formErrors, setFormErrors] = useState()
  const [person, setPerson] = useState()


  //Handle change on input value
  const handleOnChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value })
  }


  //Validating edit modal before submit
  const validate = () => {
    let errors = {}
    if (!recordSelector.record?.name) {
      errors['name'] = 'Name is required!'
    }
    if (!recordSelector.record?.email) {
      errors['email'] = 'Email is required!'
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(recordSelector.record.email)) {
      errors['email'] = 'Invalid email address. E.g. example@email.com'
    }
    if (!recordSelector.record?.occupation) {
      errors['occupation'] = 'Occupation is required!'
    }
    if (!recordSelector.record?.bio) {
      errors['bio'] = 'Bio is required!'
    }
    setFormErrors(errors)
    return errors
  };


   //Getting all records on component mount
  useEffect(() => {
    getAllRecords(dispatch).then(resp => dispatch(setAllRecords(resp?.data)))
  }, [dispatch])


  //Updating record
  const handleUpdateRecord = () => {
    if (Object.keys(validate()).length === 0) {
      editRecord(recordSelector.record._id, person, dispatch).then(resp => {
        if (resp?.status === 200) {
          handleCloseModal(dispatch)
          toast.success("Record Updated successful!", { theme: "colored" })
          window.location.reload()
        }
        else { console.log(resp); toast.error("Unable to update!", { theme: "colored" }) }
      })
    }
  }

  //Opening edit modal
  const handleOpenEditModal = (data) =>{
    dispatch(setRecord(data))
    setPerson({ name: data.name, email: data.email, occupation: data.occupation, bio: data.bio })
    setActiveModal(true)
  }

  //Closing edit modal
  const handleCloseModal = (dispatch) => {
    setRecord({ name: '', email: '', occupation: '', bio: '' })
    setPerson({})
    setFormErrors([])
    document.getElementById("form-modal").reset();
    setActiveModal(false)
  }

   //Table pagination section
  const paginationTemplate = {
    layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',

    'CurrentPageReport': (options) => {
      return (
        <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '100px', textAlign: 'center' }}>
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      )
    }
  };


   //Table actions section
  const actionsBodyTemplate = (rowData) => {
    return <div className='table-actions'>
      <p id='edit-action'  onClick={() => handleOpenEditModal(rowData) } >
      <i id="edit-action-icon" className="pi pi-pencil"></i>Edit</p>
    </div>
  }


  return (
    <div className='table-list-page'>

      <div className='data-table'>
        <div className='table-toolbar'>
        <p className='page-title'>Records List<p className='sub-title'>Manage Your Records</p></p>
          <div>
            <label className='form-label'>Records per page: </label>
            <select type='number' className='rows-select-field' value={rows} onChange={(e) => setRows(e.target.value)}>
              {[10, 20, 50, 100].map((select, id) =>
                <option id='option' key={id} style={{ fontSize: '14px' }} type='number' value={select}>{select}</option>
              )}
            </select>
          </div>
        </div>
        {recordSelector.allRecords.length === 0 ? <Loading /> :
          <DataTable value={recordSelector.allRecords} responsive="true" rows={rows} responsiveLayout="stack" breakpoint="1200px"
            paginator paginatorTemplate={paginationTemplate} first={first} onPage={(event) => { setFirst(event.first); setRows(event.rows) }} paginatorClassName="justify-content-end">
            <Column field="_id" header="ID" />
            <Column field="name" header="Name"  />
            <Column field="email" header="Email" />
            <Column field="occupation" header="Occupation" />
            <Column field="bio" header="Bio" style={{height:'10%'}} />
            <Column header="Actions" body={actionsBodyTemplate} />
          </DataTable>}
      </div>




      {/* /////////////////////EDITNG MODAL //////////// */}

      <div className={activeModal ? 'view-modal-active' : 'view-modal-inactive'}>
        <form id='form-modal' className='view-modal-content'>
          <p className='modal-title'> Edit Record
            <i id='close-button' className="pi pi-times" onClick={() => handleCloseModal(dispatch)} /></p>
          <div className="dialog-inputs">
            <Input label="Name *" name='name' type='text' errorMessage={formErrors?.name} value={person?.name}
              handleChange={(e) => handleOnChange(e)} />
            <Input label="Email *" name='email' type='text' errorMessage={formErrors?.email} value={person?.email}
              handleChange={(e) => handleOnChange(e)} />
            <Input label="Occupation *" name='occupation' type='text' errorMessage={formErrors?.occupation}
              value={person?.occupation} handleChange={(e) => handleOnChange(e)} />
            <TextArea label="Bio *" name='bio' type='text' defaultValue={person?.bio}
              handleChange={(e) => handleOnChange(e)} error={formErrors?.bio} />
          </div>
          <div className='dialog-footer'>
            <SubmitButton pending={actionSelector.pending} handleOnSubmit={handleUpdateRecord} />
          </div>

        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </div>
  )
}


export default RecordList;