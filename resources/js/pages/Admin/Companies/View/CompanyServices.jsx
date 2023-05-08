import './view-company.scss'

import { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";
import CompanySidebar from "@/pages/Admin/Companies/View/CompanySidebar";


import { faBuilding, faCheck, faEye, faFileExport, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

import createColumn from "@/helpers/functions/create-column";
import formatDate from "@/helpers/functions/format-date";

import { APP_URL } from "@/helpers/constants";
import { translate } from "@/languages/translate";
import { exportToCsv } from "@/helpers/functions/convertToCSV";
import { Tooltip } from "@mui/material";
import { Button } from "@/components/Button";

import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";
import Title from "@/components/Title";
import CompanyHeader from "@/pages/Admin/Companies/View/CompanyHeader";

const CompanyServices = () => {

  const { company } = usePage().props;

  const [selectedIDs, setSelected] = useState([])

  const [services, setServices] = useState(company.user.services)

  useEffect(() => {
    setServices(company.user.services.filter((service) => {
      return selectedIDs.some(el => {
        return service.id == el
      })
    }))
  }, [selectedIDs])

  const exportData = () => {
    const csvArray = [
      ["Service ID", "Service Title", "Category", "Salary", "Salary/hr", "Created in", "Updated in"],
      ...services.map(ser => [
        ser.id,
        ser.name,
        ser.category.name,
        ser.sub_category.name,
        ser.salary,
        ser.salary_per_hour,
        ser.created_at,
        ser.updated_at,
      ]),
      [""],
      [""],
      [""],
      ["Creator", company.user.username],
      ["Company Name", company.name],
      ["Sheet Created at", new Date()],
      ["No. of services", company.user.services.length]
    ];

    return exportToCsv(`${company.name}-${company.id}-company-services.csv`, csvArray)
  }

  return (
    <AdminLayout>

      <Head title={`${translate('company-services')} - ${company.name}`} />

      <AdminHeader title={<Title text={translate('company-services')} bold={`${company.name}#${company.id}`} />} icon={faBuilding}>

        <ActionLink
          title={ translate('create') }
          color='success'
          icon={faPlus}
          href={route('admin.com.create')}
        />

      </AdminHeader>

      <div className="view-company">

        <CompanySidebar activePage='services' company={company} />

        <div className="company-content">

          <div className="company-main-page">

            <CompanyHeader company={company} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0' }}>
              <Tooltip title={translate('export')}>
                <Button title={translate('export')} icon={faFileExport} handleClick={exportData} disabled={ services.length == 0 } />
              </Tooltip>
            </div>

            <List columns={[
              createColumn('id', translate('id')),
              createColumn('name', translate('name')),
              createColumn('publisher', translate('publisher'), params => <Link href={route('admin.users.view', params.row.user.id)}>{params.row.user.username}</Link>),
              createColumn('category', translate('category'), params => <Link href={route('admin.cat.view.sub', params.row.category.id)}>{params.row.category.name}</Link>),
              createColumn('sub_category', translate('sub-category'), params => <span className="badge bg-secondary">{params.row.sub_category.name}</span>),
              createColumn('salary', translate('salary'), params => <b className='green-c'>{params.row.salary != 0 ?Intl.NumberFormat().format(params.row.salary) + ' LE' : 'Not Available'}</b>),
              createColumn('salary_per_hour', translate('salary-per-hour'), params => <b>{params.row.salary != 0 ?Intl.NumberFormat().format(params.row.salary_per_hour) + '  LE/hr' : 'Not Available'}</b>),
              createColumn('created_at', translate('created-in'), params => formatDate(params.row.created_at)),
              createColumn('actions', translate('actions'), (params) => (
                <GridActionsContainer
                  actions={[
                    createActionObject('admin.services.view', params.row.id, translate('view'), faEye),
                    createActionObject('admin.services.update', params.row.id, translate('update'), faEdit),
                    createActionObject('admin.services.delete', params.row.id, translate('delete'), faTrash),
                    createActionObject('admin.com.services.view', [company.id, params.row.id], translate('used-times'), faCheck),
                  ]}
                />
              ), 1.5),

            ]} rows={company.user.services} handleSelected={ rows => setSelected(rows) } />

          </div>

        </div>


      </div>

    </AdminLayout>
  );

}

export default CompanyServices
