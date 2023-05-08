import createColumn from "@/helpers/functions/create-column";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faPaperPlane, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import { Link } from "@inertiajs/inertia-react";
import {faCog, faExclamationCircle, faEye, faPlus, faShoppingCart} from "@fortawesome/free-solid-svg-icons";

import { APP_URL } from "@/helpers/constants";

export const CompaniesColumns = [
  createColumn('id', 'ID'),
  createColumn('Creator', 'Creator', (params) => {
    return (<Link href={''}>{params.row.user.username}</Link>)
  }),
  createColumn('name', 'Name'),
  createColumn('logo', 'Logo', (params) => {
    return <img style={{ width: '30px', height: '30px' }} src={APP_URL + params.row.logo} alt=""/>
  }),
  createColumn('title', 'Title'),
  createColumn('email', 'E-mail'),
  createColumn('phone', 'Contact Number'),
  createColumn('website', 'Website', (params) => <a target='_blank' href={params.row.website}>Visit</a>),
  createColumn('facebook', 'Official Page', (params) => <a target='_blank' href={params.row.facebook}>Facebook</a>),
  createColumn('actions', 'Actions', (params) => (
    <GridActionsContainer
      actions={[
        createActionObject('admin.com.view', params.row.id, 'View', faEye),
        createActionObject('admin.com.update', params.row.id, 'Update', faEdit),
        createActionObject('admin.com.delete', params.row.id, 'Delete', faTrashAlt),
        createActionObject('admin.com.message', params.row.id, 'Message', faPaperPlane),
        createActionObject('admin.dashboard', null, 'Products', faShoppingCart),
      ]}
    />
  ), 1.5),

];
