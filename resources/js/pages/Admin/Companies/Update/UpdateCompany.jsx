import './update-company.scss'

import { Head, useForm, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";
import Company from "@/components/Company";

import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { File, FormContainer, Input, Select, TextArea } from "@/components/Form";
import { translate } from "@/languages/translate";
import { COMPANIES_TYPES_ARRAY } from "@/helpers/constants";

const UpdateCompany = () => {

  const { users, lastUpdateCompany, company } = usePage().props

  const { data, processing, setData, post, errors } = useForm({
    name: company.name,
    title: company.title,
    about: company.about,
    type: company.type,
    user: company.user.id,
    email: company.email,
    phone: "0" + company.phone,
    facebook: company.facebook,
    website: company.website,
    logo: '',
  })

  const submitUpdate = () => {
    post(route('admin.com.update', company.id))
  }

  return (
    <AdminLayout>

      <Head title={ translate('update-company') + ' - ' + company.name + '#' + company.id } />

      <Loader load={processing} />

      <AdminHeader title={ <span>{translate('update-company')} - <b>{company.name}#{company.id}</b></span> } icon={faEdit} />

      <div className="update-company">

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
            defaultSelected={company.user.id}
            handleChange={ e => setData('user', e.target.value) }
            error={errors.user}
            items={users.map(user => {
              return { text: `${user.name} - ${user.username}#${user.id}`, value: user.id }
            })}
          />

          <Select
            label={translate('type')}
            defaultSelected={company.type}
            handleChange={ e => setData('type', e.target.value) }
            error={errors.type}
            items={COMPANIES_TYPES_ARRAY.map(c => {
              return { text: c.name, value: c.id }
            })}
          />

          <TextArea
            label={translate('about')}
            placeholder='Company Description'
            value={data.about}
            handleChange={ e => setData('about', e.target.value) }
            error={errors.about}
          />

          <File
            className={data.logo != '' ? 'activated' : 'not-yet'}
            label={translate('logo')}
            handleChange={ e => setData('logo', e.target.files[0]) }
            error={errors.logo}
          />

          <button onClick={submitUpdate} className='btn btn-sm btn-primary p-2'>{translate('update-company')} <b>#{company.id}</b></button>

        </FormContainer>

        <div className="right-data">
          <h5 style={{ fontWeight: 600, marginBottom: 10 }}>{translate('last-updated-company')}</h5>
          <Company company={lastUpdateCompany} />
        </div>

      </div>

    </AdminLayout>
  );

}

export default UpdateCompany
