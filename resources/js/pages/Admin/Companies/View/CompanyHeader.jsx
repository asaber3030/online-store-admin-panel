
import { Link } from "@inertiajs/inertia-react";

import { translate } from "@/languages/translate";
import { APP_URL } from "@/helpers/constants";

const CompanyHeader = ({ company }) => {

  return (

    <div className="company-header">

      <div className="left-logo">
        <img src={APP_URL + company.logo} alt="company-logo" />
      </div>

      <div className="right-data">
        <h5>{company.name}</h5>
        <p>{company.title}</p>

        <div className="action-links">
          <Link href={ route('admin.com.update', company.id) }>{translate('update')}</Link>
          <Link href={ route('admin.com.delete', company.id) }>{translate('delete')}</Link>
          <Link href={ route('admin.jobs.create') }>{translate('create-job')}</Link>
          <Link href={ route('admin.services.create') }>{translate('create-service')}</Link>
          <Link href={ route('admin.products.create') }>{translate('create-product')}</Link>
        </div>

      </div>

  </div>
  );

}

export default CompanyHeader
