import registerServiceWorker from './registerSW.js'

function bootstrap(app) {
  registerServiceWorker()
  window.addEventListener('load', app)
}

export default bootstrap