import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";

import { faEdit } from "@fortawesome/free-regular-svg-icons";
import {faEye, faSync, faTasks, faTrash} from "@fortawesome/free-solid-svg-icons";

import createColumn from "@/helpers/functions/create-column";
import formatDate from "@/helpers/functions/format-date";
import {APP_URL} from "@/helpers/constants";

export const AdminsColumns = [
  createColumn('id', 'ID'),
  createColumn('name', 'Name'),
  createColumn('username', 'Username'),
  createColumn('phone', 'Phone Number'),
  createColumn('picture', 'Picture', params => {
    return <img style={{ width: '30px', height: '30px' }} src={APP_URL + params.row.picture} alt=""/>
  }),
  createColumn('created_at', 'Created', params => formatDate(params.row.created_at)),
  createColumn('actions', 'Actions', (params) => (
    <GridActionsContainer
      actions={[
        createActionObject('admin.admins.view.activities', params.row.id, 'Activities', faSync),
        createActionObject('admin.admins.update', params.row.id, 'Update', faEdit),
        createActionObject('admin.admins.delete', params.row.id, 'Delete', faTrash),
      ]}
    />
  ), 1.5),

];
