
import React from 'react'



// const promise =new Promise((resolve,reject)=>{
//     console.log('立刻执行')
//      if(1===2){
//          resolve({data:{name:1}})
//      }else{
//          reject({err:{message:'cuowu'}})
//      }
// }).then((res)=>{
//     console.log(res)
// },(err)=>{
//   console.log(err)
// })

// function timeout(ms) {
//     return new Promise((resolve, reject) => {
//       setTimeout(resolve, ms, 'done');
//     });

   
//   }
  
//   timeout(100)
//   .then((value) => {
//     console.log(value);
//   });

// const p1 = new Promise(function (resolve, reject) {
//     setTimeout(() => reject(new Error('fail')), 3000)
//   })
  
//   const p2 = new Promise(function (resolve, reject) {
//     setTimeout(() => resolve(p1), 1000)
//   })
  
//   p2
//     .then(result => console.log(result))
//     .catch(error => console.log(error))

// new Promise((resolve, reject) => {
//      resolve(1);
//     console.log(2);
//   }).then(r => {
//     console.log(r);
//   });

const getJSON = function(url) {
    const promise = new Promise(function(resolve, reject){
      const handler = function() {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      const client = new XMLHttpRequest();
      client.open("GET", url);
      client.onreadystatechange = handler;
      client.responseType = "json";
      client.setRequestHeader("Accept", "application/json");
      client.send();
  
    });
  
    return promise;
  };

  
export default class Index extends React.PureComponent {

  constructor(props){
    super(props);
    //this.test = ::this.test;
  }
    componentDidMount() {
        this.refs.button.addEventListener('click',e=>{
          this.test(e)
        })
    }
    test(event){
      console.log(event); // => nullified object.
      console.log(event.type); // => "click"
      const eventType = event.type; // => "click"
    
      setTimeout(function() {
        console.log(event.type); // => null
        console.log(eventType); // => "click"
      }, 0);
    
      // 不起作用，this.state.clickEvent 的值将会只包含 null
      this.setState({clickEvent: event});
    
      // 你仍然可以导出事件属性
      this.setState({eventType: event.type});
          }
          render() {
              return (<div>
                  promise

                  <button ref='button'>ddd</button>
              </div>)
          }
}