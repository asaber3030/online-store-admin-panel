import './create-user.scss'

import {  useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import GoogleMapReact from 'google-map-react';


import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { File, FormContainer, Input, Select } from "@/components/Form";
import {VERIFIED_STATUS_ARRAY} from "@/helpers/constants";
import {Checkbox, FormControlLabel} from "@mui/material";


const AnyReactComponent = ({ text }) => <div>{text}</div>;

const CreateUser = () => {

  const [lat, setLat] = useState()
  const [long, setLong] = useState()

  const [defaultPassword, setDefaultPassword] = useState(false);

  const { data, processing, setData, post, errors } = useForm({
    'name': '',
    'username': '',
    'email': '',
    'password': '',
    'picture': '',
    'national_id': '',
    'location': '',
    'city': '',
    'address': '',
    'phone': '',
    'verified': '',
    'use_default_password': true
  })
  const handleCreation = () => {
    post(route('admin.users.create'))
    console.log(errors)
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  });

  const defaultProps = {
    center: {
      lat: 30.3038464,
      lng: 31.7292544
    },
    zoom: 30
  };

  return (
    <AdminLayout>

      <Head title={ translate('create-user') } />

      <Loader load={processing} />

      <AdminHeader title={ translate('create-user') } icon={faPlus} />

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
            label={translate('national-id')}
            value={data.national_id}
            handleChange={ e => setData('national_id', e.target.value) }
            error={errors.national_id}
          />

          <Input
            label={translate('location')}
            value={data.location}
            handleChange={ e => setData('location', e.target.value) }
            error={errors.location}
          />

          <Input
            label={translate('city')}
            value={data.city}
            handleChange={ e => setData('city', e.target.value) }
            error={errors.city}
          />

          <Input
            label={translate('address')}
            value={data.address}
            handleChange={ e => setData('address', e.target.value) }
            error={errors.address}
          />

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
            label={translate('picture')}
            className={data.picture != '' ? 'activated' : 'not-yet'}
            handleChange={ e => setData('picture', e.target.files[0]) }
            error={errors.picture}
          />

          <button onClick={handleCreation} className='mt-2 btn btn-sm btn-primary p-2'>{translate('create-user')}</button>

        </FormContainer>

        <div className="right-data">
          <div style={{ height: '70vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </div>

      </div>

    </AdminLayout>
  );

}

export default CreateUser
