import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { FormContainer, Input, Select } from "@/components/Form";
import {CATEGORIES_TYPES_OBJECT, CONTRACT_TYPE_ARRAY} from "@/helpers/constants";

import { CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ListCategoriesSelect from "@/components/ListCategories";

const CreateService = () => {

  const { categories, sub_categories, users, companies } = usePage().props
  const { data, processing, setData, post, errors } = useForm({
    'name': '',
    'details': '',
    'salary': '',
    'salary_per_hour': '',
    'category': '',
    'sub_category': '',
    'publisher': '',
    'user': ''
  })
  const handleCreation = () => {
    post(route('admin.services.create'))
  }

  return (
    <AdminLayout>

      <Head title={translate('create-service')} />

      <Loader load={processing} />

      <AdminHeader title={ <span>{translate('create-service')}</span> } icon={faPlus} />

      <div className="create-structure create-service" style={{ gridTemplateColumns: '1.8fr 2fr' }}>

        <FormContainer>

          <Input
            label={translate('name')}
            value={data.name}
            handleChange={ e => setData('name', e.target.value) }
            error={errors.name}
          />

          <Input
            label={translate('salary') + ' (LE)'}
            value={data.salary}
            handleChange={ e => setData('salary', e.target.value) }
            error={errors.salary}
          />

          <Input
            label='Salary per hour'
            value={data.salary_per_hour}
            handleChange={ e => setData('salary_per_hour', e.target.value) }
            error={errors.salary_per_hour}
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
                return { value: com.id, text: `${com.name} #${com.id} | Belongs to: ${com.user.username}` }
              })}
              handleChange={ e => setData('user', e.target.value) }
            />
          )}

          {categories.length > 0 ? (
            <ListCategoriesSelect
              categories={categories}
              sub_categories={sub_categories}
              errors={errors}
              data={data}
              setData={setData}
            />
          ) : (
            <div className="alert alert-sm alert-danger">
              There's no categories for <b>{CATEGORIES_TYPES_OBJECT[2]}</b>. <Link href={route('admin.cat.create')} className="alert-link">Click here</Link> for adding new categories
            </div>
          )}

          {data.sub_category && (
            <button onClick={handleCreation} className='mt-2 btn btn-sm btn-primary p-2'>{translate('create-service')}</button>
          )}

        </FormContainer>

        <div className="right-data">

          <h5 style={{ fontWeight: 900, margin: '20px 0 10px' }}>Service Details</h5>

          <CKEditor
            editor={ ClassicEditor }
            onChange={ (event, editor) => setData('details', editor.getData()) }
            data={data.details}
          />
          {errors.details ?? (
            <div style={{ color: 'red' }}>{errors.details}</div>
          )}

        </div>

      </div>

    </AdminLayout>
  );

}

export default CreateService
