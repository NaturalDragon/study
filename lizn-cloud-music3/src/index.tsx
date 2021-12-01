/** @format */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Button} from 'antd-mobile'
import './index.less'
import {renderRoutes} from 'react-router-config'
import {IconStyle} from '@/assets/iconfont/iconfont.ts'
// import App from '../src/application/app';
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '@/store/index'
import App from '@/routes/index'
import '@babel/polyfill';
// if (module & module.hot) {
//   module.hot.accept();
// }
if (module) {
    ;(module as any).hot.accept()
}
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            {/* <GlobalStyle></GlobalStyle> */}
            <IconStyle></IconStyle>
            <App></App>
        </HashRouter>
    </Provider>,
    document.getElementById('root'),
)

// const App = () => (
//   <div>
//     <header> Hello React</header>

//     <Button type="primary">Antd Button</Button>

//   </div>

// );

// ReactDOM.render(<App />, document.getElementById('root'));
