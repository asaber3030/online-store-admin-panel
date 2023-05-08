import createColumn from "@/helpers/functions/create-column";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";
import { Link } from "@inertiajs/inertia-react";
import {
  faEye, faImages,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

import formatDate from "@/helpers/functions/format-date";

export const ProductsColumns = [
  createColumn('id', 'ID'),
  createColumn('name', 'Name'),
  createColumn('category', 'Category', params => <Link href={route('admin.cat.view.sub', params.row.category.id)}>{params.row.category.name}</Link>),
  createColumn('sub_category', 'Sub Category', params => params.row.sub_category.name),
  createColumn('type', 'Creator', params => params.row.type == 0 ? <span className="badge bg-primary">User</span> : <span className="badge bg-success">Company</span>),
  createColumn('brand', 'Brand'),
  createColumn('color', 'Color'),
  createColumn('size', 'Size'),
  createColumn('updated_at', 'Last Update', params => formatDate(params.row.updated_at)),
  createColumn('actions', 'Actions', (params) => (
    <GridActionsContainer
      actions={[
        createActionObject('admin.products.view', params.row.id, 'View', faEye),
        createActionObject('admin.products.update', params.row.id, 'Update', faEdit),
        createActionObject('admin.products.delete', params.row.id, 'Delete', faTrash),
        createActionObject('admin.products.view.images', params.row.id, 'Pictures', faImages),
      ]}
    />
  ), 1.5),

];
