import app from './app'
import config from './app/config'

app.listen(config.APP_PORT, () => {
  console.log('start success')
})
