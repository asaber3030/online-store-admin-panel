import './view-company.scss'

import { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";

import CompanySidebar from "@/pages/Admin/Companies/View/CompanySidebar";
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";
import CompanyHeader from "@/pages/Admin/Companies/View/CompanyHeader";
import Title from "@/components/Title";

import { faBuilding, faFileExport, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ProductsColumns } from "@/columns/products";
import { Button } from "@/components/Button";
import { translate } from "@/languages/translate";
import { Tooltip } from "@mui/material";
import { exportToCsv } from "@/helpers/functions/convertToCSV";

const CompanyProducts = () => {

  const { company } = usePage().props;

  const [selectedIDs, setSelected] = useState([])

  const [products, setProducts] = useState(company.user.products)

  useEffect(() => {
    setProducts(company.user.products.filter((product) => {
      return selectedIDs.some(el => {
        return product.id == el
      })
    }))
  }, [selectedIDs])

  const exportData = () => {
    const csvArray = [
      ["Product ID", "Product Name", "Slug", "Category", "Sub Category", "Colors", "Size", "Offer", "Price", "Vat", "Delivery Value", "Quantity", "Brand"],
      ...products.map(product => [
        product.id,
        product.name,
        product.slug,
        product.category.name,
        product.sub_category.name,
        product.color,
        product.size,
        product.offer,
        product.price,
        product.vat,
        product.delivery_value,
        product.qty,
        product.brand
      ]),
      [""],
      [""],
      [""],
      ["Creator", company.user.username],
      ["Company Name", company.name],
      ["Sheet Created at", new Date()],
      ["No. of products", company.user.products.length]
    ];

    return exportToCsv(`${company.name}-${company.id}-company-products.csv`, csvArray)
  }

  return (
    <AdminLayout>

      <Head title={`${translate('company-products')} - ${company.name}`} />

      <AdminHeader title={<Title text={translate('company-products')} bold={`${company.name}#${company.id}`} />} icon={faBuilding}>

        <ActionLink
          title={ translate('create-company') }
          color='success'
          icon={faPlus}
          href={route('admin.com.create')}
        />

        <ActionLink
          title={ translate('create-product') }
          color='primary'
          icon={faPlus}
          href={route('admin.products.create')}
        />

      </AdminHeader>

      <div className="view-company">

        <CompanySidebar activePage='products' company={company} />

        <div className="company-content">

          <div className="company-main-page">

            <CompanyHeader company={company} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0' }}>
              <Tooltip title={translate('export')}>
                <Button title={translate('export')} icon={faFileExport} handleClick={exportData} disabled={ products.length == 0 } />
              </Tooltip>
            </div>

            <List columns={ProductsColumns} rows={company.user.products} handleSelected={ rows => setSelected(rows) } />

          </div>

        </div>


      </div>

    </AdminLayout>
  );

}

export default CompanyProducts
