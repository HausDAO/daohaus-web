import { FastField, useFormikContext } from 'formik'
import React from 'react'

function PledgeInfo() {
  const { errors, touched } = useFormikContext()

  return (
    <div>
      <div>
        <label htmlFor="pledge">Your pledge: </label>
        <FastField name="pledge" id="pledge" />
      </div>
      <small style={{ color: 'red' }}>
        {touched.pledge && errors.pledge}
      </small>
    </div>
  )
}

export default PledgeInfo