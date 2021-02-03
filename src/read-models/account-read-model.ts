import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult } from '@boostercloud/framework-types'
import { Account } from '../entities/account'

@ReadModel({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class AccountReadModel {
  public constructor(public id: UUID, readonly balance: number) {}

  @Projects(Account, 'id')
  public static projectAccount(
    entity: Account,
    currentAccountReadModel?: AccountReadModel
  ): ProjectionResult<AccountReadModel> {
    return new AccountReadModel(entity.id, entity.balance)
  }
}
