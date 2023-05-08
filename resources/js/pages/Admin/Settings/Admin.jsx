import './settings.scss'

import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage } from "@inertiajs/inertia-react";

import { translate } from "@/languages/translate";
import { Input } from "@/components/Form";
import { AdminsColumns } from "@/columns/admins";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import AdminHeader from "@/layouts/Admin/AdminHeader";
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AppSettingsSidebar from "@/pages/Admin/Settings/SComponents/Sidebar";
import RequirePassword from "@/components/RequirePassword";

import List from "@/components/List";

const Admin = () => {

  const { app, admins } = usePage().props

  const [password, setPassword] = useState()
  const [newCode, setNewCode] = useState()

  const handleNewCode = () => {
    Inertia.post(route('admin.settings.admin.code'), {
      password: password,
      code: newCode
    })
  }

  return (
    <AdminLayout>

      <Head title={ translate('admin') } />

      <AdminHeader title={ translate('admin') } icon={faLock} />

      <div className="settings-layout-global api-handle">

        <AppSettingsSidebar />

        <div className="settings-content">

          <h5 className='settings-title'>Admin Dashboard</h5>

          <div className="use-setting">

            <h6 className='up-title'>Admin URL Code</h6>
            <Input
              placeholder='New Code'
              value={newCode}
              handleChange={ e => setNewCode(e.target.value) }
            />
            <p className="up-description"><b>Warning: </b> Do not share this code or you may expose your data to everyone!</p>

            <RequirePassword
              submittedPassword={password}
              setSubmittedPassword={ e => setPassword(e.target.value) }
              confirmationClick={handleNewCode}
              modalSize='lg'
            />

          </div>

          <div className="use-setting">

            <h6 className='up-title'>Accessing Admin Dashboard</h6>
            <div className="showInput">http://{window.location.host}<b>/admin/{app.admin_url_code}</b>/</div>

            <span className='href-look' onClick={ () => {navigator.clipboard.writeText(app.admin_url_code)} }>Copy Code</span>

          </div>

          <div className="use-setting">

            <h6 className='up-title mb-2'>Admins</h6>

            <List
              columns={AdminsColumns}
              rows={admins}
              checkBox={false}
              contentHeight={400}
            />

          </div>

        </div>

      </div>

    </AdminLayout>
  )
}

export default Admin
