import './view-service.scss'

// React & Inertia
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";

// Components
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import Company from "@/components/Company";
import DeleteAlert from "@/components/DeleteAlert/DeleteAlert";
import { File, FormContainer, Input, Select, TextArea } from "@/components/Form";
import { Button } from "@/components/Button";

// Icons
import {
  faBuilding,
  faChevronRight,
  faEdit, faEllipsisH,
  faEye,
  faIdCard,
  faPaperPlane, faShoppingCart,
  faTimes,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Bootstrap
import Modal from 'react-bootstrap/Modal';

// Helpers
import { translate } from "@/languages/translate";
import { COMPANIES_TYPES_ARRAY, CONTRACT_TYPE_OBJECT } from "@/helpers/constants";
import { formatNumber } from "@/helpers/functions/format-money";

// Images
import DeleteImage from "@/assets/images/delete.svg";
import Category from "@/components/Category";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import User from "@/components/User";
import formatDate from "@/helpers/functions/format-date";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {faHelmetSafety} from "@fortawesome/free-solid-svg-icons/faHelmetSafety";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {ButtonDropdown} from "@/components/Dropdown";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

const ViewService = () => {

  const { service, appURL } = usePage().props

  return (
    <AdminLayout>

      <Head title={ translate('view-service') + ' #' + service.id } />

      <AdminHeader title={ <span>{translate('view-service')} <b>#{service.id} - {service.name}</b></span> } icon={faEye}>
        <span className='badge bg-dark'>
          <FontAwesomeIcon icon={service.publisher == 0 ? faUser : faBuilding} /> {service.publisher == 0 ? 'User' : 'Company'}
        </span>
      </AdminHeader>

      <div className="view-service-container">

        <div className="top-header">

          <div className="left-items">

            <div className="img">
              {service.publisher == 0 ? (
                <img src={appURL + service.user.picture} alt="User pic"/>
              ) : (
                <img src={appURL + service.user.company.logo} alt="company pic"/>
              )}
            </div>
            <div className="text">
              <div>
                <h6>{service.publisher == 0 ? service.user.name : service.user.company.name}</h6>
                <div className="user-tags">
                  {service.publisher == 0 ? (
                    <Link href={route('admin.users.view', service.user.id)}><FontAwesomeIcon icon={faUser} /> {service.user.username}</Link>
                  ) : (
                    <span><FontAwesomeIcon icon={faBuilding} /> {service.user.company.title}</span>
                  )}
                  <span><FontAwesomeIcon icon={faPaperPlane} /> {service.user.address}</span>
                  <span><FontAwesomeIcon icon={faIdCard} /> {service.user.email}</span>
                </div>
                <div className="user-details">
                  <div className={`detailed-icon ${service.user.verified == 1 ? 'verified' : 'not-verified'}`}>
                    <div>
                      {service.user.verified == 0 ? (
                        <FontAwesomeIcon icon={faTimes} />
                      ) : (
                        <FontAwesomeIcon icon={faCheck} />
                      )}
                      {service.user.verified == 1 ? (
                        <span>Verified</span>
                      ) : (
                        <span>Not Verified</span>
                      )}
                    </div>
                  </div>
                  <Link className="detailed-icon">
                    <div>
                      <FontAwesomeIcon icon={faShoppingCart} />
                      <span>{service.user.products_count} product(s)</span>
                    </div>
                  </Link>
                  <Link className="detailed-icon">
                    <div>
                      <FontAwesomeIcon icon={faHelmetSafety} />
                      <span>{service.user.jobs_count} Job(s)</span>
                    </div>
                  </Link>
                  <Link className="detailed-icon">
                    <div>
                      <FontAwesomeIcon icon={faSyncAlt} />
                      <span>{service.user.service_count} Service(s)</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

          </div>

          <div className="right-items-icon-action">
            <ActionLink
              title='View'
              color={'secondary'}
              icon={faEye}
              href={route('admin.users.view', service.user.id)}
            />
            <ActionLink
              title='Update User'
              icon={faEdit}
              href={route('admin.users.update', service.user.id)}
            />
            <ActionLink
              title='Delete'
              color={'warning'}
              icon={faTrash}
              href={route('admin.users.delete', service.user.id)}
            />
            <ButtonDropdown
              title={<span><FontAwesomeIcon icon={faEllipsisH} /> More</span>}
              color={'info'}
              items={[
                { text: 'New Service', href: route('admin.services.create'), icon: faPlus },
                { text: 'Update Service', href: route('admin.services.update', service.id), icon: faEdit },
                { text: 'Delete Service', href: route('admin.services.delete', service.id), icon: faTrash },
              ]}
            />
          </div>

        </div>

        <div className="service-details">
          <h6 className='service-title'>{service.name} <span className="badge bg-dark">#{service.id}</span></h6>
          <div className="editor-output-container" dangerouslySetInnerHTML={{ __html: service.details }} />
        </div>

      </div>

    </AdminLayout>
  );

}

export default ViewService
