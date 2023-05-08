import './view-company.scss'

import { Link } from "@inertiajs/inertia-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faDollar, faEdit, faHandsHelping, faHelmetSafety, faHome, faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";

import { APP_URL } from "@/helpers/constants";
import { translate } from "@/languages/translate";

import formatDate from "@/helpers/functions/format-date";

const CompanySidebar = ({ company, activePage }) => {

  return (
    <div className="company-sidebar">

      <div className="company-header-top">
        <img src={APP_URL + company.logo} alt=""/>
        <div className="text">
          <h6>{company.name}</h6>
          <span>{company.title}</span>
        </div>
      </div>

      <ul>
        <li><Link href={route('admin.com.view', company.id)} className={`link-make ${activePage == 'main' && 'active-link' }`}><FontAwesomeIcon icon={faHome} /> {company.name}</Link></li>
        <li><Link href={route('admin.com.view.products', company.id)} className={`link-make ${activePage == 'products' && 'active-link'}`}><FontAwesomeIcon icon={faShoppingCart} /> {translate('products')}</Link></li>
        <li><Link href={route('admin.com.view.services', company.id)} className={`link-make ${activePage == 'services' && 'active-link'}`}><FontAwesomeIcon icon={faHandsHelping} /> {translate('services')}</Link></li>
        <li><Link href={route('admin.com.view.jobs', company.id)} className={`link-make ${activePage == 'jobs' && 'active-link'}`}><FontAwesomeIcon icon={faHelmetSafety} /> {translate('jobs')}</Link></li>
        <hr/>
        <li><Link href={route('admin.com.view.trans.products', company.id)} className={`link-make ${activePage == 'purchased-products' && 'active-link'}`}><FontAwesomeIcon icon={faDollar} /> {translate('purchased-products')}</Link></li>
        <hr/>
        <li><Link href={route('admin.com.view.products.stats', company.id)} className={`link-make ${activePage == 'products-stats' && 'active-link'}`}><FontAwesomeIcon icon={faShoppingCart} /> {translate('products-stats')}</Link></li>
        <li><Link href={route('admin.com.view.services.stats', company.id)} className={`link-make ${activePage == 'services-stats' && 'active-link'}`}><FontAwesomeIcon icon={faHandsHelping} /> {translate('services-stats')}</Link></li>
        <hr/>
        <li><Link href={route('admin.com.view.settings.main', company.id)} className={`link-make ${activePage == 'settings' && 'active-link'}`}><FontAwesomeIcon icon={faCog} /> {translate('settings')}</Link></li>
        <li><Link href={route('admin.com.update', company.id)} className={`link-make`}><FontAwesomeIcon icon={faEdit} /> Update Details</Link></li>
        <hr/>
        <li><Link href={route('admin.com.delete', company.id)} className={`link-make delete-link ${activePage == 'delete' && 'active-link'}`}><FontAwesomeIcon icon={faTrash} /> {translate('delete-company')}</Link></li>
      </ul>
      <ul className='list-items'>
        <li><span>{translate('email')}</span> <span className='truncate-230'>{company.email}</span></li>
        <li><span>{translate('phone')}</span> <span className='truncate-230'>+20 {company.phone}</span></li>
        <li><span>{translate('website')}</span> <a target='_blank' href={company.website}>Website</a></li>
        <li><span>{translate('facebook')}</span> <a target='_blank' href={company.facebook}>Facebook</a></li>
        <li><span>{translate('created-in')}</span> <span className='truncate-230'>{formatDate(company.created_at)}</span></li>
        <li><span>{translate('last-updated-company')}</span> <span className='truncate-230'>{formatDate(company.updated_at)}</span></li>
      </ul>
    </div>
  );

}

export default CompanySidebar
