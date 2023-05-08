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
import { UsersCSVColumns } from "@/csv/users-csv";

const ImportUsers = () => {

  const { customErrors } = usePage().props
  const { processing, setData, errors, post } = useForm({
    csv_file: ''
  })
  const [errorsModal, openErrorsModal] = useState(false)

  const handleImportFile = () => {
    post(route('admin.users.import'))
  }

  return (
    <AdminLayout>

      <Head title={ translate('import-user') } />

      <Loader load={processing} />

      <AdminHeader title={ translate('import-user') } icon={faFileImport} />

      <div className="import-users">

        <ImportList
          title='Required columns for importing users'
          rows={UsersCSVColumns}
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
                        <h6>Duplicated Usernames</h6>
                        <ul>
                          {customErrors.username.map(u => (
                            <li>{u}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {customErrors.national_id.length > 0 && (
                      <div className="error-container">
                        <h6>Duplicated National IDs</h6>
                        <ul>
                          {customErrors.national_id.map(u => (
                            <li>{nationalID(u)}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {customErrors.email.length > 0 && (
                      <div className="error-container">
                        <h6>Duplicated E-mail addresses</h6>
                        <ul>
                          {customErrors.email.map(u => (
                            <li>{u}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {customErrors.phone.length > 0 && (
                      <div className="error-container">
                        <h6>Duplicated Phone numbers</h6>
                        <ul>
                          {customErrors.phone.map(u => (
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

export default ImportUsers
