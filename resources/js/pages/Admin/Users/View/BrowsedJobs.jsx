import './view-user.scss'

// React & Inertia
import { Head, usePage } from "@inertiajs/inertia-react";

// Components
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import UserPageHeader from "@/pages/Admin/Users/View/UserPageHeader";
import UserNavigationMenu from "@/pages/Admin/Users/View/UserNavigationMenu";

// Icons
import { faUser } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { translate } from "@/languages/translate";
import { BrowsedJobsColumns } from "@/columns/user/browsed-jobs";
import List from "@/components/List";

const BrowsedJobs = () => {

  const { appURL, user } = usePage().props

  return (
    <AdminLayout>

      <Head title={ translate('view-user') + ' ' + user.username + '#' + user.id } />

      <AdminHeader
        title={ <span>{translate('view-user')} <b>{`${user.username}#${user.id}`}</b></span> }
        icon={faUser}
      />

      <div className="view-user-container">

        <UserNavigationMenu user={user} activePage='browsed-jobs' />

        <div className="page-user-content main-user-view">

          <UserPageHeader user={user} appURL={appURL} />

          <List
            columns={BrowsedJobsColumns}
            rows={user.browsed_jobs}
          />

        </div>

      </div>

    </AdminLayout>
  );

}

export default BrowsedJobs
