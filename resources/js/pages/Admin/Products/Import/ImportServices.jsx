import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";

import AdminHeader from "@/layouts/Admin/AdminHeader";
import AdminLayout from "@/layouts/Admin/AdminLayout";
import ImportList from "@/components/ImportList";
import Loader from "@/components/Loader/Loader";
import Modal from 'react-bootstrap/Modal';

import { Button } from "@/components/Button"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faFileImport } from "@fortawesome/free-solid-svg-icons";

import { nationalID } from "@/helpers/functions/student";
import { translate } from "@/languages/translate";
import { ServicesCSVColumns } from "@/csv/services-csv";

const ImportServices = () => {

  const { customErrors } = usePage().props
  const { processing, setData, errors, post } = useForm({
    csv_file: ''
  })
  const [errorsModal, openErrorsModal] = useState(false)

  const handleImportFile = () => {
    post(route('admin.services.import'))
  }

  return (
    <AdminLayout>

      <Head title={ translate('import-services') } />

      <Loader load={processing} />

      <AdminHeader title={ translate('import-services') } icon={faFileImport} />

      <div className="import-services">

        <ImportList
          title='Required columns for importing services'
          rows={ServicesCSVColumns}
          handleClick={handleImportFile}
          handleChange={ e => setData('csv_file', e.target.files[0]) }
          error={errors.csv_file}
        />

        {customErrors && (

          <div className="modal-structure">

            <Button
              handleClick={ () => openErrorsModal(true) }
              title='Show Errors'
              color='danger'
            />

            <div className="modal-container">

              <Modal className='modal-errors-csv' show={errorsModal} onHide={ () => openErrorsModal(false) }>
                <Modal.Header closeButton><Modal.Title><FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: 5 }} /> Errors</Modal.Title></Modal.Header>
                <Modal.Body>
                  <div className="list-errors">
                    {customErrors.username.length > 0 && (
                      <div className="error-container">
                        <h6>User Doesn't Exists</h6>
                        <ul>
                          {customErrors.user.map(u => (
                            <li>{u}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {customErrors.category.length > 0 && (
                      <div className="error-container">
                        <h6>Categories don't exist</h6>
                        <ul>
                          {customErrors.category.map(u => (
                            <li>{u}</li>
                          ))}
                        </ul>
                      </div>
                    )}


                    {customErrors.sub_category.length > 0 && (
                      <div className="error-container">
                        <h6>Sub Categories don't exist</h6>
                        <ul>
                          {customErrors.sub_category.map(u => (
                            <li>{u}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" handleClick={ () => openErrorsModal(false) } title='Close' />
                </Modal.Footer>
              </Modal>
            </div>

          </div>
        )}


      </div>

    </AdminLayout>
  )
}

export default ImportServices
