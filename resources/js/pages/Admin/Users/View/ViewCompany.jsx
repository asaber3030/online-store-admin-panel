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
import { faUser } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { translate } from "@/languages/translate";

// Pictures
import companyPicture from '@/assets/images/building.svg'
import deleteAccount from '@/assets/images/delete-account.png'
import userSettings from '@/assets/images/settings.svg'
import shopCart from '@/assets/images/empty-cart.png'
import userJobs from '@/assets/images/job.svg'
import userServices from '@/assets/images/service.svg'

const ViewCompany = () => {

  const { appURL, user } = usePage().props

  return (
    <AdminLayout>

      <Head title={ translate('view-user') + ' ' + user.username + '#' + user.id } />

      <AdminHeader
        title={ <span>{translate('view-user')} <b>{`${user.username}#${user.id}`}</b></span> }
        icon={faUser}
      />

      <div className="view-user-container">

        <UserNavigationMenu user={user} activePage={'company'} />

        <div className="page-user-content view-user-company">

          <UserPageHeader user={user} appURL={appURL} />

          {user.company ? (
            <>
              <div className="page-main-content">

                <Company user={user} company={user.company} />

                <div className="default-section quick-access-links-company list-items">
                  <div className="list-links">
                    <Link className='quick-access-link'>
                      <img src={userSettings} alt=""/>
                      <div className="text">
                        <h6>Company Settings</h6>
                      </div>
                    </Link>
                    <Link className='quick-access-link'>
                      <img src={shopCart} alt=""/>
                      <div className="text">
                        <h6>Products</h6>
                      </div>
                    </Link>
                    <Link className='quick-access-link'>
                      <img src={userJobs} alt=""/>
                      <div className="text">
                        <h6>Jobs</h6>
                      </div>
                    </Link>
                    <Link className='quick-access-link'>
                      <img src={userServices} alt=""/>
                      <div className="text">
                        <h6>Services</h6>
                      </div>
                    </Link>
                    <Link className='quick-access-link delete-c'>
                      <img src={deleteAccount} alt=""/>
                      <div className="text">
                        <h6>Delete Company</h6>
                      </div>
                    </Link>
                  </div>

                  <div className="company-latest-details">

                  </div>
                </div>

              </div>

            </>
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

    </AdminLayout>
  );

}

export default ViewCompany
