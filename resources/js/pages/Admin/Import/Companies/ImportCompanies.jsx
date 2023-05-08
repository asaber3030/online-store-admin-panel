import '../import-style.scss'

import { useState } from "react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import {faArrowRight, faCheck, faSync, faUpload} from "@fortawesome/free-solid-svg-icons";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { Button } from "@/components/Button";
import { File } from "@/components/Form";

const ImportCompanies = () => {

  const { tableName, columns } = usePage().props

  const [activeStep, setActiveStep] = useState('upload');

  const { data, setData, errors, post } = useForm({
    file: ''
  })

  const handleSubmit = () => {
    post(route('admin.import.companies.main'))
    setActiveStep('result')
  }

  return (
    <AdminLayout>

      <AdminHeader title='Import - Companies' icon={faBuilding} />

      <div className="importing-model">

        <div className="steps">

          <div onClick={ () => setActiveStep('prepare') } className={`step ${activeStep == 'prepare' && 'active'}`}>
            <span><FontAwesomeIcon icon={faSync} /></span>
            <h6>Preparing Data</h6>
          </div>

          <div onClick={ () => setActiveStep('upload') } className={`step ${activeStep == 'upload' && 'active'}`}>
            <span><FontAwesomeIcon icon={faUpload} /></span>
            <h6>Upload & Import</h6>
          </div>

          <div onClick={ () => setActiveStep('result') } className={`step ${activeStep == 'result' && 'active'}`}>
            <span><FontAwesomeIcon icon={faCheck} /></span>
            <h6>Results</h6>
          </div>

        </div>

        {activeStep == 'prepare' && (
          <div className="view-step prepare-container">

            <h5 className='step-title'>Preparing Your Data And Required Items! <span>{tableName}</span></h5>

            <div className="required-step">
              <p><b>Step 1: </b> Please make sure to provide your data with this</p>

              <div className="table table-striped">

                <thead>
                  <tr>
                    <th>Column Name</th>
                    <th>Type</th>
                    <th>Limits</th>
                  </tr>
                </thead>

                <tbody>
                {columns.map(col => (
                  <tr>
                    <td>{col.column}</td>
                    <td>{col.type.split(/[()]/)[0]}</td>
                    <td>{col.type_info}</td>
                  </tr>
                ))}
                </tbody>
              </div>

            </div>

            <div className="required-step">
              <p><b>Step 2: </b> Required file type old <b>xlsx, csv</b></p>
            </div>

            <div className="required-step">
              <p><b>Step 3: </b> Be sure there's no duplicated entries in your uploaded data like <b>user id, email, phone</b></p>
            </div>

            <div className="next-step-button">
              <Button
                icon={faArrowRight}
                title={<span>Step 2: <b>Uploading</b></span>}
                handleClick={ () => setActiveStep('upload') }
              />
            </div>

          </div>
        )}

        {activeStep == 'upload' && (

          <div className="view-step upload-container">

            <h5 className='step-title'>Upload your file</h5>

            <File
              label='XLSX, CSV File'
              handleChange={ e => setData('file', e.target.files[0]) }
              error={errors.file}
            />

            <div className="next-step-button">
              <Button
                icon={faArrowRight}
                title={<span>Step 3: <b>Finish!</b></span>}
                handleClick={ handleSubmit }
              />
            </div>


          </div>

        )}

        {activeStep == 'result' && (

          <div className="view-step result-container">

            <h5 className='step-title'>Request Result</h5>

          </div>

        )}

      </div>

    </AdminLayout>
  );

}

export default ImportCompanies
