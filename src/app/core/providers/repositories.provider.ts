import { authProvider } from "./auth/auth.provider";
import { transactionProvider } from "./transactions/transactions.provider";

export const ALL_REPOSITORIES = [
    authProvider(),
    transactionProvider(),
]
