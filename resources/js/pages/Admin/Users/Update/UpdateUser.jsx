import { Head, useForm, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { FormContainer, Input, Select } from "@/components/Form";
import { VERIFIED_STATUS_ARRAY } from "@/helpers/constants";

const UpdateUser = () => {

  const { user } = usePage().props

  const { data, processing, setData, post, errors } = useForm({
    'name': user.name,
    'username': user.username.slice(1, user.username.length),
    'email': user.email,
    'password': user.password,
    'national_id': user.national_id,
    'location': user.location,
    'city': user.city,
    'address': user.address,
    'phone': user.phone,
    'verified': user.verified,
  })
  const handleCreation = () => {
    post(route('admin.users.update', user.id))
  }

  return (
    <AdminLayout>

      <Head title={ translate('update-user') + user.username + '#' + user.id } />

      <Loader load={processing} />

      <AdminHeader title={ <span>{translate('update-user')} <b>{`${user.username}#${user.id}`}</b></span> } icon={faPlus} />

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
            defaultSelected={user.verified}
            handleChange={ e => setData('verified', e.target.value) }
            error={errors.verified}
          />

          <button onClick={handleCreation} className='mt-2 btn btn-sm btn-primary p-2'>{translate('update-user')} <b>{user.username}</b></button>

        </FormContainer>

      </div>

    </AdminLayout>
  );

}

export default UpdateUser
