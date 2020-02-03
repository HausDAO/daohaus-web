import { object, number, string } from 'yup';
import PledgeInfo from './pledgeInfo';
import Summary from './summary';
import Euma from './euma';

export default [
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
    id: 'euma',
    component: Euma,
    initialValue: {
      checked: false,
    },
  },
  {
    id: 'summary',
    component: Summary,
  },
];
