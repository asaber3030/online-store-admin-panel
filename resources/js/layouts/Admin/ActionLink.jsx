import './admin-layout.scss'
import { Link } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminHeader = ({ icon, className, color = 'primary', href = '', title, type = 'link' }) => {
  return (
    <>
      {type == 'link' && (
        <Link href={href} className={`btn action-btn btn-sm btn-${color} ${className ?? className}`}>
          <FontAwesomeIcon icon={icon} />
          {title}
        </Link>
      )}
    </>
  )
}

export default AdminHeader
