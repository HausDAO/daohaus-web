import { object, number, string } from 'yup'

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
    validationSchema: object().shape({
      name: string().required(),
      bio: string().required(),
    }),
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
  },
  {
    id: 'summary',
    component: Summary,
  },
]