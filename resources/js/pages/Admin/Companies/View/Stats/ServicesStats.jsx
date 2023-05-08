import './stats-style.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Head, Link, usePage } from "@inertiajs/inertia-react";

import CompanySidebar from "@/pages/Admin/Companies/View/CompanySidebar";
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";

import { PRODUCT_PAYMENT_STATUS } from "@/helpers/constants";
import { translate } from "@/languages/translate";
import { formatNumber } from "@/helpers/functions/format-money";

import {
  faAreaChart,
  faBuilding,
  faChartBar, faClock, faDollar,
  faListNumeric,
  faPlus, faSync
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {  ComposedChart, Line, Tooltip, AreaChart, CartesianGrid, Area, XAxis, YAxis, BarChart, Legend, Bar } from 'recharts';
import formatDate from "@/helpers/functions/format-date";

const ServicesStats = () => {

  const {
    company,
    lastPurchasedService,
    totalEarnedMoney,
    totalEarnedMoneyInAllMonths,
    avgHoursInMonth,
    avgHoursNum,
    totalAvgRate,
    avgSalary,
    totalNumOfUsedServices,
    totalNumOfServices
  } = usePage().props;

  const [activeTab, setActiveTab] = useState('charts')

  const defaultDim = {
    width: 1200,
    height: 300
  }

  console.log(totalEarnedMoneyInAllMonths)

  return (
    <AdminLayout>

      <Head title={`${translate('company-service-stats')} - ${company.name}`} />

      <AdminHeader title={<span>{translate('company-service-stats')} - <b>{company.name}</b></span>} icon={faBuilding}>

        <ActionLink
          title={ translate('create') }
          color='success'
          icon={faPlus}
          href={route('admin.com.create')}
        />

      </AdminHeader>

      <div className="view-company">

        <CompanySidebar activePage='services-stats' company={company} />

        <div className="company-content">

          <div className="company-main-page">

            <div className="stats-container">

              <div className="tabs-selection">
                <div onClick={ () => setActiveTab('charts') } className={`tab-select ${activeTab == 'charts' && 'active-tab'}`}><FontAwesomeIcon icon={faAreaChart} /> Charts</div>
                <div onClick={ () => setActiveTab('numerical') } className={`tab-select ${activeTab == 'numerical' && 'active-tab'}`}><FontAwesomeIcon icon={faListNumeric} /> Numerical Values</div>
              </div>

              {activeTab == 'charts' && (
                <div className="charts-tab default-tab">

                  <h6 className='tab-title'><FontAwesomeIcon icon={faChartBar} /> Charts</h6>

                  <div className="stats-container">

                    <div className="chart-container">
                      <h6 className='chart-title'>Bar Chart - <b>Total Earned Money in every month</b></h6>
                      <BarChart width={defaultDim.width} height={defaultDim.height} data={totalEarnedMoneyInAllMonths}>
                        <CartesianGrid strokeDasharray="1.5 1.5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value, name, props) => formatNumber(value) + ' LE'}  />
                        <Legend />
                        <Bar barSize={25} dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </div>

                    <div className="chart-container">
                      <h6 className='chart-title'>Area Chart - <b>Avg Hours In Month</b></h6>
                      <AreaChart width={defaultDim.width} height={defaultDim.height} data={avgHoursInMonth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="orange" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="orange" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="orange" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="orange" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip formatter={(value, name, props) => formatNumber((value / 60 / 90).toFixed()) + ' hrs'}  />
                        <Area type="monotone" dataKey="value" stroke="orange" fillOpacity={1} fill="url(#colorUv)" />
                      </AreaChart>
                    </div>


                  </div>

                </div>
              )}

              {activeTab == 'numerical' && (
                <div className="numerical-stats-tab default-tab">

                  <h6 className='tab-title'><FontAwesomeIcon icon={faChartBar} /> Numerical Statistics</h6>

                  <div className="stats-container-all">

                    <div className="stat-container">
                      <div className="icon">
                        <FontAwesomeIcon icon={faDollar} />
                      </div>
                      <div className="text">
                        <h6>Earned Money</h6>
                        <div className="list-items">
                          <ul>
                            <li><span>Total Earned</span> <span className='green-c'>{formatNumber(totalEarnedMoney)} LE</span></li>
                            <li><span>Avg Salary</span> <span className='green-c'>{formatNumber(avgSalary)} LE</span></li>
                            <li><span>Avg Rate</span> <span className='green-c'>{formatNumber(totalAvgRate)} LE</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="stat-container">
                      <div className="icon">
                        <FontAwesomeIcon icon={faListNumeric} />
                      </div>
                      <div className="text">
                        <h6>Number of items</h6>
                        <div className="list-items">
                          <ul>
                            <li><span>Number of services</span> <span>{totalNumOfServices}</span></li>
                            <li><span>Number of used services</span> <span>{totalNumOfUsedServices}</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="stat-container">
                      <div className="icon">
                        <FontAwesomeIcon icon={faClock} />
                      </div>
                      <div className="text">
                        <h6>Timing</h6>
                        <div className="list-items">
                          <ul>
                            <li><span>Average Hours</span> <span>{(avgHoursNum / 60 / 60).toFixed()} hr(s)</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}
            </div>



          </div>

        </div>

      </div>

    </AdminLayout>
  );

}

export default ServicesStats
