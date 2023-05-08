import { Head, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";

import { translate } from "@/languages/translate";

import { faBuilding, faFileExport, faPlus } from "@fortawesome/free-solid-svg-icons";
import {PurchasedProductsColumns} from "@/columns/transactions/products";
import List from "@/components/List";

const CompanyProducts = () => {

  const { company } = usePage().props;


  return (
    <AdminLayout>

      <Head title={`${translate('purchased-products')} of Company - ${company.name}`} />

      <AdminHeader title={`${translate('purchased-products')} of Company - ${company.name}`} icon={faBuilding} />



      <div className="purchased-product-list">

        <List checkBox={false} columns={PurchasedProductsColumns} rows={company.user.purchased_products} />

      </div>

    </AdminLayout>
  );

}

export default CompanyProducts
