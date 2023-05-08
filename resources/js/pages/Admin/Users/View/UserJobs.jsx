import './view-user.scss'

// React & Inertia
import { Head, usePage, Link } from "@inertiajs/inertia-react";

// Components
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import UserPageHeader from "@/pages/Admin/Users/View/UserPageHeader";
import UserNavigationMenu from "@/pages/Admin/Users/View/UserNavigationMenu";
import Company from "@/components/Company";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCogs, faEdit, faLink, faTimes, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { translate } from "@/languages/translate";
import { nationalID, phoneNumber } from "@/helpers/functions/student";
import formatDate from "@/helpers/functions/format-date";
import { JobsColumns } from "@/columns/jobs";

// Pictures
import userActivity from '@/assets/images/activity.png'
import deleteAccount from '@/assets/images/delete-account.png'
import userSettings from '@/assets/images/settings.svg'
import shopCart from '@/assets/images/empty-cart.png'
import userJobs from '@/assets/images/job.svg'
import userServices from '@/assets/images/service.svg'
import companyPicture from '@/assets/images/building.svg'
import List from "@/components/List";

const UserJobs = () => {

  const { appURL, user } = usePage().props

  return (
    <AdminLayout>

      <Head title={ translate('view-user') + ' ' + user.username + '#' + user.id } />

      <AdminHeader
        title={ <span>{translate('view-user')} <b>{`${user.username}#${user.id}`}</b></span> }
        icon={faUser}
      />

      <div className="view-user-container">

        <UserNavigationMenu user={user} activePage='jobs' />

        <div className="page-user-content main-user-view">

          <UserPageHeader user={user} appURL={appURL} />

            <List
              columns={JobsColumns}
              rows={user.jobs}
            />

        </div>

      </div>

    </AdminLayout>
  );

}

export default UserJobs
