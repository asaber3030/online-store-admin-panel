import {translate} from "@/languages/translate";
import './style-navs.scss'
import NavDropdown from 'react-bootstrap/NavDropdown';

import LightMode from '@/assets/images/light.svg'
import DarkMode from '@/assets/images/dark.svg'
import EnglishLang from '@/assets/images/english.svg'
import ArabicLang from '@/assets/images/arabic.svg'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {usePage} from "@inertiajs/inertia-react";
import {
  faBell,
  faCheck,
  faCog,
  faEllipsisH, faGlobe,
  faIdCard,
  faLock, faPalette,
  faQuestionCircle,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import UserImage from '@/assets/images/user.svg'

const AdminNavbar = () => {
  const { admin } = usePage().props
  return (
    <div className="admin-navbar">

      <div className="left-navbar">

        {/*<div className="custom-dropdown">*/}
        {/*  <h6>*/}
        {/*    <FontAwesomeIcon icon={faBell} />*/}
        {/*    <span className="badge bg-danger">5</span>*/}
        {/*  </h6>*/}

        {/*  <div className="dropdown-c-content">*/}
        {/*    <div className="notification-header">*/}
        {/*      <h6>Notifications</h6>*/}
        {/*      <div className="right">*/}
        {/*        <NavDropdown id="nav-dropdown-dark-example" title={<FontAwesomeIcon icon={faEllipsisH}/>}>*/}
        {/*          <NavDropdown.Item href="#action/3.1">Mark all as read</NavDropdown.Item>*/}
        {/*          <NavDropdown.Item href="#action/3.1">See all notifications</NavDropdown.Item>*/}
        {/*        </NavDropdown>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className="notifications-content">*/}
        {/*      <div className="notification">*/}
        {/*        <div className="left-notification">*/}
        {/*          <img src={UserImage} alt="" />*/}
        {/*        </div>*/}
        {/*        <div className="right-notification">*/}
        {/*          <h6 className='truncate-280'>Notification title and its description goes here with all information</h6>*/}
        {/*          <span>23 hours ago</span>*/}
        {/*        </div>*/}
        {/*      </div>*/}

        {/*      <div className="notification">*/}
        {/*        <div className="left-notification">*/}
        {/*          <img src={UserImage} alt="" />*/}
        {/*        </div>*/}
        {/*        <div className="right-notification">*/}
        {/*          <h6 className='truncate-280'>Notification title and its description goes here with all information</h6>*/}
        {/*          <span>23 hours ago</span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="notification">*/}
        {/*        <div className="left-notification">*/}
        {/*          <img src={UserImage} alt="" />*/}
        {/*        </div>*/}
        {/*        <div className="right-notification">*/}
        {/*          <h6 className='truncate-280'>Notification title and its description goes here with all information</h6>*/}
        {/*          <span>23 hours ago</span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="notification">*/}
        {/*        <div className="left-notification">*/}
        {/*          <img src={UserImage} alt="" />*/}
        {/*        </div>*/}
        {/*        <div className="right-notification">*/}
        {/*          <h6 className='truncate-280'>Notification title and its description goes here with all information</h6>*/}
        {/*          <span>23 hours ago</span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="notification">*/}
        {/*        <div className="left-notification">*/}
        {/*          <img src={UserImage} alt="" />*/}
        {/*        </div>*/}
        {/*        <div className="right-notification">*/}
        {/*          <h6 className='truncate-280'>Notification title and its description goes here with all information</h6>*/}
        {/*          <span>23 hours ago</span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="notification">*/}
        {/*        <div className="left-notification">*/}
        {/*          <img src={UserImage} alt="" />*/}
        {/*        </div>*/}
        {/*        <div className="right-notification">*/}
        {/*          <h6 className='truncate-280'>Notification title and its description goes here with all information</h6>*/}
        {/*          <span>23 hours ago</span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="notification">*/}
        {/*        <div className="left-notification">*/}
        {/*          <img src={UserImage} alt="" />*/}
        {/*        </div>*/}
        {/*        <div className="right-notification">*/}
        {/*          <h6 className='truncate-280'>Notification title and its description goes here with all information</h6>*/}
        {/*          <span>23 hours ago</span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="notification">*/}
        {/*        <div className="left-notification">*/}
        {/*          <img src={UserImage} alt="" />*/}
        {/*        </div>*/}
        {/*        <div className="right-notification">*/}
        {/*          <h6 className='truncate-280'>Notification title and its description goes here with all information</h6>*/}
        {/*          <span>23 hours ago</span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="notification">*/}
        {/*        <div className="left-notification">*/}
        {/*          <img src={UserImage} alt="" />*/}
        {/*        </div>*/}
        {/*        <div className="right-notification">*/}
        {/*          <h6 className='truncate-280'>Notification title and its description goes here with all information</h6>*/}
        {/*          <span>23 hours ago</span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

      </div>

      <div className="right-navbar">

        <NavDropdown
          id="nav-dropdown-dark-example"
          title={<span><FontAwesomeIcon icon={faUser} /> {admin.username}</span>}
        >
          <NavDropdown.Item href="#action/3.2"><FontAwesomeIcon fixedWidth={true} icon={faUser} /> Profile</NavDropdown.Item>
          {/*<NavDropdown.Divider />*/}
        </NavDropdown>

        <NavDropdown
          id="nav-dropdown-dark-example"
          title={<span><FontAwesomeIcon icon={faGlobe} /></span>}
        >
          <a onClick={ () => localStorage.setItem('language', 'english') } className='dropdown-item' href=""><img src={EnglishLang} alt='english' /> {translate('english')}</a>
          <a onClick={ () => localStorage.setItem('language', 'arabic') } className='dropdown-item' href=""><img src={ArabicLang} alt='arabic' /> {translate('arabic')}</a>
        </NavDropdown>

        <NavDropdown
          id="nav-dropdown-dark-example"
          title={<span><FontAwesomeIcon icon={faPalette} /></span>}
        >
          <a onClick={ () => localStorage.setItem('theme', 'dark') } className='dropdown-item' href=""><img src={DarkMode} alt=""/> {translate('dark-mode')}</a>
          <a onClick={ () => localStorage.setItem('theme', 'light') } className='dropdown-item' href=""><img src={LightMode} /> {translate('light-mode')}</a>
        </NavDropdown>
      </div>
    </div>
  )
}

export default AdminNavbar
