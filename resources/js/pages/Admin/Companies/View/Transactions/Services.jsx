import './payments.scss'

import {Head, Link, usePage} from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import List from "@/components/List";

import { PurchasedServicesColumns } from "@/columns/transactions/services";
import { translate } from "@/languages/translate";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowUp, faCalendar, faClock, faDollar, faHandsHelping, faStar} from "@fortawesome/free-solid-svg-icons";
import formatDate from "@/helpers/functions/format-date";

const CompanyProducts = () => {

  const { company, service, purchased_services, totalEarnedMoney, totalTime, lastTimeUsed, avgRate } = usePage().props;

  console.log(lastTimeUsed)

  return (
    <AdminLayout>

      <Head title={`${translate('service')} with ID: ${service.id} of Company - ${company.name}`} />

      <AdminHeader title={<span>{translate('service')} with ID: <b>{service.id}</b> of Company - <b>{company.name}</b> - Service: <b>{service.name}</b></span>} icon={faHandsHelping} />

      <div className="service-stats-container">

        <div className="ser-sts">
          <div className="icon-sts">
            <FontAwesomeIcon icon={faDollar} />
          </div>
          <div className="text-sts">
            <h6>Total Earned Money From This Service</h6>
            <span>{totalEarnedMoney} <span className="green-c">LE</span></span>
          </div>
        </div>

        <div className="ser-sts">
          <div className="icon-sts">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="text-sts">
            <h6>Time For This Service (hr)</h6>
            <span>{((totalTime / 60) / 60).toFixed(2)} hrs</span>
          </div>
        </div>

        <div className="ser-sts">
          <div className="icon-sts">
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          {lastTimeUsed ? (
            <div className="text-sts">
              <h6>Last Used by <Link href={route('admin.users.view', lastTimeUsed.user.id)}>{lastTimeUsed.user.username}</Link></h6>
              <span>{formatDate(lastTimeUsed.created_at)}</span>
            </div>
          ) : (
            <div className="text-sts">
              <span>No Usages</span>
            </div>
          )}
        </div>

        <div className="ser-sts">
          <div className="icon-sts">
            <FontAwesomeIcon icon={faArrowUp} />
          </div>
          <div className="text-sts">
            <h6>Highest Rate</h6>
            {avgRate > 0 ? (
              <span>
              {Array.from(Array(Math.ceil(avgRate)).keys()).map(num => (
                <span className='green-c'><FontAwesomeIcon icon={faStar} /></span>
              ))}
            </span>
            ) : (
              <div className="text-sts">
                <span className="yellow-c">No Ratings</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {purchased_services.length > 0 ? (
        <div className="purchased-product-list">
          <List rows={purchased_services} columns={PurchasedServicesColumns} />
        </div>
      ) : (
        <div className="alert alert-sm alert-primary">
          There's no users used this service for now!
        </div>
      )}

    </AdminLayout>
  );

}

export default CompanyProducts
