import { Field } from 'formik'
import React from 'react'

function PersonalInfo() {
  // const { errors, touched } = useFormikContext()

  return (
    <div className="Step">
      <h3>Personal Info</h3>
      <h4>The summoner would like to know a little about you.</h4>

      <Field name="name">
        {({ field }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Your Name</label>
            <input type="text" {...field} />
          </div>
        )}
      </Field>
      <Field name="bio">
        {({ field }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Tell us about yourself</label>
            <textarea {...field} />
          </div>
        )}
      </Field>
    </div>
  )
}

export default PersonalInfo