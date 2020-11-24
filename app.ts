import DefaultDriver from "./driver/driver.default"
import { StorageSQLProvider } from "./storage/sql/provider"

const d = new DefaultDriver()

if (process.argv[2] === 'migrate') {
  const StorageSQLs = d.registry().manager().storageManager() as StorageSQLProvider
  const argv = process.argv
  argv.splice(0, 3)
  StorageSQLs.migrate(...argv)
}

if (process.argv[2] === 'serve') {
  d.registry().handler().serve()
}