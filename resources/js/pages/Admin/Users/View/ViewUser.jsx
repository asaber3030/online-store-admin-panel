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

// Pictures
import userActivity from '@/assets/images/activity.png'
import deleteAccount from '@/assets/images/delete-account.png'
import userSettings from '@/assets/images/settings.svg'
import shopCart from '@/assets/images/empty-cart.png'
import userJobs from '@/assets/images/job.svg'
import userServices from '@/assets/images/service.svg'
import companyPicture from '@/assets/images/building.svg'

const ViewUser = () => {

  const { appURL, user } = usePage().props

  console.log(user)

  return (
    <AdminLayout>

      <Head title={ translate('view-user') + ' ' + user.username + '#' + user.id } />

      <AdminHeader
        title={ <span>{translate('view-user')} <b>{`${user.username}#${user.id}`}</b></span> }
        icon={faUser}
      />

      <div className="view-user-container">

        <UserNavigationMenu user={user} activePage={'user'} />

        <div className="page-user-content main-user-view">

          <UserPageHeader user={user} appURL={appURL} />

          <div className="page-main-content">

            <div className="default-section quick-access-links list-items">

              <h6 className='section-title default-title'>Quick Access</h6>

              <Link className='quick-access-link' href={ route('admin.users.view.activity', user.id) }>
                <img src={userActivity} alt=""/>
                <div className="text">
                  <h6>User Activity</h6>
                  <span>See user actions, updates, and any thing related to his activity during website</span>
                </div>
              </Link>

              <Link className='quick-access-link' href={ route('admin.users.view.settings', user.id) }>
                <img src={userSettings} alt=""/>
                <div className="text">
                  <h6>Control Account</h6>
                  <span>Change account details, security, privacy, or change account to verified account</span>
                </div>
              </Link>

              <Link className='quick-access-link' href={ route('admin.users.view.products', user.id) }>
                <img src={shopCart} alt=""/>
                <div className="text">
                  <h6>His Products</h6>
                  <span>What user has published about products</span>
                </div>
              </Link>

              <Link className='quick-access-link' href={ route('admin.users.view.jobs', user.id) }>
                <img src={userJobs} alt=""/>
                <div className="text">
                  <h6>Jobs</h6>
                  <span>User published jobs</span>
                </div>
              </Link>

              <Link className='quick-access-link' href={ route('admin.users.view.services', user.id) }>
                <img src={userServices} alt=""/>
                <div className="text">
                  <h6>His Services</h6>
                  <span>User services</span>
                </div>
              </Link>

              <Link className='quick-access-link delete-c' href={ route('admin.users.delete', user.id) }>
                <img src={deleteAccount} alt=""/>
                <div className="text">
                  <h6>Delete Account</h6>
                  <span>Deleting account temporary or for every</span>
                </div>
              </Link>
            </div>

            <div className="default-section list-items">
              <h6 className='section-title'>User Information</h6>
              <ul>
                <li>
                  <span>IP</span>
                  <span>{user.ip ? user.ip : <span className="red-c">Missing</span>}</span>
                </li>
                <li>
                  <span>National ID</span>
                  <span>{String(user.national_id).length == 14 ? nationalID(user.national_id) : <span className="red-c">Missing</span>}</span>
                </li>
                <li>
                  <span>Verified</span>
                  <span>
                    {user.verified ?
                      (<span className="green-c"><FontAwesomeIcon icon={faCheck} /> Verified</span>)
                    : (
                      <span className="red-c"><FontAwesomeIcon icon={faTimes} /> Not Verified</span>
                    )}
                  </span>
                </li>
                <li>
                  <span>Location URL</span>
                  <span><a href={user.location} target='_blank' style={{ fontWeight: 'bold' }}><FontAwesomeIcon icon={faLink} /> Visit</a></span>
                </li>
                <li>
                  <span>City</span>
                  <span>{user.city}</span>
                </li>
                <li>
                  <span>Address</span>
                  <span>{user.city}</span>
                </li>
                <li>
                  <span>Phone Number</span>
                  <span>+20 {phoneNumber(user.phone)}</span>
                </li>
                <li>
                  <span>Joined</span>
                  <span>{formatDate(user.created_at)}</span>
                </li>
                <li>
                  <span>Last Update</span>
                  <span>{formatDate(user.updated_at)}</span>
                </li>
                <li>
                  <span>E-mail Verified At</span>
                  <span>{user.email_verified_at ? formatDate(user.email_verified_at) : <span className="yellow-c">Not Yet</span>}</span>
                </li>
              </ul>
            </div>

            {user.company ? (
              <Company user={user} className='default-section' company={user.company} />
            ) : (
              <div className="no-company">
                <img src={companyPicture} alt=""/>
                <h6>Company not available</h6>
                <ActionLink
                  title={<span>Create company for <b>{user.username}</b></span>}
                  href={route('admin.com.create')}
                />
              </div>
            )}
          </div>

        </div>

      </div>

    </AdminLayout>
  );

}

export default ViewUser
