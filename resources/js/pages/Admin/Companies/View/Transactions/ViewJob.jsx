import './payments.scss'

import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import Modal from 'react-bootstrap/Modal';
import formatDate from "@/helpers/functions/format-date";

import { translate } from "@/languages/translate";

import { faBuilding, faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";
import { Button } from "@/components/Button";


const CompanyProducts = () => {

  const { company, job, appURL } = usePage().props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <AdminLayout>

      <Head title={`${translate('job-applicants')} of job id: ${job.id}`} />

      <AdminHeader title={`${translate('job-applicants')} of job id: ${job.id} - Company: ${company.name}`} icon={faBuilding}>

        <Button
          title={ translate('view-details') }
          color='success'
          icon={faEye}
          handleClick={handleShow}
        />

        <ActionLink
          title={ translate('update') }
          color='primary'
          icon={faEdit}
          href={route('admin.jobs.update', job.id)}
        />

        <ActionLink
          title={ translate('delete') }
          color='danger'
          icon={faTrash}
          href={route('admin.jobs.delete', job.id)}
        />

      </AdminHeader>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Job Details - <b>ID: {job.id}</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="list-items">
            <h6 className='text-center m-2'>{job.title}</h6>
            <ul>
              <li><span>No. of Applicants</span> <span>{job.applicants.length}</span></li>
              <li><span>Job ID</span> <span>#{job.id}</span></li>
              <li><span>Latest applied</span> <span>{formatDate(job.applicants[job.applicants.length - 1].created_at)}</span></li>
              <li><span>Job Title</span> <span>{job.title}</span></li>
              <li><span>Category / Sub Category</span> <span>{job.category.name} / {job.sub_category.name}</span></li>
              <li><span>Location</span> <span>{job.location}</span></li>
              <li><span>Salary</span> <span>{job.salary} LE</span></li>
              <li><span>Job Created in</span> <span>{formatDate(job.created_at)}</span></li>
              <li><span>Last update</span> <span>{formatDate(job.updated_at)}</span></li>
              <li><span>Published By</span> <span><Link href={route('admin.users.view', job.user.id)}>{job.user.username}</Link></span></li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color={'primary'} handleClick={handleClose} title='Close' />
        </Modal.Footer>
      </Modal>

      <div className="job-applicants-container">
        <div className="job-header">
          <h6>Job Applicants</h6>
        </div>
        {job.applicants.length > 0 ? (
          <div className="applicants-list">
            {job.applicants.map(app => (
              <div className="applicant">
                <Tooltip title='Applicant ID' followCursor={true}>
                  <div className="job-app-id">
                    #{app.id}
                  </div>
                </Tooltip>
                <img className="user-image" src={appURL + app.user.picture} alt=""/>
                <div className="job-details">
                  <div className="user-header">
                    <Link href={route('admin.users.view', app.user.id)}>{app.user.name}</Link>
                    <span>Applied: {formatDate(app.created_at)}</span>
                  </div>
                  <div className="job-desc">
                    <h5>{app.title}</h5>
                    <p>{app.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-primary alert-sm">
            There's no applicants for this job <b>{job.title} - #{job.id}</b>
          </div>
        )}
      </div>

    </AdminLayout>
  );

}

export default CompanyProducts
