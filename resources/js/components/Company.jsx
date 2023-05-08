import ActionLink from "@/layouts/Admin/ActionLink";

import { faEye, faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { Link } from "@inertiajs/inertia-react";
import { APP_URL } from "@/helpers/constants";

const Company = ({ company, key, className, user }) => {
  return (

    <div className={`company ${className}`} key={ key ?? Math.random() }>

      <img src={APP_URL + company.logo} alt="Company logo" />

      <h6>{company.name}</h6>

      <span>{company.title}</span>

      <div className='list-items'>
        <ul>
          <li><span>{translate('id')}</span>        <span>#{company.id}</span></li>
          <li><span>{translate('user')}</span>      <span><Link>{user ? user.username : company.user.username}</Link></span></li>
          <li><span>{translate('products')}</span>  <span><Link>{user.products_count} Products</Link></span></li>
          <li><span>{translate('jobs')}</span>      <span><Link>{user.jobs_count} Jobs</Link></span></li>
          <li><span>{translate('services')}</span>  <span><Link>{user.services_count} Services</Link></span></li>
        </ul>
      </div>

      <p>{company.about}</p>

      <div className="actions">

        <ActionLink
          href={route('admin.com.update', company.id)}
          icon={faTrash}
          title={translate('update')}
          color='secondary' />

        <ActionLink
          href={route('admin.com.view', company.id)}
          icon={faEye}
          title={translate('view')}
          color='secondary' />

        <ActionLink
          href={route('admin.com.message', company.id)}
          icon={faPaperPlane}
          title={translate('message')}
          color='secondary' />

        <ActionLink
          href={route('admin.com.delete', company.id)}
          icon={faTrash}
          title={translate('delete')}
          color='secondary' />
      </div>
    </div>
  )
}

export default Company;
