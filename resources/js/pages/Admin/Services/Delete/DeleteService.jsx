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
import DeleteConfirmation from "@/components/DeleteConfirmation";

const DeleteService = () => {

  const { service, appURL, customErrors, passwordTries } = usePage().props

  const [password, setPassword] = useState('')
  const [confirmPasswordTries, setTries] = useState(passwordTries)
  const [passwordModal, setPasswordModal] = useState(false)

  const submitSoftDelete = () => {
    setTries(t => t + 1)
    Inertia.post(route('admin.services.delete', service.id), {
      deleteType: 'soft',
      password: password,
      tries: confirmPasswordTries
    })
    setPasswordModal(false)
  }

  const submitForceDelete = () => {
    setTries(t => t + 1)
    Inertia.post(route('admin.services.delete', service.id), {
      deleteType: 'force',
      password: password,
      tries: confirmPasswordTries
    })
    setPasswordModal(false)
  }

  return (
    <AdminLayout>

      <Head title={ translate('delete-service') } />

      <AdminHeader title={ translate('delete-service') } icon={faTrash} />

      <div className="delete-structure">

        <div className="left-data">

          {customErrors && (
            <div className="alert alert-sm alert-danger">
              {customErrors}
            </div>
          )}

          <DeleteConfirmation
            cancelRoute='admin.services.list'
            submitForceDelete={submitForceDelete}
            submitSoftDelete={submitSoftDelete}
            password={password}
            setPassword={setPassword}
          />
        </div>

      </div>

    </AdminLayout>
  );

}

export default DeleteService
