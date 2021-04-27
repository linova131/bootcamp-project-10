import React from 'react';

//This component formats any validation errors that are created during the signIn/signUp/createCourse/updateCourse routes

function Errors(props) {
  
  //Receives validation errors from API via the parent component
  let errors = props.errors
  
  //Validation errors are formatted to li elements
  errors = errors.map(error => {
    return <li key={errors.indexOf(error)}>{error}</li>
  })

  //If errors exist, the errors will be displayed as li elements. If none, the component returns an empty element
  if (errors.length) {
    return (
      <div className="validation--errors">
        <h3 className="validation--errors">Validation Errors</h3>
        <ul>
          {errors}
        </ul>
      </div>
    )
  } else {
    return (
      <p></p>
    )
  }

}

export default Errors; 