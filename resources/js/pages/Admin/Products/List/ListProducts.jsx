import { useState } from "react";

import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";
import useExport from "@/helpers/functions/useExport";

import { faFileExport, faFileImport, faLayerGroup, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ProductsColumns } from "@/columns/products";
import { translate } from "@/languages/translate";
import { Button } from "@/components/Button";

const ListProducts = () => {

  const { products } = usePage().props;
  const [selectedIDs, setIDs] = useState([])

  const handleDeleteSelected = () => {
    Inertia.post(route('admin.products.delete.selected'), {
      ids: selectedIDs
    })
  }

  const handleExport = () => {
    useExport(
      ["ID", "Name", "Slug", "Price", "Quantity", "VAT", "Delivery Value", "Category", "Sub Category", "User", "Colors", "Sizes", "Created in", "Last update"],
      selectedIDs.length > 0 ? products.filter(product => selectedIDs.indexOf(product.id) !== -1) : products,
      product => [
        product.id,
        product.name,
        product.slug,
        product.price,
        product.qty,
        product.vat,
        product.delivery_value,
        product.category.name,
        product.sub_category.name,
        `${product.user.username}#${product.user.id}`,
        product.color,
        product.size,
        product.created_at,
        product.updated_at
    ])
  }

  return (
    <AdminLayout>

      <Head title={ translate('products') } />

      <AdminHeader title={ translate('products') } icon={faLayerGroup}>

        <ActionLink
          title={ translate('create') }
          color='success'
          icon={faPlus}
          href={route('admin.products.create')}
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
          href={route('admin.products.list.trashed')}
        />

      </AdminHeader>

      <div className="list-products">

        <div className="table-view-categories">
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

export default ListProducts
