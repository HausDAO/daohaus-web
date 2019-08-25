import { Field, useFormikContext } from "formik";
import React from "react";

const DaoInformation = () => {
  const { errors, touched } = useFormikContext();

  return (
    <div>
      <h3>DAO Info</h3>
      <h4>What is this DAO about?</h4>

      <Field name="name">
        {({ field }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Name the DAO</label>
            <input type="text" {...field} />
          </div>
        )}
      </Field>

      <small style={{ color: "red" }}>{touched.name && errors.name}</small>
      <Field name="bio">
        {({ field }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Describe the DAO</label>
            <textarea {...field} />
          </div>
        )}
      </Field>
    </div>
  );
};

export default DaoInformation;
