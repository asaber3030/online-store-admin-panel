import './view-company.scss'

import {useEffect, useState} from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";
import CompanySidebar from "@/pages/Admin/Companies/View/CompanySidebar";


import { faBuilding, faEye, faFileExport, faPlus, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

import { Button } from "@/components/Button";
import { Tooltip } from "@mui/material";
import { translate } from "@/languages/translate";
import { exportToCsv } from "@/helpers/functions/convertToCSV";
import { APP_URL, CONTRACT_TYPE_OBJECT } from "@/helpers/constants";

import createColumn from "@/helpers/functions/create-column";
import formatDate from "@/helpers/functions/format-date";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";
import CompanyHeader from "@/pages/Admin/Companies/View/CompanyHeader";

const CompanyServices = () => {

  const { company } = usePage().props;

  const [selectedIDs, setSelected] = useState([])

  const [jobs, setJobs] = useState(company.user.jobs)

  useEffect(() => {
    setJobs(company.user.jobs.filter((job) => {
      return selectedIDs.some(el => {
        return job.id == el
      })
    }))
  }, [selectedIDs])

  const exportData = () => {
    const csvArray = [
      ["Job ID", "Job Title", "Category", "Sub Category", "Location", "Salary", "Contract type", "Created in", "Updated in"],
      ...jobs.map(job => [
        job.id,
        job.title,
        job.category.name,
        job.sub_category.name,
        job.location,
        job.salary,
        CONTRACT_TYPE_OBJECT[job.contract_type],
        job.created_at,
        job.updated_at,
      ]),
      [""],
      [""],
      [""],
      ["Creator", company.user.username],
      ["Company Name", company.name],
      ["Sheet Created at", new Date()],
      ["No. of jobs", company.user.jobs.length]
    ];

    return exportToCsv(`${company.name}-${company.id}-company-jobs.csv`, csvArray)
  }

  return (
    <AdminLayout>

      <Head title={`${translate('company-jobs')} - ${company.name}#${company.id}`} />

      <AdminHeader title={<span>{translate('company-jobs')} - <b>{company.name}#{company.id}</b></span>} icon={faBuilding}>

        <ActionLink
          title={ translate('create-company') }
          color='success'
          icon={faPlus}
          href={route('admin.com.create')}
        />

        <ActionLink
          title={ translate('create-job') }
          color='primary'
          icon={faPlus}
          href={route('admin.jobs.create')}
        />

      </AdminHeader>

      <div className="view-company">

        <CompanySidebar activePage='jobs' company={company} />

        <div className="company-content">

          <div className="company-main-page">

            <CompanyHeader company={company} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0' }}>
              <Tooltip title={ translate('export') }>
                <Button title={ translate('export') } icon={faFileExport} handleClick={exportData} disabled={ jobs.length == 0 } />
              </Tooltip>
            </div>

            <List columns={[
              createColumn('id', translate('id')),
              createColumn('title', translate('job')),
              createColumn('status', translate('status'), params => params.row.deleted_at == null ? <b className="green-c">{ translate('available') }</b> : <b className="red-c">{ translate('deleted') }</b>),
              createColumn('publisher', translate('publisher'), params => <Link href={route('admin.users.view', params.row.user.id)}>{params.row.user.username}</Link>),
              createColumn('category', translate('category'), params => <Link href={route('admin.cat.view.sub', params.row.category.id)}>{params.row.category.name}</Link>),
              createColumn('sub_category', translate('sub-category'), params => <span className="badge bg-secondary">{params.row.sub_category.name}</span>),
              createColumn('contract_type', translate('contract-type'), params => <b>{CONTRACT_TYPE_OBJECT[params.row.contract_type]}</b>),
              createColumn('salary', translate('salary'), params => <b className='green-c'>{Intl.NumberFormat().format(params.row.salary)} LE</b>),
              createColumn('created_at', translate('created-in'), params => formatDate(params.row.created_at)),
              createColumn('actions', translate('actions'), (params) => (
                <GridActionsContainer
                  actions={[
                    createActionObject('admin.jobs.view', params.row.id, translate('view'), faEye),
                    createActionObject('admin.jobs.update', params.row.id, translate('update'), faEdit),
                    createActionObject('admin.jobs.delete', params.row.id, translate('delete'), faTrash),
                    createActionObject('admin.com.view.job', [company.id, params.row.id], translate('applicants'), faUsers),
                  ]}
                />
              ), 1.8),

            ]} rows={company.user.jobs} handleSelected={ rows => setSelected(rows) } />

          </div>

        </div>


      </div>

    </AdminLayout>
  );

}

export default CompanyServices
