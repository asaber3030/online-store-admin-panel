import createColumn from "@/helpers/functions/create-column";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import {
  faEye, faImages,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import formatDate from "@/helpers/functions/format-date";
import {Link} from "@inertiajs/inertia-react";
import {CONTRACT_TYPE_OBJECT} from "@/helpers/constants";

export const ServicesColumns = [
  createColumn('id', 'ID'),
  createColumn('name', 'Service'),
  createColumn('publisher', 'Publisher', params => <Link href={route('admin.users.view', params.row.user.id)}>{params.row.user.username}</Link>),
  createColumn('category', 'Category', params => <Link href={route('admin.cat.view.sub', params.row.category.id)}>{params.row.category.name}</Link>),
  createColumn('sub_category', 'Sub Category', params => <span className="badge bg-secondary">{params.row.sub_category.name}</span>),
  createColumn('salary', 'Salary', params => <b className='green-c'>{params.row.salary != 0 ?Intl.NumberFormat().format(params.row.salary) + ' LE' : 'Not Available'}</b>),
  createColumn('salary_per_hour', 'Salary/Hr', params => <b>{params.row.salary != 0 ?Intl.NumberFormat().format(params.row.salary_per_hour) + '  LE/hr' : 'Not Available'}</b>),
  createColumn('created_at', 'Created', params => formatDate(params.row.created_at)),
  createColumn('actions', 'Actions', (params) => (
    <GridActionsContainer
      actions={[
        createActionObject('admin.services.view', params.row.id, 'View', faEye),
        createActionObject('admin.services.update', params.row.id, 'Update', faEdit),
        createActionObject('admin.services.delete', params.row.id, 'Delete', faTrash),
      ]}
    />
  ), 1.5),

];
