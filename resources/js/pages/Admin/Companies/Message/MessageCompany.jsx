import './message-company.scss'

import { useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";
import ActionLink from "@/layouts/Admin/ActionLink";
import Company from "@/components/Company";
import ListCompaniesMessages from "@/pages/Admin/Companies/Message/ListCompaniesMessage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { File, FormContainer, Input, Select, TextArea } from "@/components/Form";

import { Button } from "@/components/Button";
import { Tooltip } from "@mui/material";
import { translate } from "@/languages/translate";

import formatDate from '@/helpers/functions/format-date'

import NoMessageImage from '@/assets/images/inbox.svg'

const MessageCompany = () => {

  const { users, lastUpdateCompany, company, appURL, companies } = usePage().props

  const { data, setData, processing, post, errors } = useForm({
    content: '',
  })

  const sendMessage = () => {
    setData('content', '')
    post(route('admin.com.message', company.id))
  }

  return (
    <AdminLayout>

      <Head title={ translate('message-company') + ' - ' + company.name } />

      <Loader load={processing} />

      <AdminHeader title={ <span>{ translate('message-company') } <b>{company.name}</b></span> } icon={faPaperPlane} />

      <div className="message-company">

        <ListCompaniesMessages companies={companies} activeID={company.id} firstItem={company} />

        <div className="message-details">

          <div className="user-card">

            <div className="left-item">
              <img src={appURL + company.user.picture} alt=""/>
            </div>

            <div className="right-item">
              <h5>{company.user.name}</h5>
              <h6><Link>{company.user.username}</Link></h6>
              <span><FontAwesomeIcon icon={faClock} /> {formatDate(company.created_at)}</span>
            </div>

          </div>

          {company.admin_messages.length > 0 && (

            <div className="list-messages">

              {company.admin_messages.map(message => (
                <div className="message">

                  <Tooltip title={`Sender: ${message.admin.username} - ${message.admin.name}`} followCursor={true}>

                    <div className="admin-content">
                      <img src={appURL + message.admin.picture} alt="sender" />
                    </div>

                  </Tooltip>

                  <Tooltip followCursor={true} title={`Sent in: ${formatDate(message.created_at)}`}>
                    <div className="message-content">{message.content}</div>
                  </Tooltip>

                </div>
              ))}

            </div>
          )}

          {company.admin_messages.length == 0 && (
            <div className='no-messages'>
              <img src={NoMessageImage} alt='No Messages' />
              <h3>{translate('no-messages')}</h3>
            </div>
          )}

          <div className="send-message">

            <FormContainer>

              <TextArea
                label={ translate('message') }
                handleChange={ e => setData('content', e.target.value) }
                error={errors.content}
                placeholder='Type something. Maximum Characters is 1500 characters'
              />

              <Button
                title={ translate('message') }
                icon={faPaperPlane}
                handleClick={sendMessage}
              />

            </FormContainer>

          </div>

        </div>

      </div>

    </AdminLayout>
  );

}

export default MessageCompany
