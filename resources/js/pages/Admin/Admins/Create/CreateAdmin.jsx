import './create-admin.scss'

import { useState } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { File, FormContainer, Input, Select } from "@/components/Form";
import { Checkbox, FormControlLabel } from "@mui/material";

import { VERIFIED_STATUS_ARRAY } from "@/helpers/constants";

const CreateAdmin = () => {

  const [defaultPassword, setDefaultPassword] = useState(false);

  const { data, processing, setData, post, errors } = useForm({
    'name': '',
    'username': '',
    'email': '',
    'password': '',
    'picture': '',
    'phone': '',
    'use_default_password': true,
    'verified': true
  })
  const handleCreation = () => {
    post(route('admin.admins.create'))
  }

  return (

    <AdminLayout>

      <Head title={ translate('create-admin') } />

      <Loader load={processing} />

      <AdminHeader title={ translate('create-admin') } icon={faPlus} />

      <div className="create-structure create-user">

        <FormContainer>

          <Input
            label={translate('name')}
            value={data.name}
            handleChange={ e => setData('name', e.target.value) }
            error={errors.name}
          />

          <Input
            label={translate('username')}
            value={data.username}
            handleChange={ e => setData('username', e.target.value) }
            error={errors.username}
          />

          <Input
            label={translate('email')}
            value={data.email}
            handleChange={ e => setData('email', e.target.value) }
            error={errors.email}
          />

          {defaultPassword == false && (
            <Input
              label={translate('password')}
              value={data.password}
              type='password'
              handleChange={ e => setData('password', e.target.value) }
              error={errors.password}
            />
          )}

          <div className='d-flex align-items-center gap-2'>
            <FormControlLabel
              label="Use Default Password"
              control={
                <Checkbox
                  onChange={ e => { setDefaultPassword(e.target.checked); setData('use_default_password', e.target.checked) } }
                />
              }
            />
          </div>

          <Input
            label={translate('phone')}
            value={data.phone}
            handleChange={ e => setData('phone', e.target.value) }
            error={errors.phone}
          />

          <Select
            label={translate('verification-status')}
            items={VERIFIED_STATUS_ARRAY.map(i => {
              return { value: i.value, text: i.text }
            })}
            handleChange={ e => setData('verified', e.target.value) }
            error={errors.verified}
          />

          <File
            label={ translate('picture') }
            className={data.picture != '' ? 'activated' : 'not-yet'}
            handleChange={ e => setData('picture', e.target.files[0]) }
            error={errors.picture}
          />

          <button onClick={handleCreation} className='mt-2 btn btn-sm btn-primary p-2'>{ translate('create-admin') }</button>

        </FormContainer>

      </div>

    </AdminLayout>
  );

}

export default CreateAdmin
