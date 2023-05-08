import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFileUpload, faHashtag, faTimes, faUpload} from "@fortawesome/free-solid-svg-icons";
import ActionLink from "@/layouts/Admin/ActionLink";
import {Button} from "@/components/Button";
import {Snackbar} from "@mui/material";

const ImportList = ({ rows, title = '', error, handleChange, handleClick }) => {
  return (
    <div className="import-structure">

      <div className="import-form-structure">
        <h6 className='default-title'>{title}</h6>
        <div className="icon">
          <input type='file' onChange={handleChange} />
          <FontAwesomeIcon icon={faUpload} />
        </div>
        <div className="footer-upload">
          <Button
            icon={faFileUpload}
            title='Upload'
            handleClick={handleClick}
          />
        </div>
      </div>

      {error && (
        <Snackbar
          open={true}
          autoHideDuration={300}
          message={error}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
      )}

      <div className="list-rows-container">
        <h6><FontAwesomeIcon icon={faHashtag} /> {title}</h6>
        <table className='table table-striped import-list-table-container table-responsive'>
          <thead>
          <th>Name</th>
          <th>Type</th>
          <th>Hint</th>
          <th>Minimum</th>
          <th>Maximum</th>
          <th>Unique</th>
          <th>Default Value</th>
          </thead>
          <tbody>
          {rows.map(row => (
            <tr>
              <td>{row.name}</td>
              <td>{row.type}</td>
              <td>{row.typeHint ?? '-'}</td>
              <td>{row.min}</td>
              <td>{row.max}</td>
              <td>{row.isUnique ? 'Yes' : 'No'}</td>
              <td>{row.defaultValue ? row.defaultValue : 'NULL'}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ImportList
