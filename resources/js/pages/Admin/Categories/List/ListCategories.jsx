import './list-categories.scss'

import { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";
import Company from "@/components/Company";
import Category from "@/components/Category";
import Pagination from 'react-bootstrap/Pagination';

import {
  faFileExport,
  faFileImport, faLayerGroup,
  faPlus,
  faTable, faTableCells, faTrash
} from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { convertToCSV } from "@/helpers/functions/convertToCSV";
import { CategoriesColumns } from "@/columns/categories";
import { Button } from "@/components/Button";

import {CATEGORIES_TYPES_OBJECT, COMPANIES_TYPES, DEFAULT_VIEW_ITEMS} from "@/helpers/constants";
import { Inertia } from "@inertiajs/inertia";
import useExport from "@/helpers/functions/useExport";

const ListCategories = () => {

  const { categories,  paginatedCategories } = usePage().props;
  const [viewType, setViewType] = useState(localStorage.getItem(DEFAULT_VIEW_ITEMS) ?? 'table')
  const [selectedIDs, setIDs] = useState([])

  const handleExport = () => {
    useExport(
      ["ID", "Name", "Type", "No of Products", "No Of Sub Categories", "Created in", "Last update"],
      selectedIDs.length > 0 ? categories.filter(user => selectedIDs.indexOf(user.id) !== -1) : categories,
      category => [
        category.id,
        category.name,
        CATEGORIES_TYPES_OBJECT[category.type],
        category.products_count,
        category.sub_categories_count,
        category.created_at,
        category.updated_at
      ])
  }

  const handleDeleteSelected = () => {
    Inertia.post(route('admin.cat.delete.selected'), {
      ids: selectedIDs
    })
  }

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

  return (
    <AdminLayout>

      <Head title={ translate('categories') } />

      <AdminHeader title={ translate('categories') } icon={faLayerGroup}>

        <ActionLink
          title={ translate('create') }
          color='success'
          icon={faPlus}
          href={route('admin.cat.create')}
        />

        <Button
          title={ translate('export') }
          color='dark'
          icon={faFileExport}
          handleClick={handleExport}
        />

        <ActionLink
          title={ translate('import') }
          color='secondary'
          icon={faFileImport}
          href=''
        />

        <Button
          title={ viewType == 'grid' ? translate('table-view') : translate('grid-view') }
          handleClick={handleView}
          color='primary'
          icon={ viewType == 'grid' ? faTable : faTableCells }
        />

        <Button
          title={ translate('delete') }
          icon={faTrash}
          color='danger'
          disabled={ selectedIDs.length == 0 ? true : false }
          handleClick={handleDeleteSelected}
        />

        <ActionLink
          title={ translate('trash') }
          color='danger'
          icon={faTrash}
          href={route('admin.cat.list.trashed')}
        />

      </AdminHeader>

      <div className="list-categories">

        {viewType == 'table' && (
          <div className="table-view-categories">
            <List
              rows={categories}
              perPage={10}
              columns={CategoriesColumns}
              handleSelected={ (ids) => setIDs(ids) }
            />
          </div>
        )}

        {viewType == 'grid' && (

          <>

            <div className="grid-view-categories">

              {paginatedCategories.data.map(category => (
                <Category key={category.id} category={category} />
              ))}

            </div>

            <Pagination size='md'>
              {paginatedCategories.links.map((link, idx) => (
                <li className="page-item"><Link className={`page-link ${link.active ? 'active' : ''}`} href={link.url}>{link.label}</Link></li>
              ))}
            </Pagination>

          </>

        )}

      </div>

    </AdminLayout>
  );

}

export default ListCategories
