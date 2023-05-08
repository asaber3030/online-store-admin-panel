// React & Inertia
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import DeleteConfirmation from "@/components/DeleteConfirmation";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { translate } from "@/languages/translate";

const DeleteAdmin = () => {

  const { admin,  customErrors, passwordTries } = usePage().props

  const [password, setPassword] = useState('')
  const [confirmPasswordTries, setTries] = useState(passwordTries)

  const submitSoftDelete = () => {
    setTries(t => t + 1)
    Inertia.post(route('admin.admins.delete', admin.id), {
      deleteType: 'soft',
      password: password,
      tries: confirmPasswordTries
    })

  }

  const submitForceDelete = () => {
    setTries(t => t + 1)
    Inertia.post(route('admin.admins.delete', admin.id), {
      deleteType: 'force',
      password: password,
      tries: confirmPasswordTries
    })
  }

  return (
    <AdminLayout>

      <Head title={ translate('delete-admin') } />

      <AdminHeader title={ translate('delete-admin') } icon={faTrash} />

      <div className="delete-structure">

        <div className="left-data">

          {customErrors && (
            <div className="alert alert-sm alert-danger">
              {customErrors}
            </div>
          )}

          <DeleteConfirmation
            password={password}
            setPassword={setPassword}
            submitSoftDelete={submitSoftDelete}
            submitForceDelete={submitForceDelete}
            cancelRoute={ route('admin.admins.list') }
          />

        </div>


      </div>

    </AdminLayout>
  );

}

export default DeleteAdmin
