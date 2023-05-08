import './stats-style.scss'

import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";



import CompanySidebar from "@/pages/Admin/Companies/View/CompanySidebar";
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import Title from "@/components/Title";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAreaChart,
  faChartBar, faClock, faDollar,
  faListNumeric,
  faPlus, faSync
} from "@fortawesome/free-solid-svg-icons";

import { PRODUCT_PAYMENT_STATUS } from "@/helpers/constants";
import { translate } from "@/languages/translate";
import { formatNumber } from "@/helpers/functions/format-money";
import formatDate from "@/helpers/functions/format-date";

import {  ComposedChart, Line, Tooltip, AreaChart, CartesianGrid, Area, XAxis, YAxis, BarChart, Legend, Bar } from 'recharts';

const ProductsStats = () => {

  const {
    company,
    totalEarnedMoneyInAllMonths,
    sumHowMany,
    totalEarnedMoney,
    totalDeliveryEarnedMoney,
    totalNoOfProducts,
    expectedMoneyToBeEarned,
    expectedMoneyToBeEarnedForDelivery,
    estimatedTimeForDelivery,
    lastPurchasedProduct,
    sumOfSoldProducts,
    sumOfQty
  } = usePage().props;

  const [activeTab, setActiveTab] = useState('charts')

  const defaultDim = {
    width: 1200,
    height: 300
  }

  return (
    <AdminLayout>

      <Head title={`${translate('company-products-stats')} - ${company.name}`} />

      <AdminHeader title={<Title text={translate('company-products-stats')} bold={company.name + '#' + company.id} />} icon={faChartBar}>

        <ActionLink
          title={ translate('create') }
          color='success'
          icon={faPlus}
          href={route('admin.com.create')}
        />

      </AdminHeader>

      <div className="view-company">

        <CompanySidebar activePage='products-stats' company={company} />

        <div className="company-content">

          <div className="company-main-page">

            <div className="stats-container">

              <div className="tabs-selection">
                <div onClick={ () => setActiveTab('charts') } className={`tab-select ${activeTab == 'charts' && 'active-tab'}`}><FontAwesomeIcon icon={faAreaChart} />{translate('charts')}</div>
                <div onClick={ () => setActiveTab('numerical') } className={`tab-select ${activeTab == 'numerical' && 'active-tab'}`}><FontAwesomeIcon icon={faListNumeric} /> {translate('num-values')}</div>
              </div>

              {activeTab == 'charts' && (
                <div className="charts-tab default-tab">

                  <h6 className='tab-title'><FontAwesomeIcon icon={faChartBar} /> {translate('charts')}</h6>

                  <div className="stats-container">

                    <div className="chart-container">
                      <h6 className='chart-title'>{translate('bar-chart')} - <b>{translate('total-earned-money-every-month')}</b></h6>
                      <BarChart width={defaultDim.width} height={defaultDim.height} data={totalEarnedMoneyInAllMonths}>
                        <CartesianGrid strokeDasharray="1.5 1.5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={ (value) => formatNumber(value) + ' LE' }  />
                        <Legend />
                        <Bar barSize={25} dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </div>

                    <div className="chart-container">
                      <h6 className='chart-title'>{translate('area-chart')} - <b>{translate('total-pieces-sold')}</b></h6>
                      <AreaChart width={defaultDim.width} height={defaultDim.height} data={totalEarnedMoneyInAllMonths} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                        <Tooltip formatter={(value, name, props) => formatNumber(value) + ' piece(s)'}  />
                        <Area type="monotone" dataKey="quantity" stroke="orange" fillOpacity={1} fill="url(#colorUv)" />
                      </AreaChart>
                    </div>

                    <div className="chart-container">
                      <h6 className='chart-title'>{translate('bar-chart')} - <b>{translate('status-of-products')}</b></h6>
                        <ComposedChart
                          width={defaultDim.width}
                          height={defaultDim.height}
                          data={sumHowMany}
                        >
                          <CartesianGrid stroke="#f5f5f5" />
                          <XAxis dataKey="name" scale="band" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" barSize={25} fill="#413ea0" />
                          <Line type="monotone" dataKey="value" stroke="#ff7300" />
                        </ComposedChart>
                      <div className="details-payment list-items">
                        <ul>
                          <li><span>0 {translate('means')}</span> <span>{PRODUCT_PAYMENT_STATUS[0]}</span></li>
                          <li><span>1 {translate('means')}</span> <span>{PRODUCT_PAYMENT_STATUS[1]}</span></li>
                          <li><span>2 {translate('means')}</span> <span>{PRODUCT_PAYMENT_STATUS[2]}</span></li>
                          <li><span>3 {translate('means')}</span> <span>{PRODUCT_PAYMENT_STATUS[3]}</span></li>
                          <li><span>4 {translate('means')}</span> <span>{PRODUCT_PAYMENT_STATUS[4]}</span></li>
                        </ul>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {activeTab == 'numerical' && (
                <div className="numerical-stats-tab default-tab">

                  <h6 className='tab-title'><FontAwesomeIcon icon={faChartBar} /> {translate('num-values')}</h6>

                  <div className="stats-container-all">

                    <div className="stat-container">
                      <div className="icon">
                        <FontAwesomeIcon icon={faDollar} />
                      </div>
                      <div className="text">
                        <h6>{translate('earned-money')}</h6>
                        <div className="list-items">
                          <ul>
                            <li><span>{translate('total-earned')}</span> <span className='green-c'>{formatNumber(totalEarnedMoney)} LE</span></li>
                            <li><span>{translate('delivery-earned-money')}</span> <span className='green-c'>{formatNumber(totalDeliveryEarnedMoney)} LE</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="stat-container">
                      <div className="icon">
                        <FontAwesomeIcon icon={faSync} />
                      </div>
                      <div className="text">
                        <h6>Expected to be earned</h6>
                        <div className="list-items">
                          <ul>
                            <li><span>Products</span> <span className='green-c'>{formatNumber(expectedMoneyToBeEarned)} LE</span></li>
                            <li><span>Delivery expected money</span> <span className='green-c'>{formatNumber(expectedMoneyToBeEarnedForDelivery)} LE</span></li>
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
                            <li><span>Products</span> <span>{formatNumber(totalNoOfProducts)}</span></li>
                            <li><span>Total</span> <span>{formatNumber(sumOfQty)}</span></li>
                            <li><span>Sold Products</span> <span>{formatNumber(sumOfSoldProducts)}</span></li>
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
                            <li><span>Last Ordered</span> <span>{formatDate(lastPurchasedProduct.created_at)} <Link href={route('admin.products.view', lastPurchasedProduct.id)}>#{lastPurchasedProduct.id}</Link></span></li>
                            <li><span>Estimated time to deliver order</span> <span>{(estimatedTimeForDelivery / 60 / 60).toFixed(2)} hrs</span></li>
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

export default ProductsStats
