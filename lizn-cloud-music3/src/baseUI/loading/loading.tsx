import * as React from 'react';
import './loading.less'

function Loading()  {
  return (
    <div className='loadingWrapper'>
      <div></div>
      <div></div>
    </div>
  );
}
 
export default React.memo(Loading);