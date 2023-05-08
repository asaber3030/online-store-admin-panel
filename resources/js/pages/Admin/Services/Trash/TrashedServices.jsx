import './list-companies.scss'

import { useState } from "react";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";

import { faBuilding, faTrash, faTrashRestore } from "@fortawesome/free-solid-svg-icons";
import { ServicesColumns } from "@/columns/services";

import { Button } from "@/components/Button";
import { translate } from "@/languages/translate";

const TrashedServices = () => {

  const { services } = usePage().props;

  const [selectedIDs, setIDs] = useState([])

  const handleRestoreSelected = () => {
    Inertia.post(route('admin.services.restore.selected'), {
      ids: selectedIDs
    })
  }

  return (
    <AdminLayout>

      <Head title={ translate('trashed-services') } />

      <AdminHeader title={ translate('trashed-services') } icon={faTrash}>

        <ActionLink
          title={ translate('services') }
          color='dark'
          icon={faBuilding}
          href={route('admin.services.list')}
        />

        <Button
          title={ translate('restore') }
          color='primary'
          disabled={ selectedIDs.length == 0 ? true : false }
          handleClick={handleRestoreSelected}
          icon={faTrashRestore}
        />

      </AdminHeader>

      <div className="list-companies">

        <div className="table-view-companies">
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

export default TrashedServices
