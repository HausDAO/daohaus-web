import { object, string, number } from 'yup'

import PersonalInfo from './personalInfo'
import PledgeInfo from './pledgeInfo'
import Summary from './summary'

export default [
  {
    id: 'personal',
    component: PersonalInfo,
    initialValues: {
      name: '',
      bio: '',
    },
    // validationSchema: object().shape({
    //   name: string().required(),
    // }),
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
    onAction: (sectionValues, formValues) => {
      if (sectionValues.pledge === 'argh!') {
        throw new Error('Please, choose a better name!')
      }
    },
  },
  {
    id: 'summary',
    component: Summary,
  },
]