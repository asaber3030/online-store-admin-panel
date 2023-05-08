import './create-product.scss'

import {useEffect, useState} from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBuilding, faPlus, faUsers} from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { File, FormContainer, Input, Select, TextArea } from "@/components/Form";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateProduct = () => {

  const { categories, sub_categories, users, companies } = usePage().props

  const [selectedCreation, setCreationType] = useState('user')

  const { data, processing, setData, post, errors } = useForm({
    name: '',
    slug: '',
    description: '',
    user: '',
    category: '',
    sub_category: '',
    color: '',
    size: '',
    quantity: '',
    brand: '',
    price: '',
    offer: '',
    vat: '',
    image: '',
    delivery_value: '',
    type: '',
  })

  const submitCreationForUser = () => {
    post(route('admin.products.create', selectedCreation))
  }

  const submitCreationForCompany = () => {
    post(route('admin.products.create', selectedCreation))
  }
  return (
    <AdminLayout>

      <Head title={ translate('create-product') } />

      <Loader load={processing} />

      <AdminHeader title={ translate('create-product') } icon={faPlus} />

      <div className="choose-creation-type">


        <div
          onClick={ () => setCreationType('company') }
          className={`creation-option ${selectedCreation == 'company' ? 'active-cr' : 'df'}`}>
          <FontAwesomeIcon icon={faBuilding} />
          {translate('company')}
        </div>

        <div
          onClick={ () => setCreationType('user') }
          className={`creation-option ${selectedCreation == 'user' ? 'active-cr' : 'df'}`}>
          <FontAwesomeIcon icon={faUsers} />
          {translate('users')}
        </div>

      </div>

      <div className="create-structure create-product">

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

          {selectedCreation == 'company' ? (
            <Select
              label={translate('company')}
              handleChange={ e => setData('user', e.target.value) }
              items={companies.map(c => {
                return { value: c.user.id, text: c.name + ' #' + c.id }
              })}
              error={errors.user}
            />
          ) : (
            <Select
              label={translate('user')}
              handleChange={ e => setData('user', e.target.value) }
              items={users.map(c => {
                return { value: c.id, text: c.username + ' #' + c.id }
              })}
              error={errors.user}
            />
          )}

          <Select
            label={translate('category')}
            items={categories.map(cat => {
              return { value: cat.id, text: cat.name + ' #' + cat.id }
            })}
            handleChange={ e => setData('category', e.target.value) }
            error={errors.category}
          />

          {sub_categories.filter(sub => sub.category == data.category).length > 0 ? (
            <Select
              label={translate('sub-categories')}
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
            onChange={(event, editor) => setData('description', editor.getData())}
          />
          {errors.description && (
            <span className="red-c">{errors.description}</span>
          )}

          {data.sub_category ? (
            <>
              {selectedCreation == 'user' && (
                <button onClick={submitCreationForUser} className='mt-2 btn btn-sm btn-primary p-2'>{translate('create-product')}</button>
              )}

              {selectedCreation == 'company' && (
                <button onClick={submitCreationForCompany} className='mt-2 btn btn-sm btn-primary p-2'>{translate('create-product')}</button>
              )}
            </>
          ) : (
            <div className="alert alert-sm alert-info">
              {translate('selection-required-paragraph')}
            </div>
          )}


        </FormContainer>

        <div className="right-data">

          <h5 style={{ fontWeight: 600, marginBottom: 10 }}>{translate('some-instructions')}</h5>

          <div className="list-items">
            <ul>
              <li><span>For adding <b>many sizes</b> or <b>many colors</b> to product please make sure to separate them with ","</span></li>
              <li><span>For discarding any attribute of product features please put <b>"N/A"</b></span></li>
            </ul>
          </div>

        </div>

      </div>

    </AdminLayout>
  );

}

export default CreateProduct
