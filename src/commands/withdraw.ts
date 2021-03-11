import { Command, Booster } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { MoneyWithdrawn } from '../events/money-withdrawn'
import { Account } from '../entities/account'
import { InsufficientFunds } from '../events/insufficient-funds'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class Withdraw {
  public constructor(readonly accountNumber: UUID, readonly amount: number) {}

  public static async handle(command: Withdraw, register: Register): Promise<void> {
    const account = await Booster.fetchEntitySnapshot(Account, command.accountNumber)

    // @ts-ignore
    if (account?.balance - command.amount < 0) {
      register.events(new InsufficientFunds(command.accountNumber))
    } else {
      register.events(new MoneyWithdrawn(command.accountNumber, command.amount))
    }
  }
}
