import React from 'react';
import { useForm } from 'react-hook-form';

import './Summon.scss';

const SummonStepTwo = ({ daoData, setDaoData, setCurrentStep }) => {
  const { register, getValues, watch } = useForm({
    defaultValues: daoData,
  });
  const watchAllFields = watch();
  const canMoveForward = watchAllFields.name && watchAllFields.description;

  const navigate = step => {
    setDaoData(prevState => {
      return { ...prevState, ...getValues() };
    });
    setCurrentStep(step);
  };

  return (
    <div className="SummonStepTwo">
      <div>
        <form>
          <label>DAO name</label>
          <input name="name" ref={register} />

          <label>DAO description</label>
          <textarea name="description" ref={register} />
        </form>
      </div>
      <div>
        <button onClick={() => navigate(1)}>GO BACK</button>
        <button
          onClick={() => navigate(3)}
          disabled={!canMoveForward}
          className={!canMoveForward ? 'disabled' : ''}
        >
          NEXT STEP
        </button>
      </div>
    </div>
  );
};

export default SummonStepTwo;
