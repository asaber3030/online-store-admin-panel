import { Link } from "@inertiajs/inertia-react";

import createColumn from "@/helpers/functions/create-column";
import formatDate from "@/helpers/functions/format-date";

export const PurchasedServicesColumns = [
  createColumn('id', 'Payment ID'),
  createColumn('service', 'Service', params => <Link href={route('admin.services.view', params.row.service.id)}>{params.row.service.name}</Link>),
  createColumn('User', 'User', params => <Link href={route('admin.users.view', params.row.user.id)}>{params.row.user.username}</Link>),
  createColumn('salary', 'Salary', params => <span className="green-c">{params.row.salary} LE</span>),
  createColumn('ordered_in', 'Ordered In', params => formatDate(params.row.created_at)),
];
