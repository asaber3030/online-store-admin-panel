import createColumn from "@/helpers/functions/create-column";
import { Link } from "@inertiajs/inertia-react";
import formatDate from "@/helpers/functions/format-date";

export const BrowsedServicesColumns = [
  createColumn('id', 'ID'),
  createColumn('name', 'Name', params => <Link href={ route('admin.services.view', params.row.service.id) }>{params.row.service.name}</Link>),
  createColumn('category', 'Category', params => <Link href={ route('admin.cat.view.sub', params.row.service.category.id) }>{params.row.service.category.name}</Link>),
  createColumn('sub_category', 'Sub Category', params => params.row.service.sub_category.name),
  createColumn('browsed_in', 'Browsed In', params => formatDate(params.row.created_at)),
];
