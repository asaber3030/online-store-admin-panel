import { useState } from "react";
import { translate } from "@/languages/translate";

import { FormContainer, Input } from "@/components/Form";
import { Button } from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/inertia-react";

import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

import Modal from "react-bootstrap/Modal";
import ActionLink from "@/layouts/Admin/ActionLink";

import DeleteImage from "@/assets/images/delete.svg";

const DeleteConfirmation = ({ setPassword, password, submitSoftDelete, submitForceDelete, cancelRoute }) => {

  const [passwordModal, setPasswordModal] = useState(false)

  return (
    <>
      <div className="delete-alert">
        <div className="soft-delete">
          <img src={DeleteImage} alt="" />
          <h4>{translate('soft-delete')}</h4>
          <p>{translate('soft-delete-paragraph')}</p>
          <div className="soft-delete-actions">
            <button className='btn btn-warning btn-sm p-2' onClick={ () => setPasswordModal(true) }><FontAwesomeIcon icon={faTrash} /> {translate('temporary-delete')}</button>
            <Link className='btn btn-primary btn-sm p-2' href={route('admin.jobs.list')}><FontAwesomeIcon icon={faTimes} /> {translate('cancel')}</Link>
          </div>
        </div>
        <div className="force-delete">
          <h4>{translate('force-delete')}</h4>
          <p>{translate('force-delete-paragraph')}</p>
          <button className='btn btn-danger btn-sm p-2' onClick={ () => setPasswordModal(true) }><FontAwesomeIcon icon={faTrash} /> {translate('force-delete')}</button>
        </div>
      </div>

      <Modal centered backdrop={'static'} keyboard={false} size={'xl'} show={passwordModal} onHide={ () => setPasswordModal(false) }>
        <Modal.Header closeButton>
          <Modal.Title>Password Confirmation</Modal.Title>
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
          <ActionLink title={translate('cancel')} icon={faTimes} href={route('admin.jobs.list')} color='secondary' />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteConfirmation
