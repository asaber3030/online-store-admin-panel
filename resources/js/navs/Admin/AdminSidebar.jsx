import './style-navs.scss'

import { usePage } from "@inertiajs/inertia-react";

import UserImage from '@/assets/images/user.svg'
import SidebarItem from "@/navs/Admin/SidebarItem";
import {
  faBell, faBuilding,
  faCog, faFileExport, faFileImport,
  faHelmetSafety,
  faHome, faLayerGroup,
  faLock,
  faShoppingCart,
  faSyncAlt, faTrash,
  faUserLock, faUsers, faUserShield
} from "@fortawesome/free-solid-svg-icons";

import { DEFAULT_IMAGE_ADMIN } from "@/helpers/constants";
import { translate } from "@/languages/translate";

const AdminSidebar = () => {

  const { admin, appURL } = usePage().props

  return (
    <div className="app-admin-sidebar">
      <div className="admin-top-sidebar">
        <img className={`${admin.picture == DEFAULT_IMAGE_ADMIN ? 'default-pic-admin' : ''}`} src={appURL + admin.picture ?? UserImage} alt="User Image" />
        <h6>{admin.name}</h6>
        <span>{admin.username}</span>
      </div>

      <div className="sidebar-content">

        <div className="sidebar-links-container">
          <h6 className='links-title'>{translate('customer')}</h6>
          <ul>
            <SidebarItem
              icon={faHome}
              title={translate('dashboard')}
              href={route('admin.dashboard')} />

            <SidebarItem
              icon={faUsers}
              title={translate('users')}
              href={route('admin.users.list')} />

            <SidebarItem
              icon={faUserShield}
              title={translate('admins')}
              href={route('admin.admins.list')} />

            <SidebarItem
              icon={faLayerGroup}
              title={translate('categories')}
              href={route('admin.cat.list')} />

            <SidebarItem
              icon={faBuilding}
              title={translate('companies')}
              href={route('admin.com.list')} />

            <SidebarItem
              icon={faShoppingCart}
              title={translate('products')}
              href={route('admin.products.list')} />

            <SidebarItem
              icon={faHelmetSafety}
              title={translate('jobs')}
              href={route('admin.jobs.list')} />

            <SidebarItem
              icon={faSyncAlt}
              title={translate('services')}
              href={route('admin.services.list')} />

          </ul>
        </div>

        <div className="sidebar-links-container">
          <h6 className='links-title'>{translate('app')}</h6>
          <ul>
            <SidebarItem
              icon={faCog}
              href={route('admin.settings.main')}
              title={translate('settings')} />

          </ul>
        </div>

      </div>

    </div>
  )
}

export default AdminSidebar
