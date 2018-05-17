import costListOverview from '../Routes/costListOverview.vue'
export default [

  {
    path: '/overview', component: costListOverview
  },
  {path: '/', redirect: '/overview'}
]
