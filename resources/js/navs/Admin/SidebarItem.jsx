import { Link } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarItem = ({ title, icon, href }) => {
  return (
    <li className='sidebar-item'>
      <Link href={href}>
        <FontAwesomeIcon icon={icon} />
        <span>{title}</span>
      </Link>
    </li>
  )
}

export default SidebarItem
