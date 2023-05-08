import './import-style.scss'

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faFileImport, faTasks} from "@fortawesome/free-solid-svg-icons";
import {Link, usePage} from "@inertiajs/inertia-react";
import {IMPORTING_URLS} from "@/helpers/constants";

const ImportMain = () => {

  const { getImportingData } = usePage().props;
  console.log(getImportingData)

  return (
    <AdminLayout>

      <AdminHeader title='Importing Data' icon={faFileImport} />

      <div className="importing-data-container">

        {IMPORTING_URLS.map(url => (
          <Link className='box-select' href={url.url}>

            <FontAwesomeIcon icon={url.icon} />

            <span>{url.name}</span>

          </Link>
        ))}

      </div>

    </AdminLayout>
  );

}

export default ImportMain
