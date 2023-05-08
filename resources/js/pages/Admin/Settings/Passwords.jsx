import './settings.scss'

import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage } from "@inertiajs/inertia-react";

import { translate } from "@/languages/translate";
import {faLink, faLock, faSave} from "@fortawesome/free-solid-svg-icons";

import AdminHeader from "@/layouts/Admin/AdminHeader";
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AppSettingsSidebar from "@/pages/Admin/Settings/SComponents/Sidebar";
import RequirePassword from "@/components/RequirePassword";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import randomString from "@/helpers/functions/randomString";

import { Input } from "@/components/Form";
import { Button } from "@/components/Button";

const Passwords = () => {

  const { app } = usePage().props

  const [oldPass, setOldPass] = useState()
  const [newPass, setNewPass] = useState()
  const [userPassword, setUserPassword] = useState()

  const handleNewPassword = () => {
    Inertia.post(route('admin.settings.passwords'), {
      new: newPass,
      old: oldPass
    })
  }

  const changeDefaultUserPassword = () => {
    Inertia.post(route('admin.settings.passwords.user.default'), {
      password: userPassword,
    })
  }

  return (
    <AdminLayout>

      <Head title={ translate('passwords') } />

      <AdminHeader title={ translate('passwords') } icon={faLock} />

      <div className="settings-layout-global api-handle">

        <AppSettingsSidebar />

        <div className="settings-content">

          <h5 className='settings-title'>Passwords</h5>

          <div className="use-setting">

            <h6 className='up-title'>Application Password</h6>
            <Input
              placeholder='New Password'
              type='password'
              value={newPass}
              handleChange={ e => setNewPass(e.target.value) }
            />
            <p className="up-description"><b>Warning: </b> Do not share this password or you may expose your data to everyone!</p>

            <RequirePassword
              submittedPassword={oldPass}
              setSubmittedPassword={ e => setOldPass(e.target.value) }
              confirmationClick={handleNewPassword}
              modalSize='lg'
            />

          </div>

          <div className="use-setting">

            <h6 className='up-title'>New Default Users Password</h6>
            <Input
              placeholder='Password'
              value={userPassword}
              handleChange={ e => setUserPassword(e.target.value) }
            />
            <p className="up-description"><b>Notice: </b> This password is for default generated users!. By default: <b>123456789</b></p>

            <Button
              title='Update'
              color='dark'
              icon={faSave}
              handleClick={ changeDefaultUserPassword }
            />

          </div>

        </div>

      </div>

    </AdminLayout>
  )
}

export default Passwords
