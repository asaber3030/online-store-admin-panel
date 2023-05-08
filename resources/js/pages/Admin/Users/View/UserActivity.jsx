import './view-user.scss'

// React & Inertia
import { Head, usePage, Link } from "@inertiajs/inertia-react";

// Components
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import UserPageHeader from "@/pages/Admin/Users/View/UserPageHeader";
import UserNavigationMenu from "@/pages/Admin/Users/View/UserNavigationMenu";
import Pagination from "react-bootstrap/Pagination";

// Icons
import { faClock, faUser } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { translate } from "@/languages/translate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ACTIVITY_ICONS } from "@/helpers/constants";
import formatDate from "@/helpers/functions/format-date";

const UserActivity = () => {

  const { appURL, user, activities } = usePage().props

  return (
    <AdminLayout>

      <Head title={ translate('view-user') + ' ' + user.username + '#' + user.id } />

      <AdminHeader
        title={ <span>{translate('view-user')} <b>{`${user.username}#${user.id}`}</b></span> }
        icon={faUser}
      />

      <div className="view-user-container">

        <UserNavigationMenu user={user} activePage={'activity'} />

        <div className="page-user-content">

          <UserPageHeader user={user} appURL={appURL} />

          <div className="page-main-content">

            <div className="list-activities">

              {activities.data.length > 0 ? (
                <>
                  {activities.data.map(a => (
                    <Link href={a.url} target='_blank' className="activity">

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

          </div>

        </div>

      </div>

    </AdminLayout>
  );

}

export default UserActivity
