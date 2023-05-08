import { Head, useForm, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { FormContainer, Input, Select } from "@/components/Form";
import { VERIFIED_STATUS_ARRAY } from "@/helpers/constants";

const UpdateAdmin = () => {

  const { admin } = usePage().props

  const { data, processing, setData, post, errors } = useForm({
    'name': admin.name,
    'username': admin.username.slice(1, admin.username.length),
    'email': admin.email,
    'phone': admin.phone,
    'verified': admin.verified,
  })
  const handleUpdate = () => {
    post(route('admin.admins.update', admin.id))
  }

  return (
    <AdminLayout>

      <Head title={ translate('update-admin') + admin.username + '#' + admin.id } />

      <Loader load={processing} />

      <AdminHeader title={ <span>{translate('update-admin')} <b>{`${admin.username}#${admin.id}`}</b></span> } icon={faPlus} />

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
            defaultSelected={admin.verified}
            handleChange={ e => setData('verified', e.target.value) }
            error={errors.verified}
          />

          <button onClick={handleUpdate} className='mt-2 btn btn-sm btn-primary p-2'>{translate('update-admin')} <b>{admin.username}</b></button>

        </FormContainer>

      </div>

    </AdminLayout>
  );

}

export default UpdateAdmin
