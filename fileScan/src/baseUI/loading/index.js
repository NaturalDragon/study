import React from 'react';
import styles from './index.less'


function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <div></div>
      <div></div>
    </div>
  );
}

export default React.memo(Loading);