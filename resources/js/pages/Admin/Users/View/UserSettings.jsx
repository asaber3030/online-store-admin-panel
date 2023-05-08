import './view-user.scss'

// React & Inertia
import {Head, useForm, usePage} from "@inertiajs/inertia-react";

// Components
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import UserPageHeader from "@/pages/Admin/Users/View/UserPageHeader";
import UserNavigationMenu from "@/pages/Admin/Users/View/UserNavigationMenu";
import User from "@/components/User";

// Icons
import { faUser, faSave } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { translate } from "@/languages/translate";
import { FormContainer, Input } from "@/components/Form";
import { Button } from "@/components/Button";
import {FormControlLabel, FormGroup, Switch} from "@mui/material";
import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";

const AppliedJobs = () => {

  const { appURL, user } = usePage().props
  const { data, setData, post, errors, processing } = useForm({
    username: user.username.substring(1, user.username.length),
    name: user.name,
    phone: user.phone,
    email: user.email
  })

  const [verifiedStatus, setVerificationStatus] = useState(user.verified)
  const [canCreateCompany, setCanCreateCompany] = useState(user.can_create_company)
  const [canPublish, setCanPublish] = useState(user.can_publish)
  const [saveBrowsedItems, setSaveBrowsed] = useState(user.save_browsed_items)
  const [saveActivity, setSaveActivity] = useState(user.save_his_activity)

  const saveUserDetails = () => {
    post(route('admin.users.view.settings.details', user.id))
  }

  const saveUserSettings = () => {
    Inertia.post(route('admin.users.view.settings.main', user.id), {
      publish: canPublish,
      company: canCreateCompany,
      activity: saveActivity,
      browsed: saveBrowsedItems,
      verified: verifiedStatus
    })

  }

  return (
    <AdminLayout>

      <Head title={ translate('view-user') + ' ' + user.username + '#' + user.id } />

      <AdminHeader
        title={ <span>{translate('view-user')} <b>{`${user.username}#${user.id}`}</b></span> }
        icon={faUser}
      />

      <div className="view-user-container">

        <UserNavigationMenu user={user} activePage='settings' />

        <div className="page-user-content view-user-settings">

          <UserPageHeader user={user} appURL={appURL} addTitle='Settings - ' />

          <div className="user-settings">
            <h6 className='settings-title'>User Details</h6>

            <div className="d-flex">
              <FormContainer>
                <Input
                  label='Name'
                  value={data.name}
                  handleChange={ e => setData('name', e.target.value) }
                  error={errors.name}
                />
                <Input
                  label='E-mail'
                  value={data.email}
                  handleChange={ e => setData('email', e.target.value) }
                  error={errors.email}
                />
                <Input
                  label='Username'
                  value={data.username}
                  handleChange={ e => setData('username', e.target.value) }
                  error={errors.username}
                />
                <Input
                  label='Phone-number'
                  value={data.phone}
                  handleChange={ e => setData('phone', e.target.value) }
                  error={errors.phone}
                />
                <Button
                  title='Save'
                  icon={faSave}
                  handleClick={saveUserDetails}
                />

                <hr/>

                <h6 className='settings-title'>User Settings</h6>

                <FormGroup>
                  <FormControlLabel control={<Switch checked={verifiedStatus} onChange={ e => setVerificationStatus(e.target.checked) } />} label="Verified?" />
                  <FormControlLabel control={<Switch checked={canCreateCompany} onChange={ e => setCanCreateCompany(e.target.checked) } />} label="Can Create Company?" />
                  <FormControlLabel control={<Switch checked={canPublish} onChange={ e => setCanPublish(e.target.checked) } />} label="Can Add Products, Jobs, Services" />
                  <FormControlLabel control={<Switch checked={saveActivity} onChange={ e => setSaveActivity(e.target.checked) } />} label="Save his activities?" />
                  <FormControlLabel control={<Switch checked={saveBrowsedItems} onChange={ e => setSaveBrowsed(e.target.checked) } />} label="Save browsed items?" />
                </FormGroup>

                <Button
                  title='Save'
                  icon={faSave}
                  handleClick={saveUserSettings}
                />

              </FormContainer>

              <User user={user} />
            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );

}

export default AppliedJobs
