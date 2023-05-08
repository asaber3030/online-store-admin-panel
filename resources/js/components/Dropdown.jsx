import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "@inertiajs/inertia-react";

export const ButtonDropdown = ({ title = '', items, color = 'dark', id, size='md' }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle className='default-again' variant={color} id={id} size={'lg'}>
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map(item => (
          <Link className="dropdown-item" href={item.href}><FontAwesomeIcon fixedWidth={true} icon={item.icon} />{item.text}</Link>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

