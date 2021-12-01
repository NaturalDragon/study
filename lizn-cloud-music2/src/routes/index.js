import React,{lazy,Suspense} from 'react';
import {Redirect} from 'react-router-dom'
import Home from '../application/Home'


const SuspenseComponent=Component=>{
    return function(props){
       return ( <Suspense fallback={null}> 
        <Component {...props}></Component>
    </Suspense>)
    }
}

// const SuspenseComponent = Component => props => {
//   return (
//     <Suspense fallback={<div>11</div>}>
//       <Component {...props}></Component>
//     </Suspense>
//   )
// }
const RecommendComponent = lazy(() => import("../application/Recommend/"));
const SingersComponent = lazy(() => import("../application/Singers/"));
const RankComponent = lazy(() => import("../application/Rank/"));
const AlbumComponent = lazy(() => import("../application/Album/"));
const SingerComponent=lazy(()=>import('../application/Singer'))
export default [
    {
        path:'/',
        component:Home,
        routes:[
            {
                path:'/',
                exact:true,
                render:()=>(
                    <Redirect to='/recommend'> </Redirect>
                )
            },
            {
                path: "/recommend",
                component: SuspenseComponent(RecommendComponent),
                routes:[
                   {
                     path:'/recommend/:id',
                     component:SuspenseComponent(AlbumComponent)
                   }
                ]
              },
              {
                path: "/singers",
                component: SuspenseComponent(SingersComponent),
                routes:[
                  {
                    path:'/singers/:id',
                    component:SuspenseComponent(SingerComponent)
                  }
                ]
              },
              {
                path: "/rank",
                component: SuspenseComponent(RankComponent)
              }
        ]
    }
]