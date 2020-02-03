import { FastField, useFormikContext } from 'formik';
import React from 'react';
import EumaDoc from './eumaDoc';

function Euma() {
  const { errors, touched } = useFormikContext();

  return (
    <div className="Step">
      <div>
        <h3>EUMA</h3>
        <p>To pledge, please review the EUMA and click to accept its terms.</p>
        <EumaDoc />
        <label>
          I accept
          <input type="checkbox"></input>
        </label>
      </div>
      <small style={{ color: 'red' }}>Please accept the EUMA</small>
    </div>
  );
}

export default Euma;
