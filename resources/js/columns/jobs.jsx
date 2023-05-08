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

export const JobsColumns = [
  createColumn('id', 'ID'),
  createColumn('title', 'Job'),
  createColumn('status', 'Status', params => params.row.deleted_at == null ? <b className="green-c">Available</b> : <b className="red-c">Deleted</b>),
  createColumn('publisher', 'Publisher', params => <Link href={route('admin.users.view', params.row.user.id)}>{params.row.user.username}</Link>),
  createColumn('category', 'Category', params => <Link href={route('admin.cat.view.sub', params.row.category.id)}>{params.row.category.name}</Link>),
  createColumn('sub_category', 'Sub Category', params => <span className="badge bg-secondary">{params.row.sub_category.name}</span>),
  createColumn('contract_type', 'Contract Type', params => <b>{CONTRACT_TYPE_OBJECT[params.row.contract_type]}</b>),
  createColumn('salary', 'Salary', params => <b className='green-c'>{Intl.NumberFormat().format(params.row.salary)} LE</b>),
  createColumn('created_at', 'Created', params => formatDate(params.row.created_at)),
  createColumn('actions', 'Actions', (params) => (
    <GridActionsContainer
      actions={[
        createActionObject('admin.jobs.view', params.row.id, 'View', faEye),
        createActionObject('admin.jobs.update', params.row.id, 'Update', faEdit),
        createActionObject('admin.jobs.delete', params.row.id, 'Delete', faTrash),
      ]}
    />
  ), 1.5),

];
