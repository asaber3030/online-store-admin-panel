import { Head, useForm, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";

import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { FormContainer, Input, Select } from "@/components/Form";
import { CONTRACT_TYPE_ARRAY } from "@/helpers/constants";

import { CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ListCategoriesSelect from "@/components/ListCategories";

const CreateJob = () => {

  const { categories, sub_categories, users, companies } = usePage().props
  const { data, processing, setData, post, errors } = useForm({
    'title': '',
    'description': '',
    'salary': '',
    'location': '',
    'contract_type': '',
    'category': '',
    'sub_category': '',
    'publisher': '',
    'user': ''
  })
  const handleCreation = () => {
    post(route('admin.jobs.create'))
  }

  return (
    <AdminLayout>

      <Head title={translate('create-job')} />

      <Loader load={processing} />

      <AdminHeader title={ <span>{translate('create-job')}</span> } icon={faPlus} />

      <div className="create-structure create-job" style={{ gridTemplateColumns: '1.8fr 2fr' }}>

        <FormContainer>

          <Input
            label={translate('title')}
            value={data.title}
            handleChange={ e => setData('title', e.target.value) }
            error={errors.title}
          />

          <Input
            label={translate('salary') + ' (LE)'}
            value={data.salary}
            handleChange={ e => setData('salary', e.target.value) }
            error={errors.salary}
          />

          <Input
            label={translate('location')}
            value={data.location}
            handleChange={ e => setData('location', e.target.value) }
            error={errors.location}
          />

          <Select
            label='Contract Type'
            items={CONTRACT_TYPE_ARRAY.map(item => {
              return { value: item.value, text: item.text }
            })}
            handleChange={ e => setData('contract_type', e.target.value) }
            defaultSelected={data.contract_type}
            error={errors.contract_type}
          />

          <Select
            label='Select Company or User'
            items={[
              { value: 0, text: 'Users' },
              { value: 1, text: 'Companies' },
            ]}
            handleChange={ e => setData('publisher', e.target.value) }
            defaultSelected={data.publisher}
            error={errors.publisher}
          />

          {data.publisher == 0 && (
            <Select
              label='Choose a user'
              items={users.map(user => {
                return { value: user.id, text: `${user.username} #${user.id}` }
              })}
              handleChange={ e => setData('user', e.target.value) }
            />
          )}
          {data.publisher == 1 && (
            <Select
              label='Choose a company'
              items={companies.map(com => {
                return { value: com.id, text: `${com.name} #${com.id} - Belongs to: ${com.user.username}` }
              })}
              handleChange={ e => setData('user', e.target.value) }
            />
          )}

          <ListCategoriesSelect
            categories={categories}
            sub_categories={sub_categories}
            errors={errors}
            data={data}
            setData={setData}
          />

          {data.sub_category && (
            <button onClick={handleCreation} className='mt-2 btn btn-sm btn-primary p-2'>{translate('create-job')}</button>
          )}

        </FormContainer>

        <div className="right-data">

          <h5 style={{ fontWeight: 900, margin: '20px 0 10px' }}>Job Details</h5>

          <CKEditor
            editor={ ClassicEditor }
            onChange={ (event, editor) => setData('description', editor.getData()) }
            data={data.description}
          />

        </div>

      </div>

    </AdminLayout>
  );

}

export default CreateJob
