import './settings.scss'

import {Head, useForm, usePage} from "@inertiajs/inertia-react";

import { translate } from "@/languages/translate";
import {faCog, faHome, faImage, faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AdminHeader from "@/layouts/Admin/AdminHeader";
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AppSettingsSidebar from "@/pages/Admin/Settings/SComponents/Sidebar";
import {File, FormContainer, Input} from "@/components/Form";
import {Button} from "@/components/Button";
import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import Loader from "@/components/Loader/Loader";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Settings = () => {

  const { app } = usePage().props

  const [appName, setAppName] = useState(app.app)
  const [phone, setPhone] = useState(app.app_phone)
  const [email, setEmail] = useState(app.app_email)

  const [mainMode, setMainMode] = useState(app.main_mode == 1 ? true : false)
  const [closeAppMode, setCloseMode] = useState(app.close_app == 1 ? true : false)

  const { data, setData, post, processing, errors } = useForm({
    logo: ''
  })

  const handleAppName = () => {
    Inertia.post(route('admin.settings.app.name'), {
      appName: appName
    });
  }

  const handleContactDetails = () => {
    Inertia.post(route('admin.settings.app.contact'), {
      phone: phone,
      email: email
    });
  }

  const handleAppLogo = () => {
    post(route('admin.settings.app.logo'))
    console.log(data)
  }

  const changeAppSettings = () => {
    Inertia.post(route('admin.settings.app.settings'), {
      main: mainMode,
      close: closeAppMode,
    })
  }

  return (
    <AdminLayout>

      <Head title={ translate('settings') } />

      <AdminHeader title={ translate('settings') } icon={faCog} />

      <Loader load={processing} />

      <div className="settings-layout-global">

        <AppSettingsSidebar />

        <div className="settings-content">

          <h5 className='settings-title'>Public Information</h5>

          <div className="use-setting">

            <h6 className='up-title mb-3'>Website Status</h6>

            <div className='checkboxes-container'>
              <FormControlLabel control={<Switch onChange={ e => setMainMode(e.target.checked) } checked={mainMode} />} label="Maintenance Mode" />
              <FormControlLabel control={<Switch onChange={ e => setCloseMode(e.target.checked) } checked={closeAppMode} />} label="Close Website with 500 Server Error" />
            </div>

            <div className="mt-3"></div>

            <Button
              title='Update'
              color='dark'
              icon={faSave}
              handleClick={ changeAppSettings }
            />

          </div>

          <div className="use-setting">

            <h6 className='up-title'>Application Name</h6>
            <Input
              placeholder='App-Name'
              value={appName}
              handleChange={ e => setAppName(e.target.value) }
            />
            <p className="up-description">Application name that will appear to users and associations.</p>
            <Button
              title='Update'
              color='dark'
              icon={faSave}
              handleClick={handleAppName}
            />
          </div>

          <div className="use-setting">
            <h6 className='up-title'>Contact Details</h6>
            <div className="add-flex">
              <Input
                placeholder='Phone number'
                value={phone}
                handleChange={ e => setPhone(e.target.value) }
              />
              <Input
                placeholder='E-mail'
                value={email}
                handleChange={ e => setEmail(e.target.value) }
              />
            </div>
            <p className="up-description">Contact information for users and ads.</p>
            <Button
              title='Update'
              color='dark'
              icon={faSave}
              handleClick={handleContactDetails}
            />
          </div>

          <div className="use-setting">

            <h6 className='up-title'>Application Logo</h6>

            <File
              handleChange={ e => setData('logo', e.target.files[0]) }
              error={errors.logo}
            />
            <p className="up-description">Logo that will be included in every single page.</p>
            <Button
              title='Update'
              color='dark'
              icon={faSave}
              handleClick={handleAppLogo}
            />
          </div>

        </div>

      </div>

    </AdminLayout>
  )
}

export default Settings
