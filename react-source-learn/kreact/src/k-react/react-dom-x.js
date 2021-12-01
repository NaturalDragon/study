let wipRoot = null
let currentRoot = null
let nextUnitOfWork = null;//下一个单元任务 fiber
let wipFiber = null;
let workInProgressHook = null
let isMount = true;
let deletions = null
const UPDATE = 'UPDATE'
const PLACEMENT = 'PLACEMENT'
const DELETION = 'DELETION'
function render(vnode, container) {
    wipRoot = {
        type: 'div',
        props: {
            children: { ...vnode }
        },
        stateNode: container,
        alternate: currentRoot,
        memorizedState: null,

    }
    deletions = []
    nextUnitOfWork = wipRoot;
}
function createNode(workInProgress) {
    if (!workInProgress) return
    const node = document.createElement(workInProgress.type)
    updateNode(node, {}, workInProgress.props)
    return node
}

function updateHostComponent(workInProgress) {
    const { type, props } = workInProgress;
    if (!workInProgress.stateNode) {
        workInProgress.stateNode = createNode(workInProgress)
    }
    reconcileChildren(workInProgress, props.children)
    console.log('workInProgress', workInProgress)
}
function updateClassComponet(vnode) {
    const { type, props } = vnode;
    const instance = new type(props);
    const vvnode = instance.render();
    const node = createNode(vvnode)
    return node;
}
/**
 * 函數組件
 * @param {*} vnode 
 * @returns 
 */
function updateFunctionComponent(workInProgress) {
    wipFiber = { ...wipFiber, ...workInProgress };
    workInProgressHook = wipFiber.memorizeState
    const { type, props } = workInProgress;
    const vvnode = type(props);
    const children = [vvnode]
    reconcileChildren(workInProgress, children)
}
function dispatchAction(workInProgress, queue, action) {
    isMount = false;
    const { props, type } = workInProgress
    let update = {
        action,
        next: null,
    };
    if (queue.pending === null) {
        update.next = update;
    } else {
        update.next = queue.pending.next;
        queue.pending.next = update;
    }
    queue.pending = update;
    workInProgressHook = wipFiber.memorizeState;
    type(props)

    //run();
}
function useState(initialState) {
    let hook;
    if (isMount) {
        hook = {
            queue: {
                pending: null
            },
            memorizeState: initialState,
            next: null
        }
        if (!wipFiber.memorizeState) {
            wipFiber.memorizeState = hook
        } else {
            workInProgressHook.next = hook
        }
        workInProgressHook = hook
    } else {
        hook = workInProgressHook;
        workInProgressHook = workInProgressHook.next;
    }
    let baseState = hook.memorizeState;
    if (hook.queue.pending) {
        let firstUpdate = hook.queue.pending.next;
        do {
            const action = firstUpdate.action;
            baseState = action(baseState);
            wipRoot = {
                stateNode: currentRoot.stateNode,
                props: currentRoot.props,
                child: currentRoot.child,
                memorizedState: currentRoot.memorizedState,
                stateNode: currentRoot.stateNode,
                type: currentRoot.type,
                alternate: currentRoot,
            }
            firstUpdate = firstUpdate.next;
            nextUnitOfWork = wipRoot
        } while (firstUpdate !== hook.queue.pending.next);
        hook.queue.pending = null;
    }
    hook.memorizeState = baseState;

    //wipRoot = wipFiber
    return [baseState, dispatchAction.bind(null, wipFiber, hook.queue)];
}

const isProperty = key => key !== 'children'

const isEvent = key => key.startsWith("on")
// const isProperty = key =>
//     key !== "children" && !isEvent(key)
const isNew = (prev, next) => key =>
    prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)
/**
 * 更新属性
 * @param {*} node 
 * @param {*} prevProps
 * @param {*} nextProps 
 */
function updateNode(node, prevProps, nextProps) {
    if(typeof nextProps==='number'){
        node.textContent =nextProps
    }
    //Remove old or changed event listeners
    Object.keys(prevProps)
        .filter(isEvent)
        // .filter(isGone(prevProps, nextProps))
        // .filter(isNew(prevProps, nextProps))
        // .filter(
        //     key =>
        //         !(key in nextProps) ||
        //         isNew(prevProps, nextProps)(key)
        // )
        .forEach(name => {
            const eventType = name
                .toLowerCase()
                .substring(2)
            node.removeEventListener(
                eventType,
                prevProps[name]
            )
        })
    // Remove old properties
    // Object.keys(prevProps)
    //     .filter(isProperty)
    //     .filter(isGone(prevProps, nextProps))
    //     .forEach(name => {
    //         node[name] = ""
    //     })
    Object.keys(nextProps)
        //.filter(isProperty)
        .forEach(name => {
            if (name === 'children') {
                if (typeof nextProps[name] === 'string'
                    || typeof nextProps[name] === 'number') {
                    node.textContent = nextProps[name]
                }
                // else if(nextProps[name] instanceof Array){
                //     node.textContent=nextProps[name].join('')
                //  }
            }

            else {
                node[name] = nextProps[name]
            }
        })
    // Add event listeners
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            const eventType = name
                .toLowerCase()
                .substring(2)
            node.addEventListener(
                eventType,
                nextProps[name]
            )
        })
}
function updateTextComponent(workInProgress) {
    if (!workInProgress.stateNode) {
        workInProgress.stateNode = document.createTextNode(workInProgress.props)
    }
}
/**
 * 协调子节点
 * @param {*} workInProgress 
 * @param {*} children 
 */
function reconcileChildren(workInProgress, children) {
    if (typeof children === 'string' || typeof children === 'number') {
        return
    }
    const newChildren = Array.isArray(children) ? children : [children];
    let oldFiber = workInProgress.alternate && workInProgress.alternate.child
    let previousNewFiber = null;
    for (let i = 0; i < newChildren.length; i++) {
        const element = newChildren[i];
        const sameType =
            oldFiber &&
            element &&
            element.type == oldFiber.type

        let newFiber = null
        if (sameType) {
            newFiber = {
                type: element.type,
                props: { ...element.props },
                stateNode: oldFiber.stateNode,
                child: null,
                sibling: null,
                return: workInProgress,
                effectTag: UPDATE,
                alternate: oldFiber
            }
        }
        if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: { ...element.props },
                stateNode: null,
                child: null,
                sibling: null,
                return: workInProgress,
                effectTag: PLACEMENT,
                alternate: null
            }
        }
        if (oldFiber && !sameType) {
            oldFiber.effectTag = "DELETION"
            deletions.push(oldFiber)
        }
        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }
        if (typeof element === 'string'||typeof element==='number') {
            newFiber.props = element
        }
        if (i === 0) {
            //第一个子fiber
            workInProgress.child = newFiber
        } else {
            // 数组从下标1开始转化为链表silbing
            previousNewFiber.sibling = newFiber
        }
        //记录上一个fiber
        previousNewFiber = newFiber
    }
}


function workLoop(deadline) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYield = deadline.timeRemaining() < 1
    }
    //提交
    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
    requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

function commitRoot() {
    commitWork(wipRoot.child)
    currentRoot = wipRoot
    wipRoot = null
}
function commitWork(workInProgress) {
    if (!workInProgress) {
        return
    }
    // 提交自己
    let parentNodeFiber = workInProgress.return;
    while (!parentNodeFiber.stateNode) {
        parentNodeFiber = parentNodeFiber.return
    }
    let parentNode = parentNodeFiber.stateNode;

    if (workInProgress.effectTag === PLACEMENT
        && workInProgress.stateNode) {
        parentNode.appendChild(workInProgress.stateNode)
    } else if (workInProgress.effectTag === UPDATE
        && workInProgress.stateNode) {
        updateNode(workInProgress.stateNode,
            workInProgress.alternate.props,
            workInProgress.props)
    }



    // 提交子元素
    commitWork(workInProgress.child)
    // 提交兄弟元素
    commitWork(workInProgress.sibling)
}
/**执行任务，并返回下一个任务
 * 
 * @param {*} workInProgress 
 */
function performUnitOfWork(workInProgress) {
    const { type } = workInProgress
    // step1 执行任务
    if (typeof type === 'string') {
        updateHostComponent(workInProgress)
    }
    else if (typeof type === 'function') {
        updateFunctionComponent(workInProgress)
    }
    else if (typeof type === 'undefined') {
        updateTextComponent(workInProgress)
    }
    // step2 并且返回下一个任务
    if (workInProgress.child) {
        return workInProgress.child;
    }
    let nextFiber = workInProgress;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.return
    }
}
export default {
    render,
    useState
}
