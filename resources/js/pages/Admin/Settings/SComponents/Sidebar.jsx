import './components-style.scss'

import { Link } from "@inertiajs/inertia-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faHome, faLink, faLock, faUserLock, faUserShield} from "@fortawesome/free-solid-svg-icons";


const AppSettingsSidebar = () => {
  return (
    <div className="app-settings-sidebar">

      <h6 className='ul-title'>Resources</h6>
      <ul>
        <li><Link href={ route('admin.settings.main') } className={`link-make`}><FontAwesomeIcon icon={faHome} /> App</Link></li>
        <li><Link href={ route('admin.settings.api.main') } className={`link-make`}><FontAwesomeIcon icon={faLink} /> API</Link></li>
        <li><Link href={ route('admin.settings.passwords') } className={`link-make`}><FontAwesomeIcon icon={faLock} /> Passwords</Link></li>
        <li><Link href={ route('admin.settings.admin') } className={`link-make`}><FontAwesomeIcon icon={faUserShield} /> Admin</Link></li>
      </ul>

    </div>

  )
}

export default AppSettingsSidebar
