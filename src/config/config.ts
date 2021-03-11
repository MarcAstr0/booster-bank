import { Booster } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import { Provider } from '@boostercloud/framework-provider-aws'

Booster.configure('production', (config: BoosterConfig): void => {
  config.appName = 'bank-prod'
  config.provider = Provider()
})

Booster.configure('demo', (config: BoosterConfig): void => {
  config.appName = 'bank-demo'
  config.provider = Provider()
})
