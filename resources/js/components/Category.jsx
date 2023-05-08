import { translate } from "@/languages/translate";
import { APP_URL } from "@/helpers/constants";
import { Link } from "@inertiajs/inertia-react";
import {faEdit, faEye, faLayerGroup, faPaperPlane, faTrash} from "@fortawesome/free-solid-svg-icons";

import formatDate from "@/helpers/functions/format-date";
import ActionLink from "@/layouts/Admin/ActionLink";

const Company = ({ category, key }) => {
  return (
    <div className="category-card" key={ key ?? Math.random() }>
      <img src={APP_URL + category.icon} alt="Category logo" />
      <h6>{category.name}</h6>
      <span>{category.title}</span>

      <div className='list-items'>
        <ul>
          <li><span>{translate('id')}</span> <span>#{category.id}</span></li>
          <li><span>{translate('category')}</span> <span><Link>{category.name}</Link></span></li>
          <li><span>{translate('no-of-products')}</span> <span><Link>{category.products_count} Products</Link></span></li>
          <li><span>{translate('no-of-sub-categories')}</span> <span><Link>{category.sub_categories_count} Products</Link></span></li>
          <li><span>{translate('last-update')}</span> <span>{formatDate(category.created_at)}</span></li>
          <li><span>{translate('created-in')}</span> <span>{formatDate(category.updated_at)}</span></li>
        </ul>
      </div>

      <div className="actions">
        <ActionLink href={route('admin.cat.update', category.id)} icon={faEdit} title={translate('update')} color='secondary' />
        <ActionLink href={route('admin.cat.view.sub', category.id)} icon={faEye} title={translate('view')} color='secondary' />
        <ActionLink href={route('admin.cat.delete', category.id)} icon={faTrash} title={translate('delete')} color='secondary' />
      </div>
    </div>
  )
}

export default Company;
