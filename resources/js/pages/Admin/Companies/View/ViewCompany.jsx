import './view-company.scss'

import { Head, Link, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import CompanySidebar from "@/pages/Admin/Companies/View/CompanySidebar";

import { APP_URL } from "@/helpers/constants";

import { faBuilding, faPlus } from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";

import JobImage from '@/assets/images/job.svg'
import ServiceImage from '@/assets/images/service2.svg'
import ShopImage from '@/assets/images/shop.svg'
import Title from "@/components/Title";
import CompanyHeader from "@/pages/Admin/Companies/View/CompanyHeader";

const ViewCompany = () => {

  const { company } = usePage().props;

  return (
    <AdminLayout>

      <Head title={`${translate('view-company')} - ${company.name}#${company.id}`} />

      <AdminHeader title={<Title text={translate('view-company')} bold={`${company.name}#${company.id}`} />} icon={faBuilding}>

        <ActionLink
          title={ translate('create') }
          color='success'
          icon={faPlus}
          href={route('admin.com.create')}
        />

      </AdminHeader>

      <div className="view-company">

        <CompanySidebar activePage={'main'} company={company} />

        <div className="company-content">

          <div className="company-main-page">

            <CompanyHeader company={company} />

            <div className="company-links">

              <Link className="company-link" href={route('admin.com.view.products', company.id)}>

                <img src={ShopImage} alt="products"/>
                <h6>{translate('products')}</h6>
                <span>{company.user.products.length}</span>

              </Link>

              <Link className="company-link" href={route('admin.com.view.jobs', company.id)}>

                <img src={JobImage} alt="jobs"/>
                <h6>{translate('jobs')}</h6>
                <span>{company.user.jobs.length}</span>

              </Link>

              <Link className="company-link" href={route('admin.com.view.services', company.id)}>

                <img src={ServiceImage} alt="services"/>
                <h6>{translate('services')}</h6>
                <span>{company.user.services.length}</span>

              </Link>

            </div>

          </div>

        </div>


      </div>

    </AdminLayout>
  );

}

export default ViewCompany
