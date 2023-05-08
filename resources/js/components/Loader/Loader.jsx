import './loader.scss'

export default function Loader({ load }) {
  return (
    <>
      {load && (
        <>
          <div className="loader-container">
            <div className="arc"></div>
            <h1 className='arc-text'><span>LOADING</span></h1>
          </div>
        </>
      )}
    </>
  )
}
