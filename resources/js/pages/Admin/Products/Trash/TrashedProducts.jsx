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
import {ProductsColumns} from "@/columns/products";


const TrashedProducts = () => {

  const { products } = usePage().props;

  const [selectedIDs, setIDs] = useState([])

  const handleRestoreSelected = () => {
    Inertia.post(route('admin.products.restore.selected'), {
      ids: selectedIDs
    })
  }

  return (
    <AdminLayout>

      <Head title={ translate('trashed-products') } />

      <AdminHeader title={ translate('trashed-products') } icon={faTrash}>

        <ActionLink
          title={ translate('products') }
          color='dark'
          icon={faBuilding}
          href={route('admin.products.list')}
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
            rows={products}
            perPage={10}
            columns={ProductsColumns}
            handleSelected={ (ids) => setIDs(ids) }
          />
        </div>

      </div>

    </AdminLayout>
  );

}

export default TrashedProducts
