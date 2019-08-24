import { object, number } from 'yup'

import PersonalInfo from './personalInfo'
import PledgeInfo from './pledgeInfo'
import SharesInfo from './sharesInfo'
import Summary from './summary'

export default [
  {
    id: 'personal',
    component: PersonalInfo,
    initialValues: {
      name: '',
      bio: '',
    },
  },
  {
    id: 'pledge',
    component: PledgeInfo,
    initialValues: {
      pledge: '',
    },
    validationSchema: object().shape({
      pledge: number().required(),
    }),
    actionLabel: 'Proceed',
  },
  {
    id: 'shares',
    component: SharesInfo,
    initialValues: {
      shares: '',
    },
    validationSchema: object().shape({
      shares: number().required(),
    }),
    actionLabel: 'Proceed',
  },
  {
    id: 'summary',
    component: Summary,
  },
]