import costListOverview from '../view/costListOverview.vue'
import costdetails from '../view/costItem.vue'
export default [

  { path: '/overview', component: costListOverview },
  { path: '/costdetails', component: costdetails },
  {path: '/', redirect: '/overview'}
]
