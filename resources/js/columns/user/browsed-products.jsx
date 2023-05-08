import createColumn from "@/helpers/functions/create-column";
import { Link } from "@inertiajs/inertia-react";
import formatDate from "@/helpers/functions/format-date";

export const BrowsedProductsColumns = [
  createColumn('id', 'ID'),
  createColumn('name', 'Name', params => <Link href={ route('admin.products.view', params.row.product.id) }>{params.row.product.name}</Link>),
  createColumn('category', 'Category', params => <Link href={ route('admin.cat.view.sub', params.row.product.category.id) }>{params.row.product.category.name}</Link>),
  createColumn('sub_category', 'Sub Category', params => params.row.product.sub_category.name),
  createColumn('browsed_in', 'Browsed In', params => formatDate(params.row.created_at)),
];
