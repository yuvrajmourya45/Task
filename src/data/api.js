import { allTransactions } from "./mockData"

export function fetchTransactions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allTransactions)
    }, 800)
  })
}
