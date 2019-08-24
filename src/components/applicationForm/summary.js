import { useFormikWizard } from 'formik-wizard'
import React from 'react'

function Summary() {
  const { values } = useFormikWizard()

  return (
    <div>
      <h1>Is this information correct?</h1>
      <p>Name: {values.personal.name}</p>
      <p>Pledge: {values.pledge.pledge}</p>
    </div>
  )
}

export default Summary