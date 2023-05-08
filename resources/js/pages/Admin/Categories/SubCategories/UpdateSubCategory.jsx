import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";
import Category from "@/components/Category";

import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { FormContainer, Input } from "@/components/Form";

const UpdateSubCategory = () => {

  const { category, sub } = usePage().props

  const { data, processing, setData, post, errors } = useForm({
    name: sub.name,
    keywords: sub.search_keywords,
  })

  const updateSubCategory = () => {
    post(route('admin.cat.update.sub', [category.id, sub.id]))
  }

  return (
    <AdminLayout>

      <Head title={ translate('update-sub-category') } />

      <Loader load={processing} />

      <AdminHeader title={ <span>{translate('update-sub-category')} <b>{sub.name}#{sub.id}</b> of <b>{category.name}#{category.id}</b></span> } icon={faEdit} />

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
                <>{word && ( <span className='keywords'>{word}</span> )}</>
              ))}
            </div>
          )}

          <button onClick={updateSubCategory} className='btn btn-sm btn-primary p-2'>{translate('update-sub-category')}</button>

        </FormContainer>

        <div className="right-data">

          <h5 style={{ fontWeight: 600, marginBottom: 10 }}>{translate('category')}</h5>

          <Category category={category} key={category.id} />

        </div>

      </div>

    </AdminLayout>
  );

}

export default UpdateSubCategory
