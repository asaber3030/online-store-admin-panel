import { usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";

import { FormContainer, Input } from "@/components/Form";
import { Tooltip } from "@mui/material";
import { translate } from "@/languages/translate";

const ListCompaniesMessages = ({ companies, activeID, firstItem }) => {

  const { appURL } = usePage().props

  const [search, setSearch] = useState('')
  const [data, setData] = useState(companies)

  useEffect(() => {
    setData(companies.filter(com => com.name.toLowerCase().includes(search.toLowerCase()) || com.title.toLowerCase().includes(search.toLowerCase()) || com.id == search))
  }, [search])

  return (
    <div className="list-companies-messages">

      <FormContainer>

        <Input
          label={<span>{translate('search-company-paragraph')}</span>}
          placeholder='Search'
          handleChange={ e => setSearch(e.target.value) }
        />

      </FormContainer>

      <div className="messages-container">

        {data.length > 0 ? (
          <>
            <div className={`company-message ${activeID == firstItem.id ? 'active-message-company' : ''}`} key={firstItem.id}>

              <div className="left-company">
                <Tooltip followCursor title={`Company: ${firstItem.name} - Identifier: #${firstItem.id}`}>
                  <img src={appURL + firstItem.logo} alt="Company logo" />
                </Tooltip>
              </div>

              <div className="right-company">
                <h5>{firstItem.name}</h5>
                <h6>{firstItem.title}</h6>
                <span className='badge bg-success'>{firstItem.admin_messages_count} {translate('messages')}</span>
              </div>

            </div>

            {data.map(com => (
              <div onClick={ () => Inertia.get(route('admin.com.message', com.id)) } className={`company-message ${activeID == com.id ? 'active-message-company' : ''}`} key={com.id}>

                <div className="left-company">
                  <Tooltip followCursor title={`Company: ${com.name} - Identifier: #${com.id}`}>
                    <img src={appURL + com.logo} alt="Company logo" />
                  </Tooltip>
                </div>

                <div className="right-company">
                  <h5>{com.name}</h5>
                  <h6>{com.title}</h6>
                  <span className='badge bg-success'>{com.admin_messages_count}</span>
                </div>

              </div>

            ))}

          </>

        ) : (
          <div className="alert alert-primary alert-info">{translate('no-search-result')}</div>
        )}

      </div>

    </div>
  );

}

export default ListCompaniesMessages
