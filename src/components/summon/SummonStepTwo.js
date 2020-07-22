import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

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
        <form className="Form">
          <label>Name your DAO</label>
          <input name="name" ref={register} placeholder="Braid Guild" />

          <label>Describe its purpose</label>
          <textarea
            name="description"
            ref={register}
            rows="8"
            placeholder="Banging the best braids since 2020"
          />
        </form>
      </div>
      <div>
        <div className="StepControl">
          <button onClick={() => navigate(1)} className="Outlined">
            <ArrowLeftOutlined style={{ marginRight: '5px' }} />
            GO BACK
          </button>
          <button
            onClick={() => navigate(3)}
            disabled={!canMoveForward}
            className={!canMoveForward ? 'disabled' : ''}
          >
            NEXT STEP <ArrowRightOutlined style={{ marginLeft: '5px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummonStepTwo;
