import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ChatView from '@/views/ChatView.vue'
import FeedbackView from '@/views/FeedbackView.vue'
import AnnouncementsView from '@/views/AnnouncementsView.vue'
import EventsView from '@/views/EventsView.vue'
import DonateView from '@/views/DonateView.vue'
import IndexView from '@/views/IndexView.vue'
import AuthView from '@/views/AuthView.vue'
import ElectionsView from '@/views/ElectionsView.vue'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const route = (name, component, auth = true) => {
  return { path: `/${name}`, name: name, component: component, meta: { requiresAuth: auth } }
}

const routes = [
  route('', IndexView, false),
  route('auth', AuthView, false),
  route('home', HomeView),
  route('chat', ChatView),
  route('feedback', FeedbackView),
  route('announcements', AnnouncementsView),
  route('events', EventsView),
  route('donate', DonateView),
  route('elect', ElectionsView)
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

let user = null

onAuthStateChanged(auth, (u) => (user = u ? u : null))

router.beforeEach(async (to, _from, next) => {
  if (to.meta.requiresAuth) {
    if (!user) {
      next({ name: 'auth' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
