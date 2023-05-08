import { useState } from "react";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";

import {
  faBuilding,
  faFileExport,
  faPlus,
  faTrash, faUserShield
} from "@fortawesome/free-solid-svg-icons";

import { AdminsColumns } from "@/columns/admins";
import { translate } from "@/languages/translate";
import { Button } from "@/components/Button";

const ListAdmins = () => {

  const { admins } = usePage().props;
  const [selectedIDs, setIDs] = useState([])

  const handleDeleteSelected = () => {
    Inertia.post(route('admin.admins.delete.selected'), {
      ids: selectedIDs
    })
  }

  return (
    <AdminLayout>

      <Head title={ translate('admins') } />

      <AdminHeader title={ translate('admins') } icon={faUserShield}>

        <ActionLink
          title={ translate('create') }
          color='success'
          icon={faPlus}
          href={ route('admin.admins.create') }
        />

        <ActionLink
          title={ translate('trash') }
          color='outline-danger'
          icon={faTrash}
          href={ route('admin.admins.trash') }
        />

        <Button
          title={ translate('delete') }
          icon={faTrash}
          color='danger'
          disabled={ selectedIDs.length == 0 ? true : false }
          handleClick={handleDeleteSelected}
        />

      </AdminHeader>

      <div className="list-users">

        <div className="table-view-users">
          <List
            rows={admins}
            perPage={10}
            columns={AdminsColumns}
            handleSelected={ (ids) => setIDs(ids) }
          />
        </div>

      </div>

    </AdminLayout>
  );

}

export default ListAdmins
