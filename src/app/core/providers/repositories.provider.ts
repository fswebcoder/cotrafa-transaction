import { authProvider } from "./auth/auth.provider";
import { transactionProvider } from "./transactions/transactions.provider";
import { historyProvider } from "./history/history.provider";

export const ALL_REPOSITORIES = [
    authProvider(),
    transactionProvider(),
    historyProvider(),
]
