import React from 'react'

const Loading = () => {
  return (
    <div className="hero is-medium is-dark is-bold is-fullheight">

      <div className="hero-body">
        <div className="container">
          <i className="fa fa-spinner fa-pulse fa-7x fa-fw"></i>
          <h3 className="title">Please wait, I am currently<br /> grabbing all the neccessary data.</h3>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default Loading
