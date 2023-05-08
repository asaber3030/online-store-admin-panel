import { Head, usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import List from "@/components/List";

import {
  faFileImport, faLayerGroup,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { translate } from "@/languages/translate";
import { SubCategoriesColumns } from "@/columns/sub_categories";
import Category from "@/components/Category";

const ListSubCategories = () => {

  const { category } = usePage().props;

  return (
    <AdminLayout>

      <Head title={ translate('sub-categories') } />

      <AdminHeader title={ <span>{translate('sub-categories')} <b>{category.name}#{category.id}</b></span> } icon={faLayerGroup}>

        <ActionLink
          title={ translate('create') }
          color='success'
          icon={faPlus}
          href={route('admin.cat.create.sub', category.id)}
        />

      </AdminHeader>

      <div className="list-structure">

        <div className="table-view-categories">
          <List
            columns={SubCategoriesColumns}
            rows={category.sub_categories}
            perPage={10}
          />

          <div className='mt-3'>
            <Category category={category} />
          </div>
        </div>

      </div>

    </AdminLayout>
  );

}

export default ListSubCategories
