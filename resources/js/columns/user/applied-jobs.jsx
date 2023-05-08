import createColumn from "@/helpers/functions/create-column";
import { Link } from "@inertiajs/inertia-react";
import formatDate from "@/helpers/functions/format-date";
import GridActionsContainer, {createActionObject} from "@/helpers/functions/createAction";
import {faEye, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {faEdit, faPaperPlane, faTrashAlt} from "@fortawesome/free-regular-svg-icons";

export const UserAppliedJobsColumns = [
  createColumn('id', 'ID'),
  createColumn('job', 'Job', params => <Link href={ route('admin.jobs.view', params.row.job.id) }>{params.row.job.title}</Link>),
  createColumn('category', 'Category', params => <Link href={ route('admin.cat.view.sub', params.row.job.category.id) }>{params.row.job.category.name}</Link>),
  createColumn('sub_category', 'Sub Category', params => params.row.job.sub_category.name),
  createColumn('created_at', 'Applied In', params => formatDate(params.row.created_at)),
  createColumn('actions', 'Actions', (params) => (
    <GridActionsContainer
      actions={[
        createActionObject('admin.jobs.view', params.row.job.id, 'View', faEye),
      ]}
    />
  ), 1.5),
];
