import './update-category.scss'

import { Head, useForm, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";
import Category from "@/components/Category";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { File, FormContainer, Input, Select } from "@/components/Form";
import {CATEGORIES_TYPES_ARRAY} from "@/helpers/constants";

const UpdateCategory = () => {

  const { lastUpdatedCategory, category } = usePage().props

  const { data, processing, setData, post, errors } = useForm({
    name: category.name,
    keywords: category.search_keywords,
    type: category.type,
    icon: ''
  })

  const submitCreation = () => {
    post(route('admin.cat.update', category.id))
  }

  return (
    <AdminLayout>

      <Head title={ translate('update-category') } />

      <Loader load={processing} />

      <AdminHeader title={ translate('update-category') } icon={faPlus} />

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
            defaultSelected={data.type}
            handleChange={ e => setData('type', e.target.value) }
            error={errors.type}
          />

          <File
            label={translate('icon')}
            className={data.icon != '' ? 'activated' : 'not-yet'}
            handleChange={ e => setData('icon', e.target.files[0]) }
            error={errors.icon}
          />

          <button onClick={submitCreation} className='btn btn-sm btn-primary p-2'>{translate('update-category')}</button>

        </FormContainer>

        <div className="right-data">

          <h5 style={{ fontWeight: 600, marginBottom: 10 }}>{translate('last-updated-category')}</h5>

          <Category category={lastUpdatedCategory} key={lastUpdatedCategory.id} />

        </div>

      </div>

    </AdminLayout>
  );

}

export default UpdateCategory
