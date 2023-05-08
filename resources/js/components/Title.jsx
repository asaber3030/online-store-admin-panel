const Title = ({ text, bold, separator = ' - ' }) => {
  return <span>{text} {separator} <b>{bold}</b></span>
}
export default Title
