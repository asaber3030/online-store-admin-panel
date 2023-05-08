import { Link } from "@inertiajs/inertia-react";
import {useEffect, useState} from "react";

import DeleteImage from "@/assets/images/delete.svg";

import ActionLink from "@/layouts/Admin/ActionLink";
import Modal from "react-bootstrap/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faSave, faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";

import { FormContainer, Input } from "@/components/Form";
import { Button } from "@/components/Button";
import { translate } from "@/languages/translate";
import {Inertia} from "@inertiajs/inertia";

const RequirePassword = ({ confirmationClick, submittedPassword, setSubmittedPassword, modalSize = 'xl', title = 'Password Required to continue!', description = 'You cannot continue the requested action without entering application password that is only known for the admins and trusted agents that have access on this page!' }) => {

  const [modal, setModal] = useState(false)
  const [password, setPassword] = useState(submittedPassword)

  return (
    <>
      <Button
        title='Update'
        color='dark'
        icon={faSave}
        handleClick={ () => setModal( () => true ) }
      />

      <Modal centered backdrop={'static'} keyboard={false} size={modalSize} show={modal} onHide={ () => setModal( false ) }>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
            <Input
              handleChange={setSubmittedPassword}
              value={password}
              type='password'
              label={ translate('password') }
            />
          </FormContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={ submittedPassword ? false : true } title={translate('submit')} color='success' icon={faCheck} handleClick={confirmationClick} />
          <Button title={translate('cancel')} color='danger' icon={faTimes} handleClick={() => setModal( false )} />
        </Modal.Footer>
      </Modal>
    </>

  )

}
export default RequirePassword
