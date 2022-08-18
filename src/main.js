import { createApp, defineAsyncComponent } from 'vue'

import App from './App'
import router from './router'
import store from './store/index'
import BaseCard from './components/ui/BaseCard'
import BaseButton from './components/ui/BaseButton'
import BaseBadge from './components/ui/BaseBadge'
import BaseSpinner from './components/ui/BaseSpinner'
// import BaseDialog from './components/ui/BaseDialog'

// defineAsyncComponent function: allows to define a component which is loaded only when its required.
const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog'))

const app = createApp(App)

app.use(router)
app.use(store)

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-badge', BaseBadge)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)

app.mount('#app')