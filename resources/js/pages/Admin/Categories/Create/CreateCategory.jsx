import './create-category.scss'

import { Head, useForm, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import {File, FormContainer, Input, Select} from "@/components/Form";
import Loader from "@/components/Loader/Loader";
import Category from "@/components/Category";
import {CATEGORIES_TYPES_ARRAY} from "@/helpers/constants";

const CreateCategory = () => {

  const { lastCreatedCategory } = usePage().props
  const { data, processing, setData, post, errors } = useForm({
    name: '',
    keywords: '',
    icon: '',
    type: '',
  })

  const submitCreation = () => {
    post(route('admin.cat.create'))
  }

  return (
    <AdminLayout>

      <Head title={ translate('create-category') } />

      <Loader load={processing} />

      <AdminHeader title={ translate('create-category') } icon={faPlus} />

      <div className="create-structure">

        <FormContainer>

          <Input
            label={translate('name')}
            value={data.name}
            handleChange={ e => setData('name', e.target.value) }
            error={errors.name}
          />

          <Input
            label={translate('search-keywords')}
            value={data.keywords}
            placeholder='Split with ,'
            handleChange={ e => setData('keywords', e.target.value) }
            error={errors.keywords}
          />
          {data.keywords.split(',').length > 0 && (
            <div className='list-keywords'>
              {data.keywords.split(',').map(word => (
                <>
                  {word && (
                    <span className='keywords'>{word}</span>
                  )}
                </>
              ))}
            </div>
          )}

          <Select
            label={translate('category-type')}
            items={CATEGORIES_TYPES_ARRAY.map(item => {
              return { value: item.value, text: item.text }
            })}
            handleChange={ e => setData('type', e.target.value) }
            error={errors.type}
          />

          <File
            label={translate('icon')}
            className={data.icon != '' ? 'activated' : 'not-yet'}
            handleChange={ e => setData('icon', e.target.files[0]) }
            error={errors.icon}
          />

          <button onClick={submitCreation} className='btn btn-sm btn-primary p-2'>{translate('create-category')}</button>

        </FormContainer>

        <div className="right-data">

          <h5 style={{ fontWeight: 600, marginBottom: 10 }}>{translate('last-created-category')}</h5>

          <Category category={lastCreatedCategory} key={lastCreatedCategory.id} />

        </div>

      </div>

    </AdminLayout>
  );

}

export default CreateCategory
