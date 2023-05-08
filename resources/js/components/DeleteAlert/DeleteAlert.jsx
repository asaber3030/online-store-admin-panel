import DeleteImage from '@/assets/images/delete.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "@inertiajs/inertia-react";

const DeleteAlert = ({
 title,
 softSubmit,
 softCancel,
 forceDelete,
 forceDeleteSubmit,
 passwordCheck,
 password,

}) => {
  return (
    <div className="delete-alert">
      <div className="soft-delete">
        <img src={DeleteImage} alt="" />
        <h4>Soft Delete!</h4>
        <p>{title}</p>
        <p>This is just a temporary delete you can restore this again in the trash section!</p>
        <div className="soft-delete-actions">
          <button className='btn btn-warning btn-sm p-2' onClick={softSubmit}><FontAwesomeIcon icon={faTrash} /> Temporary Delete</button>
          <Link className='btn btn-primary btn-sm p-2' href={softCancel}><FontAwesomeIcon icon={faTimes} /> Cancel</Link>
        </div>
      </div>
      {forceDelete && (
        <div className="force-delete">
          <h4>Caution: Permanent Delete!</h4>
          <p>Once you click <b>"Force Delete"</b> every data about this will be deleted and cannot be restored once again!</p>
          <button className='btn btn-danger btn-sm p-2' onClick={forceDeleteSubmit}><FontAwesomeIcon icon={faTrash} /> Force Delete</button>
        </div>
      )}
    </div>
  )
}

export default DeleteAlert
