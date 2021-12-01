import React from 'react';
import message, { PropsProxyHoc,debugIIHoc,styleIIHoc, compose} from '../hocs/HOCAPI'





 class Index extends React.Component {
    componentDidMount() {
       
        message.info();
        message.success('成功');
    }
    render() {

        return (
            <div>static</div>
        )
    }
};

export default compose(debugIIHoc,styleIIHoc)(Index)