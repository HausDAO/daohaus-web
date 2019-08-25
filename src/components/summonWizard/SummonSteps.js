import { object, number, string } from "yup";

import DaoInformation from "./DaoInformation";
import CurrencyInfo from "./CurrencyInfo";
import TimingInfo from "./TimingInfo";
import DepositInfo from "./DepositInfo";
import SummonSummary from "./SummonSummary";

export default [
  {
    id: "dao",
    component: DaoInformation,
    initialValues: {
      name: "",
      description: ""
    },
    validationSchema: object().shape({
      name: string().required(),
      description: string().required()
    })
  },
  {
    id: "currency",
    component: CurrencyInfo,
    initialValues: {
      approvedToken: "",
      minimumTribute: ""
    },
    validationSchema: object().shape({
      approvedToken: string().required(),
      minimumTribute: number().required()

    }),
    actionLabel: "Proceed"
  },
  {
    id: "timing",
    component: TimingInfo,
    initialValues: {
      periodDuration: "",
      votingPeriodLength: "",
      gracePeriodLength: "",
      abortWindow: ""
    },
    validationSchema: object().shape({
      periodDuration: number().required(),
      votingPeriodLength: number().required(),
      gracePeriodLength: number().required(),
      abortWindow: number().required()
    }),
    actionLabel: "Proceed"
  },
  {
    id: "deposit",
    component: DepositInfo,
    initialValues: {
      proposalDeposit: "",
      dilutionBound: "",
      processingReward: ""
    },
    validationSchema: object().shape({
      proposalDeposit: number().required(),
      dilutionBound: number().required(),
      processingReward: number().required()
    }),
    actionLabel: "Proceed"
  },
  {
    id: "summary",
    component: SummonSummary
  }
];
