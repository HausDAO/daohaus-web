import { object, number, string } from 'yup';
import PledgeInfo from './pledgeInfo';
import Summary from './summary';

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
    id: 'summary',
    component: Summary,
  },
];
