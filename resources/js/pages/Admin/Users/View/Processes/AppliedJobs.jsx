import '../view-user.scss'

// React & Inertia
import { Head, usePage } from "@inertiajs/inertia-react";

// Components
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import UserPageHeader from "@/pages/Admin/Users/View/UserPageHeader";
import UserNavigationMenu from "@/pages/Admin/Users/View/UserNavigationMenu";
import List from "@/components/List";

// Icons
import { faUser } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { translate } from "@/languages/translate";
import { UserAppliedJobsColumns } from "@/columns/user/applied-jobs";

const AppliedJobs = () => {

  const { appURL, user } = usePage().props

  return (
    <AdminLayout>

      <Head title={ translate('view-user') + ' ' + user.username + '#' + user.id } />

      <AdminHeader
        title={ <span>{translate('view-user')} <b>{`${user.username}#${user.id}`}</b></span> }
        icon={faUser}
      />

      <div className="view-user-container">

        <UserNavigationMenu user={user} activePage='job-applicants' />

        <div className="page-user-content main-user-view">

          <UserPageHeader user={user} appURL={appURL} addTitle='Applied Jobs - ' />

          <List
            columns={UserAppliedJobsColumns}
            rows={user.job_applicants}
            checkBox={false}
          />

        </div>

      </div>

    </AdminLayout>
  );

}

export default AppliedJobs
