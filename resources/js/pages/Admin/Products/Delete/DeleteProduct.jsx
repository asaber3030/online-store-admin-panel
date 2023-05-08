// React & Inertia
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";

// Components
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import Company from "@/components/Company";
import DeleteAlert from "@/components/DeleteAlert/DeleteAlert";
import { File, FormContainer, Input, Select, TextArea } from "@/components/Form";
import { Button } from "@/components/Button";

// Icons
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Bootstrap
import Modal from 'react-bootstrap/Modal';

// Helpers
import { translate } from "@/languages/translate";
import { COMPANIES_TYPES_ARRAY } from "@/helpers/constants";

// Images
import DeleteImage from "@/assets/images/delete.svg";
import Category from "@/components/Category";

const DeleteProduct = () => {

  const { product, appURL, customErrors, passwordTries } = usePage().props

  const [password, setPassword] = useState('')
  const [confirmPasswordTries, setTries] = useState(passwordTries)
  const [passwordModal, setPasswordModal] = useState(false)

  const submitSoftDelete = () => {
    setTries(t => t + 1)
    Inertia.post(route('admin.products.delete', product.id), {
      deleteType: 'soft',
      password: password,
      tries: confirmPasswordTries
    })
    setPasswordModal(false)

  }

  const submitForceDelete = () => {
    setTries(t => t + 1)
    Inertia.post(route('admin.products.delete', product.id), {
      deleteType: 'force',
      password: password,
      tries: confirmPasswordTries
    })
    setPasswordModal(false)
  }

  return (
    <AdminLayout>

      <Head title={ translate('delete-product') + ' ' + product.id } />

      <AdminHeader title={ <span>{translate('delete-product')} <b>{product.id} - {product.slug}</b></span> } icon={faEdit} />

      <div className="delete-structure">

        <div className="left-data">

          {customErrors && (
            <div className="alert alert-sm alert-danger">
              {customErrors}
            </div>
          )}

          <div className="delete-alert">
            <div className="soft-delete">
              <img src={DeleteImage} alt="" />
              <h4>{translate('soft-delete')}</h4>
              <p>{translate('soft-delete-paragraph')}</p>
              <div className="soft-delete-actions">
                <button className='btn btn-warning btn-sm p-2' onClick={ () => setPasswordModal(true) }><FontAwesomeIcon icon={faTrash} /> {translate('temporary-delete')}</button>
                <Link className='btn btn-primary btn-sm p-2' href={route('admin.products.list')}><FontAwesomeIcon icon={faTimes} /> {translate('cancel')}</Link>
              </div>
            </div>
            <div className="force-delete">
              <h4>{translate('force-delete')}</h4>
              <p>{translate('force-delete-paragraph')}</p>
              <button className='btn btn-danger btn-sm p-2' onClick={ () => setPasswordModal(true) }><FontAwesomeIcon icon={faTrash} /> {translate('force-delete')}</button>
            </div>
          </div>
        </div>

        <Modal centered backdrop={'static'} keyboard={false} size={'xl'} show={passwordModal} onHide={ () => setPasswordModal(false) }>
          <Modal.Header closeButton>
            <Modal.Title>{translate('password-confirm')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormContainer>
              <Input
                handleChange={ e => setPassword(e.target.value) }
                value={password}
                type='password'
                label={translate('password')}
              />
            </FormContainer>
          </Modal.Body>
          <Modal.Footer>
            {password && (
              <>
                <Button title={translate('temporary-delete')} icon={faTrash} handleClick={submitSoftDelete} />
                <Button title={translate('force-delete')} icon={faTrash} handleClick={submitForceDelete} color='danger' />
              </>
            )}
            <ActionLink title={translate('cancel')} icon={faTimes} href={route('admin.products.list')} color='secondary' />
          </Modal.Footer>
        </Modal>

      </div>

    </AdminLayout>
  );

}

export default DeleteProduct
