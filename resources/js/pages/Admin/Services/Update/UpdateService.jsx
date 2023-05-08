import { Head, useForm, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";

import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { FormContainer, Input } from "@/components/Form";

import { CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const UpdateService = () => {

  const { service } = usePage().props

  const { data, processing, setData, post, errors } = useForm({
    'name': service.name,
    'details': service.details,
    'salary': service.salary,
    'salary_per_hour': service.salary_per_hour,
  })
  const handleCreation = () => {
    post(route('admin.services.update', service.id))
  }

  console.log(service)

  return (
    <AdminLayout>

      <Head title={ translate('update-service') + service.name + '#' + service.id } />

      <Loader load={processing} />

      <AdminHeader title={ <span>{translate('update-service')} <b>{`${service.name}#${service.id}`}</b></span> } icon={faEdit} />

      <div className="create-structure create-service" style={{ gridTemplateColumns: '1.8fr 2fr' }}>

        <FormContainer>

          {service.publisher == 0 ? (
            <Input
              label={translate('creator')}
              value={service.user.name}
              isDisabled={true}
            />
          ) : (
            <Input
              label={translate('company')}
              value={service.user.company.name}
              isDisabled={true}
            />
          )}

          <Input
            label={translate('category')}
            value={service.category.name}
            isDisabled={true}
          />

          <Input
            label={translate('sub_category')}
            value={service.sub_category.name}
            isDisabled={true}
          />

          <Input
            label={translate('name')}
            value={data.name}
            handleChange={ e => setData('name', e.target.value) }
            error={errors.name}
          />

          <Input
            label={translate('salary') + ' (LE)'}
            value={data.salary}
            handleChange={ e => setData('salary', e.target.value) }
            error={errors.salary}
          />

          <Input
            label={translate('salary_per_hour')}
            value={data.salary_per_hour}
            handleChange={ e => setData('salary_per_hour', e.target.value) }
            error={errors.salary_per_hour}
          />

          <button onClick={handleCreation} className='mt-2 btn btn-sm btn-primary p-2'>{translate('update-service')} <b>#{service.id}</b></button>

        </FormContainer>

        <div className="right-data">

          <h5 style={{ fontWeight: 900, margin: '20px 0 10px' }}>Service Details</h5>

          <CKEditor
            editor={ ClassicEditor }
            onChange={ (event, editor) => setData('details', editor.getData()) }
            data={data.details}
          />

        </div>

      </div>

    </AdminLayout>
  );

}

export default UpdateService
