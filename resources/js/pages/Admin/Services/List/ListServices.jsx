import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";

import { faFileExport, faFileImport, faPlus, faTrash, faTruck } from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { ServicesColumns } from "@/columns/services";
import { Button } from "@/components/Button";
import useExport from "@/helpers/functions/useExport";
import {CONTRACT_TYPE_OBJECT} from "@/helpers/constants";


const ListServices = () => {

  const { services } = usePage().props;
  const [selectedIDs, setIDs] = useState([])

  const handleDeleteSelected = () => {
    Inertia.post(route('admin.services.delete.selected'), {
      ids: selectedIDs
    })
  }

  const handleExport = () => {
    useExport(
      ["ID", "Name", "Salary", "Salary/HR", "Publisher", "Category", "Sub Category", "User", "Created in", "Last update"],
      selectedIDs.length > 0 ? services.filter(service => selectedIDs.indexOf(service.id) !== -1) : services,
      service => [
        service.id,
        service.name,
        service.salary,
        service.salary_per_hour,
        service.publisher == 0 ? 'User' : 'Company',
        service.category.name,
        service.sub_category.name,
        `${service.user.username}#${service.user.id}`,
        service.created_at,
        service.updated_at
    ])
  }

  return (
    <AdminLayout>

      <Head title={translate('services')} />

      <AdminHeader title={translate('services')} icon={faTruck}>

        <ActionLink
          title={ translate('create') }
          icon={faPlus}
          href={route('admin.services.create')}
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
          href={route('admin.services.import')}
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
          href={route('admin.services.list.trashed')}
        />

      </AdminHeader>

      <div className="list-services">

        <div className="table-view-categories">
          <List
            rows={services}
            perPage={10}
            columns={ServicesColumns}
            handleSelected={ (ids) => setIDs(ids) }
          />
        </div>

      </div>

    </AdminLayout>
  );

}

export default ListServices
