import './admin-layout.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminHeader = ({ children, title, icon }) => {
  return (
    <div className="app-header">
      <h4><FontAwesomeIcon icon={icon} /> <span style={{ marginLeft: '5px' }}>{title}</span></h4>

      <div className="app-header-actions">
        {children}
      </div>
    </div>
  )
}

export default AdminHeader
