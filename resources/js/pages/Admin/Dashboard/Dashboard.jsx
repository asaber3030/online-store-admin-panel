import './dashboard.scss'

import { usePage } from "@inertiajs/inertia-react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import AdminHeader from "@/layouts/Admin/AdminHeader";
import ActionLink from "@/layouts/Admin/ActionLink";
import { faDashboard, faEdit, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/Button";

const Dashboard = () => {

  return (
    <AdminLayout>

      <AdminHeader title='Dashboard' icon={faDashboard} />

      <h5>Hello world</h5>

    </AdminLayout>
  );

}

export default Dashboard
