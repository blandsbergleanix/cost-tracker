import costListOverview from '../view/costListOverview.vue'
export default [

  { path: '/overview', component: costListOverview },
  {path: '/', redirect: '/overview'}
]
