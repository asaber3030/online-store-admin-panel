import './list-companies.scss'

import { useState } from "react";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";

import { faBuilding, faTrash, faTrashRestore } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/Button";
import { translate } from "@/languages/translate";
import {UsersColumns} from "@/columns/users";

const TrashedUsers = () => {

  const { users } = usePage().props;

  const [selectedIDs, setIDs] = useState([])

  const handleRestoreSelected = () => {
    Inertia.post(route('admin.users.restore.selected'), {
      ids: selectedIDs
    })
  }

  return (
    <AdminLayout>

      <Head title={ translate('trashed-users') } />

      <AdminHeader title={ translate('trashed-users') } icon={faTrash}>

        <ActionLink
          title={ translate('users') }
          color='dark'
          icon={faBuilding}
          href={route('admin.users.list')}
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
            rows={users}
            perPage={10}
            columns={UsersColumns}
            handleSelected={ (ids) => setIDs(ids) }
          />
        </div>

      </div>

    </AdminLayout>
  );

}

export default TrashedUsers
