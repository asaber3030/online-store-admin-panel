import createColumn from "@/helpers/functions/create-column";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

import { nationalID } from "@/helpers/functions/student";

export const UsersColumns = [
  createColumn('id', 'ID'),
  createColumn('name', 'Name'),
  createColumn('username', 'Username'),
  createColumn('phone', 'Phone Number'),
  createColumn('national_id', 'National ID', params => String(params.row.national_id).length == 14 ? nationalID(params.row.national_id) : <span className="red-c">Invalid ID</span>),
  createColumn('ip', 'IP', params => params.row.ip ? params.row.ip : <span className="red-c">Missing</span>),
  createColumn('actions', 'Actions', (params) => (
    <GridActionsContainer
      actions={[
        createActionObject('admin.users.view', params.row.id, 'View', faEye),
        createActionObject('admin.users.update', params.row.id, 'Update', faEdit),
        createActionObject('admin.users.delete', params.row.id, 'Delete', faTrash),
      ]}
    />
  ), 1.5),

];
