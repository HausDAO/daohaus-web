import { Field, useFormikContext } from "formik";
import React from "react";

const DaoInformation = () => {
  const { errors, touched } = useFormikContext();

  return (
    <div>
      <h3>Dao Info</h3>
      <h4>What is this DAO?</h4>

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
            <label>DAO Purpose</label>
            <textarea {...field} />
          </div>
        )}
      </Field>
    </div>
  );
};

export default DaoInformation;
