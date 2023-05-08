import createColumn from "@/helpers/functions/create-column";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

import formatDate from "@/helpers/functions/format-date";

export const SubCategoriesColumns = [
  createColumn('id', 'ID'),
  createColumn('name', 'Name'),
  createColumn('category', 'Category', params => params.row.category.name),
  createColumn('created_at', 'Created In', params => formatDate(params.row.created_at)),
  createColumn('updated_at', 'Last Update', params => formatDate(params.row.updated_at)),
  createColumn('actions', 'Actions', (params) => (
    <GridActionsContainer
      actions={[
        createActionObject('admin.cat.update.sub', [params.row.category.id, params.row.id], 'Update', faEdit),
        createActionObject('admin.cat.delete.sub', [params.row.category.id, params.row.id], 'Delete', faTrash),
      ]}
    />
  ), 1.5),
];
