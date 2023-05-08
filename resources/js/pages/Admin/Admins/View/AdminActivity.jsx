import './view-admin.scss'

import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";

import { ACTIVITY_ICONS } from "@/helpers/constants";
import { faClock, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { translate } from "@/languages/translate";

import Pagination from "react-bootstrap/Pagination";
import formatDate from "@/helpers/functions/format-date";

const AdminActivity = () => {

  const { admin, activities } = usePage().props;

  return (
    <AdminLayout>

      <Head title={`${translate('admin-activity')} - ${admin.username}`} />

      <AdminHeader title={`${translate('admin-activity')} - ${admin.username}`} icon={faUserShield} />

      <div className="list-activities">

        {activities.data.length > 0 ? (
          <>
            {activities.data.map(a => (
              <Link href={a.url} target={'_blank'} className="activity">

                <div className="left-part">
                  {ACTIVITY_ICONS[a.icon] ?? ACTIVITY_ICONS['default']}
                </div>

                <div className="right-part">
                  <p>{a.title}</p>
                  <span><FontAwesomeIcon icon={faClock} /> {formatDate(a.created_at)}</span>
                </div>
              </Link>
            ))}

            <Pagination size='md'>
              {activities.links.map((link, idx) => (
                <li className="page-item" key={idx + 1}><Link className={`page-link ${link.active ? 'active' : ''}`} href={link.url}>{link.label}</Link></li>
              ))}
            </Pagination>
          </>
        ) : (
          <div className="alert alert-warning alert-sm">No Activities</div>
        )}

      </div>

    </AdminLayout>
  );

}

export default AdminActivity
