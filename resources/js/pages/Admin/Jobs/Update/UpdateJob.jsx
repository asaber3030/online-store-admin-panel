import { Head, useForm, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import Loader from "@/components/Loader/Loader";

import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { FormContainer, Input, Select } from "@/components/Form";
import { CONTRACT_TYPE_ARRAY } from "@/helpers/constants";

import { CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const UpdateJob = () => {

  const { job } = usePage().props

  const { data, processing, setData, post, errors } = useForm({
    'title': job.title,
    'description': job.description,
    'salary': job.salary,
    'location': job.location,
    'contract_type': job.contract_type,
  })
  const handleCreation = () => {
    post(route('admin.jobs.update', job.id))
  }

  return (
    <AdminLayout>

      <Head title={ translate('update-job') + job.title + '#' + job.id } />

      <Loader load={processing} />

      <AdminHeader title={ <span>{translate('update-job')} <b>{`${job.title}#${job.id}`}</b></span> } icon={faEdit} />

      <div className="create-structure create-job" style={{ gridTemplateColumns: '1.8fr 2fr' }}>

        <FormContainer>

          <Input
            label={translate('title')}
            value={data.title}
            handleChange={ e => setData('title', e.target.value) }
            error={errors.title}
          />

          <Input
            label={translate('salary') + ' (LE)'}
            value={data.salary}
            handleChange={ e => setData('salary', e.target.value) }
            error={errors.salary}
          />

          <Input
            label={translate('location')}
            value={data.location}
            handleChange={ e => setData('location', e.target.value) }
            error={errors.location}
          />

          <Select
            label='Contract Type'
            items={CONTRACT_TYPE_ARRAY.map(item => {
              return { value: item.value, text: item.text }
            })}
            handleChange={ e => setData('contract_type', e.target.value) }
            defaultSelected={data.contract_type}
            error={errors.contract_type}
          />

          <button onClick={handleCreation} className='mt-2 btn btn-sm btn-primary p-2'>{translate('update-job')} <b>#{job.id}</b></button>

        </FormContainer>

        <div className="right-data">

          <h5 style={{ fontWeight: 900, margin: '20px 0 10px' }}>Job Details</h5>

          <CKEditor
            editor={ ClassicEditor }
            onChange={ (event, editor) => setData('description', editor.getData()) }
            data={data.description}
          />

        </div>

      </div>

    </AdminLayout>
  );

}

export default UpdateJob
