import './view-job.scss'

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
import {faChevronRight, faEdit, faEye, faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";
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

const ViewJob = () => {

  const { job, appURL } = usePage().props

  return (
    <AdminLayout>

      <Head title={ translate('view-job') + ' #' + job.id } />

      <AdminHeader title={ <span>{translate('view-job')} <b>#{job.id} - {job.title}</b></span> } icon={faEye} />

      <div className="view-job-container">

        <div className="left-data">

          <div className="category-details mb-2">

            <h6 className='section-title'>Category Details</h6>
            <Category category={job.category} />

          </div>

          {job.publisher == 0 && (
            <div className="company-details mb-2">
              <h6 className='section-title' style={{ marginTop: 0 }}>Company Details</h6>
              <Company user={job.user} company={job.user.company} />
            </div>
          )}

          {job.publisher == 1 && (
            <div className="company-details mb-2">
              <h6 className='section-title'>User Details</h6>
              <User user={job.user} />
            </div>
          )}

        </div>

        <div className="right-data">

          <div className="header-details">
            <h6>
              {job.deleted_at == null ? (
                <span className="status bg-success badge">Available</span>
              ) : (
                <span className="status bg-danger badge">Deleted Temporary</span>
              )}
              {job.title}
            </h6>
            <span>{formatDate(job.created_at)}</span>
          </div>

          <div className="job-all-details">

            <div className="job-left-details">
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>

            <div className="job-right-details">
              <ul>
                <li>
                  <span className='span-title'>Salary</span>
                  <span className='span-value green-c' style={{ fontWeight: "bold" }}>{formatNumber(job.salary)} LE</span>
                </li>
                <li>
                  <span className='span-title'>Location</span>
                  <span className='span-value'>{job.location}</span>
                </li>
                <li>
                  <span className='span-title'>Contract type</span>
                  <span className='span-value'>{CONTRACT_TYPE_OBJECT[job.contract_type]}</span>
                </li>
                <li>
                  <span className='span-title'>Published By</span>
                  <span className='span-value'>{ job.publisher == 0 ? 'A User' : 'A Company' }</span>
                </li>
                <li>
                  <span className='span-title'>Published In</span>
                  <span className='span-value'>{formatDate(job.created_at)}</span>
                </li>
                <li>
                  <span className='span-title'>Last Update</span>
                  <span className='span-value'>{formatDate(job.updated_at)}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );

}

export default ViewJob
