import './admin-layout.scss'

import AdminSidebar from "@/navs/Admin/AdminSidebar";
import AdminNavbar from "@/navs/Admin/AdminNavbar";
import {useEffect, useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import {usePage } from "@inertiajs/inertia-react";

const AdminLayout = ({ children }) => {

  const { flash } = usePage().props
  const [flashMessageState, setFlashState] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('itemsViewType')) {
      localStorage.setItem('itemsViewType', 'table')
    }
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'english')
    }
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light')
    }
  }, [])

  return (
    <div className={`app-layout ${localStorage.getItem('language') == 'english' ? 'app-english' : 'app-arabic'} ${localStorage.getItem('theme') == 'light' ? 'app-light' : 'app-dark'}`}>

      {flash.message && (
        <Snackbar open={flashMessageState} autoHideDuration={2500} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={ () => setFlashState(false) }>
          <Alert onClose={ () => setFlashState(false) } severity={flash.type} sx={{ width: '500px' }}>
            {flash.message}
          </Alert>
        </Snackbar>
      )}

      <AdminSidebar />

      <div className="app-admin-content">

        <AdminNavbar />

        <div className="main-content">
          {children}
        </div>

      </div>

    </div>
  )
}


export default AdminLayout
