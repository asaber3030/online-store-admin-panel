import './settings.scss'

import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage } from "@inertiajs/inertia-react";

import { translate } from "@/languages/translate";
import {faLink, faSave} from "@fortawesome/free-solid-svg-icons";

import AdminHeader from "@/layouts/Admin/AdminHeader";
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AppSettingsSidebar from "@/pages/Admin/Settings/SComponents/Sidebar";
import RequirePassword from "@/components/RequirePassword";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import randomString from "@/helpers/functions/randomString";

import { Input } from "@/components/Form";
import { Button } from "@/components/Button";

const ApiHandler = () => {

  const { app } = usePage().props

  const [pass, setPass] = useState()
  const [apiCode, setApiCode] = useState(app.api_url_code)

  const [apiAllow, setApiAllow] = useState(app.allow_api == 1 ? true : false)
  const [apiTimestamps, setApiTimestamps] = useState(app.api_timestamps == 1 ? true : false)
  const [apiImages, setApiImages] = useState(app.api_images == 1 ? true : false)

  const changeAPICode = () => {
    Inertia.post(route('admin.settings.api.api_code'), {
      code: apiCode,
      password: pass
    })
  }

  const changeApiSettings = () => {
    Inertia.post(route('admin.settings.api.settings'), {
      allow: apiAllow,
      timestamps: apiTimestamps,
      images: apiImages
    })
  }

  const generateRandomString = () => {
    setApiCode(apiCode => randomString(8))
  }

  return (
    <AdminLayout>

      <Head title={ translate('api') } />

      <AdminHeader title={ translate('api') } icon={faLink} />

      <div className="settings-layout-global api-handle">

        <AppSettingsSidebar />

        <div className="settings-content">

          <h5 className='settings-title'>API - Handling</h5>

          <div className="use-setting">

            <h6 className='up-title'>API Access URL</h6>
            <Input
              placeholder='New Code'
              value={apiCode}
              handleChange={ e => setApiCode(e.target.value) }
            />
            <span className='href-look' onClick={generateRandomString}>Generate code</span>
            <p className="up-description">Don't ever share this <b>API code</b> with not trusted users!</p>

            <RequirePassword
              submittedPassword={pass}
              setSubmittedPassword={ e => setPass(e.target.value) }
              confirmationClick={changeAPICode}
              modalSize='lg'
            />

          </div>

          <div className="use-setting">

            <h6 className='up-title'>Accessing API</h6>
            <div className="showInput">http://app.example/app-api/<b>{app.api_url_code}</b>/[data]</div>

            <span className='href-look' onClick={ () => {navigator.clipboard.writeText(app.api_url_code)} }>Copy Code</span>

          </div>

          <div className="use-setting">

            <h6 className='up-title mb-3'>API Settings</h6>

            <div className='checkboxes-container'>
              <FormControlLabel control={<Switch onChange={ e => setApiAllow(e.target.checked) } checked={apiAllow} />} label="Allow Api?" />
              <FormControlLabel control={<Switch onChange={ e => setApiTimestamps(e.target.checked) } checked={apiTimestamps} />} label="Include timestamps in data?" />
              <FormControlLabel control={<Switch onChange={ e => setApiImages(e.target.checked) } checked={apiImages} />} label="Include images location in data?" />
            </div>

            <div className="mt-3"></div>

            <Button
              title='Update'
              color='dark'
              icon={faSave}
              handleClick={ changeApiSettings }
            />

          </div>

        </div>

      </div>

    </AdminLayout>
  )
}

export default ApiHandler
