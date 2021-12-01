import React, { useState, useEffect } from 'react';


// function Counter() {
//     const [count,setCount]=useState(0)

//     useEffect(()=>{
//         debugger
//         document.title=`You clicked ${count} times`;
//         return ()=>{
//             console.log('out')
//         }
//     })
//     debugger
//     return (<div>
//         <p>You clicked {count} times</p>
//         <button onClick={() => setCount(count + 1)}>
//             Click me
//       </button>
//     </div>)
// }

// export default Counter;
const ChatAPI = {
    subscribeToFriendStatus(id, callBack) {
        console.log('subscribeToFriendStatus')
        debugger
        callBack && callBack({ isOnline: true })
    },
    unsubscribeFromFriendStatus(id, callBack) {
        console.log('unsubscribeFromFriendStatus')
        debugger
        callBack && callBack({ isOnline: false })
    }
}
// function FriendStatus(props) {
//     const [isOnline, setIsOnline] = useState(null);

//     function handleStatusChange(status) {
//         setIsOnline(status.isOnline);
//     }

//     useEffect(() => {
//         ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
//         return () => {
//             ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
//         };
//     });

//     if (isOnline === null) {
//         return 'Loading...';
//     }
//     return isOnline ? <div>Online</div> : <div>Offline</div>;
// }

// export default FriendStatus

function UserFriendStatus(friendId) {
    const [isOnline, setIsOnline] = useState(true);
    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }
    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(friendId, handleStatusChange)
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(friendId, handleStatusChange);
        };
    })



    return isOnline;

}

// function FriendStatus(props) {
//     const isOnline=UserFriendStatus(props.friend.id)
//     if (isOnline === null) {
//         return 'Loading...';
//       }
//       return isOnline ? 'Online' : 'Offline';
// }

function FriendListItem(props) {
    const [counter,setCounter]=useState(1)
    const isOnline = UserFriendStatus(props.friend.id);

    return (
        <ul>
            <li style={{ color: isOnline ? 'red' : 'black' }}>
            {props.friend.name}
        </li>
        <li onClick={e=>{setCounter(counter+1)}}>dd</li>
        </ul>
    );
}

export default FriendListItem;