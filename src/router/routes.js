import costListOverview from '../Routes/costListOverview.vue'
import costdetails from '../Routes/costItem.vue'
export default [

  {
    path: '/overview', component: costListOverview
  },
  {path: 'costdetail', component: costdetails},
  {path: '/', redirect: '/overview'}
]
