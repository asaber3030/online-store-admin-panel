import { Head, useForm, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";

import { faEdit } from "@fortawesome/free-regular-svg-icons";

import { translate } from "@/languages/translate";
import { File, FormContainer, Input, Select, TextArea } from "@/components/Form";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const UpdateProduct = () => {

  const { product, categories, sub_categories } = usePage().props

  const { data, processing, setData, post, errors } = useForm({
    name: product.name,
    slug: product.slug,
    description: product.description,
    category: product.category,
    sub_category: product.sub_category,
    color: product.color,
    size: product.size,
    quantity: product.qty,
    brand: product.brand,
    price: product.price,
    offer: product.offer,
    vat: product.vat,
    image: '',
    delivery_value: product.delivery_value,
    type: product.type,
  })

  const submitUpdate = () => {
    post(route('admin.products.update', product.id))
  }

  return (
    <AdminLayout>

      <Head title={ translate('update-product') + ' ' + product.name } />

      <Loader load={processing} />

      <AdminHeader title={ <span>{translate('update-product')} <b>{product.slug} - #{product.id}</b></span> } icon={faEdit} />

      <div className="create-structure update-product">

        <FormContainer>

          <Input
            label={translate('name')}
            value={data.name}
            handleChange={ e => setData('name', e.target.value) }
            error={errors.name}
          />

          <Input
            label={translate('color')}
            value={data.color}
            handleChange={ e => setData('color', e.target.value) }
            error={errors.color}
          />

          <Input
            label={translate('size')}
            value={data.size}
            handleChange={ e => setData('size', e.target.value) }
            error={errors.size}
          />

          <Input
            label={translate('quantity')}
            value={data.quantity}
            handleChange={ e => setData('quantity', e.target.value) }
            error={errors.quantity}
          />

          <Input
            label={translate('brand')}
            value={data.brand}
            handleChange={ e => setData('brand', e.target.value) }
            error={errors.brand}
          />

          <Input
            label={translate('price')}
            value={data.price}
            handleChange={ e => setData('price', e.target.value) }
            error={errors.price}
          />

          <Input
            label={translate('offer')}
            value={data.offer}
            handleChange={ e => setData('offer', e.target.value) }
            error={errors.offer}
          />

          <Input
            label={translate('vat')}
            value={data.vat}
            handleChange={ e => setData('vat', e.target.value) }
            error={errors.vat}
          />

          <Input
            label={translate('delivery-value')}
            value={data.delivery_value}
            handleChange={ e => setData('delivery_value', e.target.value) }
            error={errors.delivery_value}
          />

          <Select
            label={translate('category')}
            defaultSelected={product.category}
            items={categories.map(cat => {
              return { value: cat.id, text: cat.name + ' #' + cat.id }
            })}
            handleChange={ e => setData('category', e.target.value) }
            error={errors.category}
          />

          {sub_categories.filter(sub => sub.category == data.category).length > 0 ? (
            <Select
              label={translate('sub-category')}
              defaultSelected={product.sub_category}
              items={sub_categories.filter(sub => sub.category == data.category).map(sub => {
                return { value: sub.id, text: sub.name + ' #' + sub.id }
              })}
              handleChange={ e => setData('sub_category', e.target.value) }
              error={errors.category}
            />
          ) : (
            <div className="alert alert-sm alert-warning">
              {translate('no-sub-categories-paragraph')}
            </div>
          )}

          <File
            label={translate('image')}
            className={data.image != '' ? 'activated' : 'not-yet'}
            handleChange={ e => setData('image', e.target.files[0]) }
            error={errors.image}
          />

          <CKEditor
            editor={ ClassicEditor }
            data={data.description}
            onChange={(event, editor) => setData('description', editor.getData())}
          />
          {errors.description && (
            <span className="red-c">{errors.description}</span>
          )}

          {data.sub_category ? (
            <button onClick={submitUpdate} className='mt-2 btn btn-sm btn-primary p-2'>{translate('update-product')}</button>
          ) : (
            <div className="alert alert-sm alert-info">
              {translate('selection-required-paragraph')}
            </div>
          )}

        </FormContainer>



      </div>

    </AdminLayout>
  );

}

export default UpdateProduct
