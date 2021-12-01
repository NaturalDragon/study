
import React, { useEffect, useState } from 'react'
// export default class Example extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         count: 0
//       };
//     }

//     componentDidMount() {
//       document.title = `You clicked ${this.state.count} times`;
//     }
//     componentDidUpdate() {
//       document.title = `You clicked ${this.state.count} times`;
//     }

//     render() {
//       return (
//         <div>
//           <p>You clicked {this.state.count} times</p>
//           <button onClick={() => this.setState({ count: this.state.count + 1 })}>
//             Click me
//           </button>
//         </div>
//       );
//     }
//   }

// function Counter() {
//     const [count,setCount]=useState(0)

//     useEffect(()=>{

//         document.title=`You clicked ${count} times`;
//         return ()=>{
//             console.log('out')
//         }
//     },[count])

//     return (<div>
//         <p>You clicked {count} times</p>
//         <button onClick={() => setCount(1)}>
//             Click me
//       </button>
//     </div>)
// }

// export default Counter;
 
  function Person() {
    const [per, setPer] = useState({ name: 'lzn', age: 1 })

    useEffect(() => {
        document.title = `You clicked ${per.age} times`;
        return () => {
            console.log('out')
        }
    },[per.age])

    return (
        <div><ul>
            <li>{per.name}</li>
            <li>{per.age}</li>
        </ul>
            <button onClick={e => setPer({ name: 'lzncy', age: 2 })}>更新</button>
        </div>
    )
}

export default function Form() {
    // 1. Use the name state variable
    const [name, setName] = useState('Mary');
    const [person,setPerson]=useState(()=>{
        return {
            id:'1',
            age:10
        }
    })
    // 2. Use an effect for persisting the form
    useEffect(function persistForm() {
        debugger
      localStorage.setItem('formData', name);
    });
  
    // 3. Use the surname state variable
    const [surname, setSurname] = useState('Poppins');
  
    // 4. Use an effect for updating the title
    useEffect(function updateTitle() {
        debugger
      document.title = name + ' ' + surname;
    });
  
    return (<div>
        {name}
        {JSON.stringify(person)}
        <button onClick={e=>{
            setPerson(prev=>{
                return {
                    ...prev,...{name:'lzn'}
                }
            })
        }}>add</button>
        <div></div>
        <button onClick={e => setName('lzncy')}>更新</button>
    </div>)
  }