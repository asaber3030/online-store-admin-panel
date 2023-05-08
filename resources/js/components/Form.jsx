import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UploadImage from '@/assets/images/upload.svg'

export const FormContainer = ({ children }) => {

  return (
    <div className="form-container">
      {children}
    </div>
  );
}


export const Input = ({ error = '', type = 'text', value, handleChange, isDisabled, label, labelIcon, placeholder = '' }) => {
  return (
    <div className="form-group">
      <label>{labelIcon && <FontAwesomeIcon icon={labelIcon} />} {label}</label>
      <input type={type} value={value} className={`${error != '' ? 'error-input-add' : 'custom-field'} ${isDisabled && 'disabled-input'}`} onChange={handleChange} placeholder={placeholder} disabled={isDisabled} />
      {error && (
        <span className="input-error">{error}</span>
      )}
    </div>
  )
}

export const TextArea = ({ error = '', type = 'text', value, handleChange, label, labelIcon, placeholder = '' }) => {
  return (
    <div className="form-group">
      <label>{labelIcon && <FontAwesomeIcon icon={labelIcon} />} {label}</label>
      <textarea type={type} value={value} className={`${error != '' ? 'error-input-add' : 'custom-field'}`} onChange={handleChange} placeholder={placeholder}></textarea>
      {error && (
        <span className="input-error">{error}</span>
      )}
    </div>
  )
}

export const File = ({ error = '', handleChange, label, className = ''}) => {
  return (
    <div className={`form-file-group ${className}`}>
      <img src={UploadImage} alt=""/>
      <input type='file' onChange={handleChange} />
      <h6>{label}</h6>
      {error != '' && (
        <span style={{ fontSize: '13px', color: 'red', fontWeight: 'bold' }}>{error}</span>
      )}
    </div>
  )
}

export const Select = ({ items, error = '', labelIcon, handleChange, className, label, defaultSelected }) => {
  return (
    <div className="form-group">
      <label>{labelIcon && <FontAwesomeIcon icon={labelIcon} />} {label}</label>
      <select onChange={handleChange} className={className}>
        <option value="">----- Select -----</option>
        {items.map((item, idx) => (
          <option value={item.value} selected={item.value === defaultSelected} key={idx}>{item.text}</option>
        ))}
      </select>

      {error && (
        <span className="input-error">{error}</span>
      )}
    </div>
  )
}

