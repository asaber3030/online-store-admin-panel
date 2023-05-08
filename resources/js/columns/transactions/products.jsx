import createColumn from "@/helpers/functions/create-column";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";
import { Link } from "@inertiajs/inertia-react";
import {
  faEye, faImages, faPrint,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

import { APP_URL } from "@/helpers/constants";

import formatDate from "@/helpers/functions/format-date";
import {PRODUCT_PAYMENT_STATUS} from "@/helpers/constants";

export const PurchasedProductsColumns = [
  createColumn('id', 'Payment ID'),
  createColumn('product', 'Name', params => params.row.product.name),
  createColumn('image', 'Picture', params => <img src={APP_URL + params.row.product.image} alt=""/>),
  createColumn('coupon', 'Coupon', params => params.row.coupon.code + ' ' + params.row.coupon.percentage + '%'),
  createColumn('User', 'User', params => <Link href={route('admin.users.view', params.row.user.username)}>{params.row.user.username}</Link>),
  createColumn('price', 'Product price', params => <span className="green-c">{params.row.price} LE</span>),
  createColumn('total_price', 'Total Price', params => <span className="green-c">{params.row.total_price} LE</span>),
  createColumn('status', 'Status', params => PRODUCT_PAYMENT_STATUS[params.row.status]),
  createColumn('ordered_in', 'Ordered In', params => formatDate(params.row.created_at)),
  createColumn('actions', 'Actions', (params) => (
    <GridActionsContainer
      actions={[
        createActionObject('admin.com.view.trans.products.view', [params.row.company.id, params.row.id], 'View', faEye),
        createActionObject('admin.com.view.trans.products.print', [params.row.company.id, params.row.id], 'Print', faPrint),
      ]}
    />
  ), 1.5),

];
