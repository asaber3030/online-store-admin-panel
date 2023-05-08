import './list-companies.scss'

import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import useExport from "@/helpers/functions/useExport";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";
import Company from "@/components/Company";

import Pagination from 'react-bootstrap/Pagination';

import {
  faBuilding,
  faFileExport,
  faPlus,
  faTable, faTableCells, faTrash
} from "@fortawesome/free-solid-svg-icons";

import { CompaniesColumns } from "@/columns/companies";
import { COMPANIES_TYPES, DEFAULT_VIEW_ITEMS } from "@/helpers/constants";
import { translate } from "@/languages/translate";
import { Button } from "@/components/Button";

const ListCompanies = () => {

  const { companies,  paginatedCompanies } = usePage().props;
  const [selectedIDs, setIDs] = useState([])
  const [viewType, setViewType] = useState(localStorage.getItem(DEFAULT_VIEW_ITEMS) ?? 'table')

  const handleView = () => {
    if (viewType == 'grid') {
      setViewType('table')
      localStorage.setItem(DEFAULT_VIEW_ITEMS, 'table')
    }
    else if (viewType == 'table') {
      setViewType('grid')
      localStorage.setItem(DEFAULT_VIEW_ITEMS, 'grid')
    }
  }

  const handleExport = () => {
    useExport(
      ["ID", "Company Name", "Company Title", "Company E-mail", "Contact Phone", "Company Creator", "Type", "Website", "Facebook"],
      selectedIDs.length > 0 ? companies.filter(company => selectedIDs.indexOf(company.id) !== -1) : companies,
      company => [
        company.id,
        company.name,
        company.title,
        company.email,
        company.phone,
        company.user.username,
        COMPANIES_TYPES[company.type],
        company.website,
        company.facebook
    ])
  }

  const handleDeleteSelected = () => {
    Inertia.post(route('admin.com.delete.selected'), {
      ids: selectedIDs
    })
  }

  return (
    <AdminLayout>

      <Head title={ translate('companies') } />

      <AdminHeader title={ translate('companies') } icon={faBuilding}>

        <ActionLink
          title={ translate('create') }
          color='success'
          icon={faPlus}
          href={ route('admin.com.create') }
        />

        <Button
          title={ translate('export') }
          color='dark'
          icon={faFileExport}
          handleClick={handleExport}
        />

        <Button
          title={ viewType == 'grid' ? translate('table-view') : translate('grid-view') }
          handleClick={handleView}
          color='primary'
          icon={ viewType == 'grid' ? faTable : faTableCells }
        />

        <ActionLink
          title={ translate('trash') }
          color='outline-danger'
          icon={faTrash}
          href={ route('admin.com.list.trashed') }
        />

        <Button
          title={ translate('delete') }
          icon={faTrash}
          color='danger'
          disabled={ selectedIDs.length == 0 ? true : false }
          handleClick={handleDeleteSelected}
        />

      </AdminHeader>

      <div className="list-companies">

        {viewType == 'table' && (
          <div className="table-view-companies">
            <List
              rows={companies}
              perPage={10}
              columns={CompaniesColumns}
              handleSelected={ (ids) => setIDs(ids) }
            />
          </div>
        )}

        {viewType == 'grid' && (

          <>

            <div className="grid-view-companies">

              {paginatedCompanies.data.map(com => (
                <Company company={com} key={com.id} />
              ))}

            </div>

            <Pagination size='md'>
              {paginatedCompanies.links.map((link, idx) => (
                <li className="page-item" key={idx + 1}><Link className={`page-link ${link.active ? 'active' : ''}`} href={link.url}>{link.label}</Link></li>
              ))}
            </Pagination>

          </>

        )}

      </div>

    </AdminLayout>
  );

}

export default ListCompanies
