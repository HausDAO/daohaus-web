import { object, number, boolean, bool } from 'yup';
import PledgeInfo from './pledgeInfo';
import Summary from './summary';
import Euma from './euma';

export const getSteps = isEuma => {
  console.log('isEuma', isEuma);
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
