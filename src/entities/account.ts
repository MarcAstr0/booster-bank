import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { MoneyWithdrawn } from '../events/money-withdrawn'
import { MoneyDeposited } from '../events/money-deposited'
import { InsufficientFunds } from '../events/insufficient-funds'

@Entity
export class Account {
  public constructor(readonly id: UUID, readonly balance: number) {}

  @Reduces(MoneyWithdrawn)
  public static reduceMoneyWithdrawn(event: MoneyWithdrawn, currentAccount?: Account): Account {
    if (currentAccount) {
      return new Account(event.accountNumber, currentAccount.balance - event.amount)
    } else {
      // @TODO: implement edge case of non existing account
      return new Account(event.accountNumber, 0 - event.amount)
    }
  }

  @Reduces(MoneyDeposited)
  public static reduceMoneyDeposited(event: MoneyDeposited, currentAccount?: Account): Account {
    if (currentAccount) {
      return new Account(event.accountNumber, currentAccount.balance + event.amount)
    } else {
      // @TODO: implement edge case of non existing account
      return new Account(event.accountNumber, event.amount)
    }
  }

  @Reduces(InsufficientFunds)
  public static reduceInsufficientFunds(event: InsufficientFunds, currentAccount?: Account): Account {
    if (currentAccount) {
      return currentAccount
    } else {
      // @TODO: implement edge case of non existing account
      return new Account(event.accountNumber, 0)
    }
  }
}
