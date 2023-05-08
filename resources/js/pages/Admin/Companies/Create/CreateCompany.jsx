import './create-company.scss'

import { Head, useForm, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";
import Company from "@/components/Company";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { translate } from "@/languages/translate";
import { File, FormContainer, Input, Select, TextArea } from "@/components/Form";
import { COMPANIES_TYPES_ARRAY } from "@/helpers/constants";


const CreateCompany = () => {

  const { users, lastCreatedCompany } = usePage().props

  const { data, processing, setData, post, errors } = useForm({
    name: '',
    title: '',
    about: '',
    logo: '',
    type: '',
    user: '',
    email: '',
    phone: '',
    facebook: '',
    website: '',
  })

  const submitCreation = () => {
    post(route('admin.com.create'))
  }

  return (
    <AdminLayout>

      <Head title={ translate('create-company') } />

      <Loader load={processing} />

      <AdminHeader title={ translate('create-company') } icon={faPlus} />

      <div className="create-company">

        <FormContainer>

          <Input
            label={translate('company-name')}
            value={data.name}
            handleChange={ e => setData('name', e.target.value) }
            error={errors.name}
          />

          <Input
            label={translate('title')}
            value={data.title}
            handleChange={ e => setData('title', e.target.value) }
            error={errors.title}
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

          <Input
            label={translate('company-website')}
            value={data.website}
            handleChange={ e => setData('website', e.target.value) }
            error={errors.website}
          />

          <Input
            label={translate('facebook')}
            value={data.facebook}
            handleChange={ e => setData('facebook', e.target.value) }
            error={errors.facebook}
          />

          <Select
            label={translate('user')}
            handleChange={ e => setData('user', e.target.value) }
            error={errors.user}
            items={users.map(user => {
              return { text: `${user.name} - ${user.username}#${user.id}`, value: user.id }
            })}
          />

          <Select
            label={translate('type')}
            handleChange={ e => setData('type', e.target.value) }
            error={errors.type}
            items={COMPANIES_TYPES_ARRAY.map(c => {
              return { text: c.name, value: c.id }
            })}
          />

          <TextArea
            label={translate('about')}
            value={data.about}
            handleChange={ e => setData('about', e.target.value) }
            error={errors.about}
          />

          <File
            label={translate('logo')}
            className={data.logo != '' ? 'activated' : 'not-yet'}
            handleChange={ e => setData('logo', e.target.files[0]) }
            error={errors.logo}
          />

          <button onClick={submitCreation} className='btn btn-sm btn-primary p-2'>{translate('create-company')}</button>

        </FormContainer>

        <div className="right-data">

          <h5 style={{ fontWeight: 600, marginBottom: 10 }}>{translate('last-created-company')}</h5>

          <Company company={lastCreatedCompany} />

        </div>

      </div>

    </AdminLayout>
  );

}

export default CreateCompany
