import './images.scss'

import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport, faFileUpload, faImages, faLayerGroup,
  faPlus, faShoppingCart, faTrash, faUpload,
} from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import formatDate from "@/helpers/functions/format-date";
import {File, FormContainer} from "@/components/Form";
import {Tooltip} from "@mui/material";

const ListImages = () => {

  const { appURL, product } = usePage().props;
  const { data, processing, setData, post, errors } = useForm({
    image: '',
  })

  const handleUpload = () => {
    post(route('admin.products.create.image', product.id))
  }
  const handleDelete = (id) => {
    post(route('admin.products.delete.image', [product.id, id]))
  }

  return (
    <AdminLayout>

      <Head title={ translate('product-images') + ' ' + product.name } />

      <AdminHeader title={ <span>{translate('product-images')} <b>{product.name}</b></span> } icon={faImages}>

        <ActionLink
          title={ translate('create-product') }
          color='secondary'
          icon={faPlus}
          href={route('admin.products.create')}
        />

      </AdminHeader>

      <div className="list-images-container">

        <div className="list-images">

          {product.images.length > 0 ? (
            <>
              {product.images.map(img => (
                <div className="image">
                  <img src={appURL + img.image} alt="Image of product" />
                  <div className="text">
                    <h6>{formatDate(img.created_at)}</h6>
                  </div>
                  <button onClick={ () => handleDelete(img.id) } className='btn btn-sm btn-danger p-2'><FontAwesomeIcon icon={faTrash} /> {translate('delete')}</button>
                </div>
              ))}
            </>
          ) : (
            <div className="alert alert-sm alert-secondary"><strong>{translate('no-pictures-added')}</strong></div>
          )}

        </div>

        <div className="right-details">

          <div className="create-form">

            <h6 className='default-title'><FontAwesomeIcon icon={faFileUpload} /> {translate('add-pictures')}</h6>

            <FormContainer>

              <File
                error={errors.image}
                label={translate('upload-product-picture')}
                handleChange={ e => setData('image', e.target.files[0]) }
              />

              <button className='btn btn-sm btn-primary p-2' onClick={handleUpload}>
                <FontAwesomeIcon icon={faUpload} />
                {translate('upload-picture')}
              </button>

            </FormContainer>

          </div>

          <div className="product-simple-card">

            <h6 className='default-title'><FontAwesomeIcon icon={faShoppingCart} /> {translate('product')}: {product.slug} <b>#{product.id}</b></h6>

            <div className="list-items">
              <ul>
                <li>
                  <span>{translate('category')}</span>
                  <span><Link href={route('admin.cat.view.sub', product.category.id)}>{product.category.name}</Link></span>
                </li>
                <li>
                  <span>{translate('sub-category')}</span>
                  <span>{product.sub_category.name}</span>
                </li>
                <li>
                  <span>{translate('slug')}</span>
                  <span>{product.slug}</span>
                </li>
                <li>
                  <span>{translate('price')}</span>
                  <span>{product.price}</span>
                </li>
                <li>
                  <span>{translate('quantity')}</span>
                  <span>{product.qty}</span>
                </li>
                <li>
                  <span>{translate('size')}</span>
                  <span>{product.size}</span>
                </li>
                <li>
                  <span>{translate('creator')}</span>
                  <span>{product.user.username}</span>
                </li>
                <li>
                  <span>{translate('created-in')}</span>
                  <span>{formatDate(product.created_at)}</span>
                </li>
                <li>
                  <span>{translate('last-update')}</span>
                  <span>{formatDate(product.updated_at)}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );

}

export default ListImages
