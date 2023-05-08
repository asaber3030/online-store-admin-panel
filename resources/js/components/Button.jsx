import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Button({ icon, title, color = 'dark', className, handleClick, disabled = false }) {
  return (
    <button className={`btn btn-sm btn-${color} ${className} ${icon ? 'action-btn' : ''}`} onClick={handleClick} disabled={disabled}>
      {icon && (
        <FontAwesomeIcon icon={icon} />
      )}
      {title}
    </button>
  )
}
