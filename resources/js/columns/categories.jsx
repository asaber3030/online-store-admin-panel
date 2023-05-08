import createColumn from "@/helpers/functions/create-column";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";

import { Link } from "@inertiajs/inertia-react";
import { faLayerGroup, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

import {APP_URL, CATEGORIES_TYPES_OBJECT} from "@/helpers/constants";
import formatDate from "@/helpers/functions/format-date";

export const CategoriesColumns = [
  createColumn('id', 'ID'),
  createColumn('name', 'Name'),
  createColumn('type', 'Type', params => `Code: ${params.row.type}` + ' - ' + CATEGORIES_TYPES_OBJECT[params.row.type]),
  createColumn('icon', 'Icon', params => {
    return <img style={{ width: '30px', height: '30px' }} src={APP_URL + params.row.icon} alt=""/>
  }),
  createColumn('no_of_sub', 'No. Of Sub Categories', params => <Link><b>{params.row.sub_categories_count}</b> sub category(ies)</Link>),
  createColumn('no_of_products', 'No. Of Products', params => <Link><b>{params.row.products_count}</b> product(s)</Link>),
  createColumn('created_at', 'Created In', params => formatDate(params.row.created_at)),
  createColumn('updated_at', 'Last Update', params => formatDate(params.row.updated_at)),
  createColumn('actions', 'Actions', (params) => (
    <GridActionsContainer
      actions={[
        createActionObject('admin.cat.update', params.row.id, 'Update', faEdit),
        createActionObject('admin.cat.delete', params.row.id, 'Delete', faTrash),
        createActionObject('admin.cat.view.sub', params.row.id, 'Sub Categories', faLayerGroup),
      ]}
    />
  ), 1.5),

];
