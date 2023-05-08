import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping, faBriefcase, faBuilding, faCarSide,
  faCog,
  faHelicopter,
  faLink, faRocket,
  faShoppingCart, faSyncAlt,
  faTrash,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "@inertiajs/inertia-react";
import {translate} from "@/languages/translate";

const UserNavigationMenu = ({ user, activePage }) => {

  return (
    <div className="user-navigation-menu">

      <Link
        href={route('admin.users.view', user.id)}
        className={`nav-user-item ${activePage == 'user' && 'active-item'}`}>
        <span className='item-icon'><FontAwesomeIcon icon={faUser} /></span>
        <span className='item-text' style={{ fontWeight: 'bold' }}>{user.username}</span>
      </Link>

      <Link
        href={route('admin.users.view.company', user.id)}
        className={`nav-user-item ${activePage == 'company' && 'active-item'}`}>
        <span className='item-icon'><FontAwesomeIcon icon={faBuilding} /></span>
        <span className='item-text'>{translate('company')}</span>
      </Link>

      <Link
        href={route('admin.users.view.activity', user.id)}
        className={`nav-user-item ${activePage == 'activity' && 'active-item'}`}>
        <span className='item-icon'><FontAwesomeIcon icon={faLink} /></span>
        <span className='item-text'>{translate('user-activity')}</span>
      </Link>

      <hr/>

      <Link
        href={route('admin.users.view.products', user.id)}
        className={`nav-user-item ${activePage == 'products' && 'active-item'}`}>
        <span className='item-icon'><FontAwesomeIcon icon={faBagShopping} /></span>
        <span className='item-text'>{translate('products')}</span>
      </Link>

      <Link
        href={route('admin.users.view.services', user.id)}
        className={`nav-user-item ${activePage == 'services' && 'active-item'}`}>
        <span className='item-icon'><FontAwesomeIcon icon={faRocket} /></span>
        <span className='item-text'>{translate('services')}</span>
      </Link>

      <Link
        href={route('admin.users.view.jobs', user.id)}
        className={`nav-user-item ${activePage == 'jobs' && 'active-item'}`}>
        <span className='item-icon'><FontAwesomeIcon icon={faCarSide} /></span>
        <span className='item-text'>{translate('jobs')}</span>
      </Link>

      <hr/>

      <Link
        href={route('admin.users.view.products.browsed', user.id)}
        className={`nav-user-item ${activePage == 'browsed-products' && 'active-item'}`}>
        <span className='item-icon'><FontAwesomeIcon icon={faShoppingCart} /></span>
        <span className='item-text'>{translate('browsed-products')}</span>
      </Link>

      <Link
        href={route('admin.users.view.services.browsed', user.id)}
        className={`nav-user-item ${activePage == 'browsed-services' && 'active-item'}`}>
        <span className='item-icon'><FontAwesomeIcon icon={faHelicopter} /></span>
        <span className='item-text'>{translate('browsed-services')}</span>
      </Link>

      <Link
        href={route('admin.users.view.jobs.browsed', user.id)}
        className={`nav-user-item ${activePage == 'browsed-jobs' && 'active-item'}`}>
        <span className='item-icon'><FontAwesomeIcon icon={faBagShopping} /></span>
        <span className='item-text'>{translate('browsed-jobs')}</span>
      </Link>

      <hr/>

      <Link
        href={route('admin.users.view.products.purchased', user.id)}
        className={`nav-user-item ${activePage == 'purchased-products' && 'active-item'}`}>
        <span className='item-icon'><FontAwesomeIcon icon={faBagShopping} /></span>
        <span className='item-text'>{translate('purchased-products')}</span>
      </Link>

      <Link
        href={route('admin.users.view.services.purchased', user.id)}
        className={`nav-user-item ${activePage == 'purchased-services' && 'active-item'}`}>
        <span className='item-icon'><FontAwesomeIcon icon={faSyncAlt} /></span>
        <span className='item-text'>{translate('purchased-services')}</span>
      </Link>

      <Link
        href={route('admin.users.view.jobs.applied', user.id)}
        className={`nav-user-item ${activePage == 'job-applicants' && 'active-item'}`}>
        <span className='item-icon'><FontAwesomeIcon icon={faBriefcase} /></span>
        <span className='item-text'>{translate('applied-jobs')}</span>
      </Link>

      <hr />

      <Link
        href={route('admin.users.view.settings', user.id)}
        className={`nav-user-item ${activePage == 'settings' && 'active-item'}`}>
        <span className='item-icon'><FontAwesomeIcon icon={faCog} /></span>
        <span className='item-text'>{translate('settings')}</span>
      </Link>

      <Link
        href={route('admin.users.delete', user.id)}
        className={`nav-user-item ${activePage == 'delete-user' && 'active-item'} red-c`}>
        <span className='item-icon'><FontAwesomeIcon icon={faTrash} /></span>
        <span className='item-text'>{translate('delete-user')}</span>
      </Link>

    </div>
  )

}

export default UserNavigationMenu
