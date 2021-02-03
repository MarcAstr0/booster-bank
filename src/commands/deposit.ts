import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { MoneyDeposited } from '../events/money-deposited'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class Deposit {
  public constructor(readonly accountNumber: UUID, readonly amount: number) {}

  public static async handle(command: Deposit, register: Register): Promise<void> {
    register.events(new MoneyDeposited(command.accountNumber, command.amount))
  }
}
