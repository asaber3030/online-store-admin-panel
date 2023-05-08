import { faCogs, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import ActionLink from "@/layouts/Admin/ActionLink";

const UserPageHeader = ({ user, appURL, addTitle = '' }) => {

  return (
    <div className="page-header">
      <h5 className='page-title'>
        <img src={appURL + user.picture} alt="User" />
        {addTitle}
        {user.name}
      </h5>
      <div className="actions">
        <ActionLink
          color='secondary'
          title='Update'
          icon={faEdit}
          href={route('admin.users.update', user.id)}
        />
        <ActionLink
          color='primary'
          title='Settings'
          icon={faCogs}
          href={route('admin.users.update', user.id)}
        />
        <ActionLink
          color='danger'
          title='Delete'
          icon={faTrash}
          href={route('admin.users.delete', user.id)}
        />
      </div>
    </div>
  )

}

export default UserPageHeader
