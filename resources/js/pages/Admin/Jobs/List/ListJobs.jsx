import { Head, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";

import {faFileExport, faPlus, faTrash, faUsers} from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { JobsColumns } from "@/columns/jobs";
import {Button} from "@/components/Button";
import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import useExport from "@/helpers/functions/useExport";
import {CONTRACT_TYPE_OBJECT} from "@/helpers/constants";

const ListJobs = () => {

  const { jobs } = usePage().props;

  const [selectedIDs, setIDs] = useState([])

  const handleDeleteSelected = () => {
    Inertia.post(route('admin.jobs.delete.selected'), {
      ids: selectedIDs
    })
  }

  const handleExport = () => {
    useExport(
      ["ID", "Title", "Location", "Salary", "Contract Type", "Publisher", "Category", "Sub Category", "User", "Created in", "Last update"],
      selectedIDs.length > 0 ? jobs.filter(job => selectedIDs.indexOf(job.id) !== -1) : jobs,
      job => [
        job.id,
        job.title,
        job.location,
        job.salary,
        CONTRACT_TYPE_OBJECT[job.contract_type],
        job.publisher == 0 ? 'User' : 'Company',
        job.category.name,
        job.sub_category.name,
        `${job.user.username}#${job.user.id}`,
        job.created_at,
        job.updated_at
    ])
  }

  return (
    <AdminLayout>

      <Head title={ translate('jobs') } />

      <AdminHeader title={translate('jobs')} icon={faUsers}>

        <ActionLink
          title={ translate('create') }
          color='success'
          icon={faPlus}
          href={ route('admin.jobs.create') }
        />

        <Button
          title={ translate('export') }
          color='dark'
          icon={faFileExport}
          handleClick={handleExport}
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
          href={route('admin.jobs.list.trashed')}
        />

      </AdminHeader>

      <div className="list-jobs">

        <div className="table-view-categories">
          <List
            rows={jobs}
            perPage={10}
            columns={JobsColumns}
            handleSelected={ (ids) => setIDs(ids) }
          />
        </div>

      </div>

    </AdminLayout>
  );

}

export default ListJobs
