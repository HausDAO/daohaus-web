import { FastField, useFormikContext } from 'formik'
import React from 'react'

function Shares() {
  const { errors, touched } = useFormikContext();

  return (
    <div className="Step">
      <div>
        <h3>Shares</h3>
        <label htmlFor="shares">How many shares are you requesting?</label>
        <p>Typically 1 share is equal to 1 tribute currency</p>
        <FastField name="shares" id="shares" />
      </div>
      <small style={{ color: 'red' }}>
        {touched.shares && errors.shares}
      </small>
    </div>
  )
}

export default Shares