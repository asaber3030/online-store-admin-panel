import ActionLink from "@/layouts/Admin/ActionLink";

import { faEye, faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { nationalID } from "@/helpers/functions/student";
import { Link } from "@inertiajs/inertia-react";
import { APP_URL } from "@/helpers/constants";

const User = ({  className, user, key }) => {
  return (
    <div className={`user ${className}`} key={ key ?? Math.random() }>
      <img src={APP_URL + user.picture} alt="user picture" />
      <h6>{user.name}</h6>
      <span>{user.title}</span>

      <div className='list-items'>
        <ul>
          <li><span>{translate('id')}</span> <span>#{user.id}</span></li>
          <li><span>{translate('user')}</span> <span><Link href={route('admin.users.view', user.id)}>{user.username}</Link></span></li>
          <li><span>{translate('national_id')}</span> <span>{nationalID(user.national_id)}</span></li>
          <li><span>{translate('email')}</span> <span>{user.email}</span></li>
          <li><span>{translate('city')}</span> <span>{user.city}</span></li>
          <li><span>{translate('address')}</span> <span>{user.address}</span></li>
          <li><span>{translate('ip')}</span> <span>{user.ip}</span></li>
        </ul>
      </div>

      <div className="actions">

        <ActionLink
          href={route('admin.users.update', user.id)}
          icon={faTrash}
          title={translate('update')}
          color='secondary' />

        <ActionLink
          href={route('admin.users.view', user.id)}
          icon={faEye}
          title={translate('view')}
          color='secondary' />

        <ActionLink
          href={route('admin.users.delete', user.id)}
          icon={faTrash}
          title={translate('delete')}
          color='secondary' />
      </div>
    </div>
  )
}

export default User;
