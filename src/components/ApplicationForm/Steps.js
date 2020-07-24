import { object, number, bool } from 'yup';

import PledgeInfo from './PledgeInfo';
import Euma from './Euma';
import Summary from './Summary';

export const getSteps = isEuma => {
  const steps = [
    {
      id: 'pledge',
      component: PledgeInfo,
      initialValues: {
        pledge: '',
        shares: '',
      },
      validationSchema: object().shape({
        pledge: number().required(),
        shares: number().required(),
      }),
    },
    {
      id: 'summary',
      component: Summary,
    },
  ];

  if (isEuma) {
    steps.splice(1, 0, {
      id: 'euma',
      component: Euma,
      initialValues: {
        eumaChecked: false,
      },
      validationSchema: object().shape({
        eumaChecked: bool().oneOf([true]),
      }),
    });
  }

  return steps;
};
