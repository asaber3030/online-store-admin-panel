// React & Inertia
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";

// Components
import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import Company from "@/components/Company";
import DeleteAlert from "@/components/DeleteAlert/DeleteAlert";
import { File, FormContainer, Input, Select, TextArea } from "@/components/Form";
import { Button } from "@/components/Button";

// Icons
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Bootstrap
import Modal from 'react-bootstrap/Modal';

// Helpers
import { translate } from "@/languages/translate";
import { COMPANIES_TYPES_ARRAY } from "@/helpers/constants";

// Images
import DeleteImage from "@/assets/images/delete.svg";
import Category from "@/components/Category";

const DeleteSubCategory = () => {

  const { category, sub, customErrors } = usePage().props

  const confirmDelete = () => {
    Inertia.post(route('admin.cat.delete.sub', [category.id, sub.id]))
  }

  return (
    <AdminLayout>

      <Head title={ translate('delete-sub-category') } />

      <AdminHeader title={ <span>{translate('delete-sub-category')} <b>{sub.name}#{sub.id}</b> of Category: <b>{category.name}#{category.id}</b></span> } icon={faTrash} />

      <div className="delete-structure">

        <div className="left-data">

          {customErrors && (
            <div className="alert alert-sm alert-danger">
              {customErrors}
            </div>
          )}

          <div className="delete-alert">
            <div className="soft-delete">
              <img src={DeleteImage} alt="" />
              <h4>{translate('force-delete')}</h4>
              <p>{translate('force-delete-paragraph')}</p>
              <div className="soft-delete-actions">
                <button className='btn btn-danger btn-sm p-2' onClick={confirmDelete}><FontAwesomeIcon icon={faTrash} /> {translate('force-delete')}</button>
                <Link className='btn btn-primary btn-sm p-2' href={route('admin.cat.view.sub', category.id)}><FontAwesomeIcon icon={faTimes} /> {translate('cancel')}</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="right-data">
          <h5 style={{ fontWeight: 600, marginBottom: 10 }}>{translate('category')}</h5>
          <Category category={category} />
        </div>

      </div>

    </AdminLayout>
  );

}

export default DeleteSubCategory
