import './payments.scss'

import {Head, Link, usePage} from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";

import { translate } from "@/languages/translate";

import { faBuilding, faTrash } from "@fortawesome/free-solid-svg-icons";
import { PRODUCT_PAYMENT_STATUS } from "@/helpers/constants";


const CompanyProducts = () => { 

  const { company, payment, appURL } = usePage().props;

  return (
    <AdminLayout>

      <Head title={`${translate('payment-id')}: ${payment.id}`} />

      <AdminHeader title={`${translate('payment-id')}: ${payment.id} - Company: ${company.name}`} icon={faBuilding}>

        <ActionLink
          title={ translate('delete') }
          color='danger'
          icon={faTrash}
          href={route('admin.com.create')}
        />

      </AdminHeader>

      <div className="view-payment-container">

        <div className="payment-details">

          <div className="user-details">

            <img src={appURL + payment.user.picture} alt=""/>
            <div>
              <h6>{payment.user.name}</h6>
              <Link href={route('admin.users.view', payment.user.id)}>{payment.user.username}</Link>
            </div>
          </div>

          <div className="all-details list-items">

            <ul>
              <li><span>Payment Ref ID</span> <span>{payment.id}</span></li>
              <li><span>Purchased Product</span> <span><Link>{payment.product.id}</Link></span></li>
              <li><span>Payment Status</span> <span>{PRODUCT_PAYMENT_STATUS[payment.status]}</span></li>
              <li><span>Used Coupon</span> <span className='green-c'>{payment.coupon.code} - {payment.coupon.percentage}%</span></li>
              <li><span>Product Price</span> <span className='green-c'>{payment.product.price} LE</span></li>
              <li><span>Delivery Value</span> <span className='green-c'>{payment.delivery_value} LE</span></li>
              <li><span>Vat</span> <span className='green-c'>{payment.vat} LE</span></li>
              <li><span>Coupon Discount Value of total price</span> <span className='green-c'>{`${(payment.total_price * (payment.coupon.percentage / 100)).toFixed(2)}`}</span></li>
              <li><span>Total Payment Price</span> <span className='green-c'>{payment.total_price} LE</span></li>
            </ul>

          </div>

        </div>

        <div className="product-all-details">

          <div className="part-image-left">

            <div className="user-image">
              <img src={appURL + company.logo} alt="" />
            </div>

            <div className="text-part">
              <h6><Link href={route('admin.com.view', company.id)}>{company.name}</Link></h6>
              <span>{company.title}</span>
            </div>

          </div>

          <div className="product-section">
            <div className="product-header">
              <img src={appURL + payment.product.image} alt=""/>
              <div className="product-header-text">
                <h6 className='truncate-500'><Link href={route('admin.products.view', payment.product.id)}>{payment.product.name}</Link></h6>
                <span className='green-c font-semibold'>{payment.product.price} LE</span>
              </div>
            </div>
            <div className="list-items">
              <h5 className='default-title'>Product Details</h5>
              <ul>
                <li>
                  <span>Product Slug</span>
                  <span>{payment.product.slug}</span>
                </li>
                <li>
                  <span>Category / Sub Category</span>
                  <span>{payment.product.category.name} / {payment.product.sub_category.name}</span>
                </li>
                <li>
                  <span>Colors</span>
                  <span>{payment.product.color}</span>
                </li>
                <li>
                  <span>Sizes</span>
                  <span>{payment.product.size}</span>
                </li>
                <li>
                  <span>Quantity</span>
                  <span>{payment.product.qty} piece(s)</span>
                </li>
              </ul>
            </div>
            {payment.product.images.length > 0 ? (
              <div className="list-product-images">
                {payment.product.images.map(img => (
                  <img src={appURL + img.image} alt=""/>
                ))}
              </div>
            ) : (
              <div className="alert alert-dark mt-3">This product doesn't have many images for details please <Link className='alert-link' href={route('admin.products.view.images', payment.product.id)}>Click Here</Link> to add images</div>
            )}
          </div>

        </div>

      </div>

    </AdminLayout>
  );

}

export default CompanyProducts
