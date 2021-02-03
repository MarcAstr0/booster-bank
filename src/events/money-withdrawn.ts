import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class MoneyWithdrawn {
  public constructor(readonly accountNumber: UUID, readonly amount: number) {}

  public entityID(): UUID {
    return this.accountNumber
  }
}
