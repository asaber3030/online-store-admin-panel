import createColumn from "@/helpers/functions/create-column";
import { Link } from "@inertiajs/inertia-react";
import formatDate from "@/helpers/functions/format-date";

export const BrowsedJobsColumns = [
  createColumn('id', 'ID'),
  createColumn('job', 'Job', params => <Link href={ route('admin.jobs.view', params.row.job.id) }>{params.row.job.title}</Link>),
  createColumn('category', 'Category', params => <Link href={ route('admin.cat.view.sub', params.row.job.category.id) }>{params.row.job.category.name}</Link>),
  createColumn('sub_category', 'Sub Category', params => params.row.job.sub_category.name),
  createColumn('browsed_in', 'Browsed In', params => formatDate(params.row.created_at)),
];
