import './view-product.scss'

// React & Inertia
import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";

// Bootstrap & MUI
import Carousel from 'react-bootstrap/Carousel';
import { Tooltip } from "@mui/material";

// Components
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";

// Icons
import { faEdit, faEye, faImages, faTrash } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { translate } from "@/languages/translate";
import formatDate from "@/helpers/functions/format-date";

const ViewProduct = () => {

  const { product, appURL } = usePage().props

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <AdminLayout>

      <Head title={ translate('view-product') + ' ' + product.id } />

      <AdminHeader title={ <span>{translate('view-product')} <b>{product.id} - {product.slug}</b></span> } icon={faEye}>
        <ActionLink
          title={translate('update')}
          color='secondary'
          icon={faEdit}
          href={route('admin.products.update', product.id)}
        />
        <ActionLink
          title={translate('add-pictures')}
          icon={faImages}
          color='secondary'
          href={route('admin.products.view.images', product.id)}
        />
        <ActionLink
          title={translate('delete')}
          color='secondary'
          icon={faTrash}
          href={route('admin.products.delete', product.id)}
        />
      </AdminHeader>

      <div className="view-product">

        <div className="list-product-images">

          {product.images.length > 0 ? (
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={appURL + product.image}
                  alt="First slide"
                />
              </Carousel.Item>
              {product.images.map(img => (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={appURL + img.image}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div className="alert alert-primary alert-sm">
              There's no images for this product <Link className="alert-link" href={route('admin.products.create.image', product.id)}>Add Pictures</Link>
            </div>
          )}

        </div>

        <div className="product-details">

          <div className="product-header">
            <div className="inner-header">

              <Tooltip title={`${translate('slug')}: ` + product.slug} followCursor><h6>{product.name}</h6></Tooltip>

              {product.type == 0 && (
                <div className="creator-details">
                  <div className="creator-left">
                    <Tooltip title={translate('creator')} followCursor>
                      <img src={appURL + product.user.image} alt=""/>
                    </Tooltip>
                  </div>
                  <div className="creator-right">
                    <Link href={route('admin.com.view', product.user.id)}><h6>{product.user.company.name}</h6></Link>
                    <span>{product.user.company.title}</span>
                  </div>
                </div>
              )}

              {product.type == 1 && (
                <div className="product-creator">
                  <div className="creator-left">
                    <Tooltip title={translate('creator')} followCursor>
                      <img src={appURL + product.user.company.logo} alt="" />
                    </Tooltip>
                  </div>
                  <div className="creator-right">
                    <Link href={route('admin.com.view', product.user.company.id)}><h6>{product.user.company.name}</h6></Link>
                    <span>{product.user.company.title}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="product-price">
              <span className="price">{Intl.NumberFormat().format(product.price + product.vat)}</span>
              <span className="currency"> {translate('le')}</span>
              <span className='offer'>{product.offer}%</span>
              <span className='vat'>{translate('contains-vat')}</span>
            </div>

          </div>

          <div className="list-items">
            <ul>
              <li>
                <span>{translate('id')}</span>
                <span>#{product.id}</span>
              </li>
              <li>
                <span>{translate('slug')}</span>
                <span>{product.slug}</span>
              </li>
              <li>
                <span>{translate('color')}</span>
                <span className='list-dts'>
                  {product.color.split(',').map(color => (
                    <span className="color">{color}</span>
                  ))}
                </span>
              </li>
              <li>
                <span>{translate('size')}</span>
                <span className='list-dts'>
                  {product.size.split(',').map(size => (
                    <span className="size">{size}</span>
                  ))}
                </span>
              </li>
              <li>
                <span>{translate('delivery-value')}</span>
                <span>{product.delivery_value} LE</span>
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

          <div className="product-details">

            <div className='product-desc-glb' dangerouslySetInnerHTML={{ __html: product.description }}></div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );

}

export default ViewProduct
