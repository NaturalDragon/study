import styles from '../components/Mobile/TagEdit.less'

const tags = [
    {name: '住宿费', group: 'tag', checkbox: false, sty: styles.hotel, value: '0'},
    {name: '餐饮费', group: 'tag', checkbox: false, sty: styles.catering, value: '1'},
    {name: '交通费', group: 'tag', checkbox: false, sty: styles.traffic, value: '2'},
    {name: '采购费', group: 'tag', checkbox: false, sty: styles.procurement, value: '3'},
    {name: '其他', group: 'tag', checkbox: false, sty: styles.other, value: '4'}
  ]

  export default{
    tags
  }