import { useState } from "react";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import useExport from "@/helpers/functions/useExport";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";

import {
  faBuilding,
  faFileExport,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import { UsersColumns } from "@/columns/users";
import { COMPANIES_TYPES } from "@/helpers/constants";
import { translate } from "@/languages/translate";
import { Button } from "@/components/Button";

const ListUsers = () => {

  const { users } = usePage().props;
  const [selectedIDs, setIDs] = useState([])

  const handleExport = () => {
    useExport(
      ["ID", "Name", "Username", "E-mail", "Phone", "IP", "National ID", "Location", "City", "Address", "Created at", "Last update"],
      selectedIDs.length > 0 ? users.filter(user => selectedIDs.indexOf(user.id) !== -1) : users,
      user => [
        user.id,
        user.name,
        user.username,
        user.email,
        user.phone,
        user.ip,
        user.national_id,
        user.location,
        user.city,
        user.address,
        user.created_at,
        user.updated_at
    ])
  }

  const handleDeleteSelected = () => {
    Inertia.post(route('admin.com.delete.selected'), {
      ids: selectedIDs
    })
  }

  return (
    <AdminLayout>

      <Head title={ translate('users') } />

      <AdminHeader title={ translate('users') } icon={faBuilding}>

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

      <div className="list-users">

        <div className="table-view-users">
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

export default ListUsers
