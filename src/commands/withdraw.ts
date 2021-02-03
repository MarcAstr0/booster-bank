import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { MoneyWithdrawn } from '../events/money-withdrawn'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class Withdraw {
  public constructor(readonly accountNumber: UUID, readonly amount: number) {}

  public static async handle(command: Withdraw, register: Register): Promise<void> {
    register.events(new MoneyWithdrawn(command.accountNumber, command.amount))
  }
}
