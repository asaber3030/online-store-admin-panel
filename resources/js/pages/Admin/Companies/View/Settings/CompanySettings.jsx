import '../view-company.scss'
import './company-settings.scss'

import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";
import Company from "@/components/Company";
import CompanySidebar from "@/pages/Admin/Companies/View/CompanySidebar";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Title from "@/components/Title";

import Pagination from 'react-bootstrap/Pagination';

import { APP_URL } from "@/helpers/constants";

import {
  faBuilding, faCog,
  faFileExport,
  faFileImport, faFileUpload,
  faPlus, faSave,
  faTable, faTableCells, faTrash
} from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { Button } from "@/components/Button";
import { FormContainer, TextArea } from "@/components/Form";

import UploadImage from '@/assets/images/upload.png'
import ShopImage from '@/assets/images/shop.svg'
import ServiceImage from '@/assets/images/service2.svg'
import JobImage from '@/assets/images/job.svg'
import PaymentImage from '@/assets/images/payment.svg'
import DetailsImage from '@/assets/images/details.svg'
import LogoImage from '@/assets/images/sign.svg'

const CompanySettings = () => {

  const { company } = usePage().props;

  const [addProducts, setProductsStatus] = useState(company.add_products)
  const [addJobs, setJobsStatus] = useState(company.add_jobs)
  const [addServices, setServicesStatus] = useState(company.add_services)
  const [updateLogo, setLogoStatus] = useState(company.update_logo)
  const [payments, setPaymentsStatus] = useState(company.payments)
  const [details, setDetailsStatus] = useState(company.update_details)

  const updateCompanySettings = () => {
    Inertia.post(route('admin.com.view.settings.main', company.id), {
      products: addProducts,
      jobs: addJobs,
      services: addServices,
      logo: updateLogo,
      payments: payments,
      details: details
    })
  }

  return (
    <AdminLayout>

      <Head title={ translate('company-settings') } />

      <AdminHeader title={<Title text={translate('company-settings')} bold={`${company.name}#${company.id}`} />} icon={faCog}>

        <ActionLink
          title={ translate('create') }
          color='success'
          icon={faPlus}
          href={route('admin.com.create')}
        />

      </AdminHeader>

      <div className="view-company">

        <CompanySidebar activePage={'settings'} company={company} />

        <div className="company-content">

          <div className="settings-part settings-container-all">

            <h5 className='settings-title'>{translate('settings')}</h5>

            <FormGroup>
              <div className="switch-container-main">
                <div className="left-switch">
                  <img src={ShopImage} alt=""/>
                </div>
                <div className="right-switch">
                  <FormControlLabel control={<Switch onChange={ e => setProductsStatus(e.target.checked) } checked={addProducts} />} label="Products Status" />
                  <p>{translate('products-status-paragraph')}</p>
                </div>
              </div>

              <div className="switch-container-main">
                <div className="left-switch">
                  <img src={JobImage} alt=""/>
                </div>
                <div className="right-switch">
                  <FormControlLabel control={<Switch onChange={ e => setJobsStatus(e.target.checked) } checked={addJobs} />} label="Jobs Status" />
                  <p>{translate('jobs-status-paragraph')}</p>
                </div>
              </div>

              <div className="switch-container-main">
                <div className="left-switch">
                  <img src={ServiceImage} alt=""/>
                </div>
                <div className="right-switch">
                  <FormControlLabel control={<Switch onChange={ e => setServicesStatus(e.target.checked) } checked={addServices} />} label="Services Status" />
                  <p>{translate('services-status-paragraph')}</p>
                </div>
              </div>

              <div className="switch-container-main">
                <div className="left-switch">
                  <img src={LogoImage} alt=""/>
                </div>
                <div className="right-switch">
                  <FormControlLabel control={<Switch onChange={ e => setLogoStatus(e.target.checked) } checked={updateLogo} />} label="Updating Logo Status" />
                  <p>{translate('logo-status-paragraph')}</p>
                </div>
              </div>

              <div className="switch-container-main">
                <div className="left-switch">
                  <img src={PaymentImage} alt=""/>
                </div>
                <div className="right-switch">
                  <FormControlLabel control={<Switch onChange={ e => setPaymentsStatus(e.target.checked) } checked={payments} />} label="Payments Status" />
                  <p>{translate('payment-status-paragraph')}</p>
                </div>
              </div>

              <div className="switch-container-main">
                <div className="left-switch">
                  <img src={DetailsImage} alt=""/>
                </div>
                <div className="right-switch">
                  <FormControlLabel control={<Switch onChange={ e => setDetailsStatus(e.target.checked) } checked={details} />} label="Updating Details Status" />
                  <p>{translate('details-status-paragraph')}</p>
                </div>
              </div>


            </FormGroup>
            <Button color='primary' icon={faSave} title={translate('save')} handleClick={updateCompanySettings} />

          </div>

        </div>


      </div>

    </AdminLayout>
  );

}

export default CompanySettings
