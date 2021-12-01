
const PLACEMENT = 'PLACEMENT';
const UPDATE = 'UPDATE';
const DELETION = 'DELETION'
/**
 *props包括ref、key需要做一次分离；
 children子项有可能是string或者number这类原始数据类型，原始类型与文本节点对于，故统一处理为TEXT_ELEMENT类型，
 将children附加到props上面
 返回ReactElement对象
 * @param {*} type
 * @param {*} config
 * @param  {...any} children
 */
function createElement(type, config, ...children) {
  debugger
  let key = null;
  let ref = null;
  let props = {};
  if (config) {
    for (const name in config) {
      if (Object.prototype.hasOwnProperty.call(config, name)) {
        if (name === "key") {
          key = config[name];
        } else if (name === "ref") {
          ref = config[name];
        } else {
          props[name] = config[name];
        }
      }
    }
  }
  props.children = children.map((child) =>
    typeof child === "object"
      ? child
      : {
        type: "TEXT_ELEMENT",
        props: {
          nodeValue: child,
          children: {},
        },
      }
  );
  return {
    type,
    key,
    ref,
    props,
  };
}

function createDom(fiber) {
  const { type, props } = fiber;
  const dom =
    type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(type);
  Object.keys(props)
    .filter((key) => key !== "children")
    .forEach((name) => {
      dom[name] = props[name];
    });
}

const isEvent = key => key.startsWith('on')
const isProtery = key => key !== 'children' && !isEvent(key);
const isNew = (prev, next) => key => prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)
function updateDom(dom, prevProps, nextProps) {

  //remove old event
  Object.keys(prevProps).filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventListenser(eventType, prevProps[name])
    })

  //add or update event
  Object.keys(nextProps).filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListenser(eventType, nextProps[name])
    })

  //remove old properties
  Object.keys(prevProps).filter(isProtery)
    .filter(isNew(prevProps, nextProps))
    .filter(isGone(prevProps, nextProps))
    .forEach(name => dom[name] = '')

  //add new  or update properties
  Object.keys(nextProps).filter(isProtery)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => dom[name] = nextProps[name])
}

function commitRoot() {
  deletions.forEach(commitWork)
  commitRoot(workInProgressRoot.child)
  currentRoot = workInProgressRoot
  workInProgressRoot = null
}
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const parentFiber = fiber.parent;
  while (parentFiber.dom === null) {
    parentFiber = parentFiber.parent
  }
  const parentDom = parentFiber.dom;

  if (fiber.effectTag === PLACEMENT &&
    fiber.dom != null) {
    parentDom.appendChild(fiber.dom)
  } else if (fiber.effectTag === DELETION) {
    //parentDom.removeChild(fiber.dom)
    commitDeletion(parentDom, fiber)
  } else if (fiber.effectTag === UPDATE && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)

}
function commitDeletion(domParent, fiber) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(domParent, fiber.child)
  }
}
function render(element, container) {
  //   const { type, props } = element;
  //   const dom =
  //     type === "TEXT_ELEMENT"
  //       ? document.createTextNode("")
  //       : document.createElement(type);
  //   Object.keys(props)
  //     .filter((key) => key !== "children")
  //     .forEach((name) => {
  //       dom[name] = props[name];
  //     });
  //   props.children.forEach((child) => render(child, dom));
  //   container.append(dom);

  workInProgressRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot
  };
  deletions = []
  nextUnitOfWork = workInProgressRoot
}

let nextUnitOfWork = null;
let workInProgressRoot = null
let currentRoot = null
let deletions = []
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < -1;
    requestIdleCallback(workLoop);
  }
  if (!nextUnitOfWork && workInProgressRoot) {
    commitRoot()
  }
}
requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {

  if (fiber.type instanceof Function) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

let wipFiber = null
let hookIndex = null
/**
 * 更新函数组件
 * @param {*} fiber 
 */
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = []
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}
function useState(initalState) {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];

  const hook = {
    state: oldHook ? oldHook.state : initalState,
    queue: []
  }
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = action(hook.state)
  })
  const setState = action => {
    hook.queue.push(action);
    workInProgressRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    }
    nextUnitOfWork = workInProgressRoot
    deletions = []
  }
  wipFiber.hooks.push(hook)
  hookIndex++
  return [hook.state, se]
}
/**
 * 更新原生元素
 * @param {*} fiber 
 * @returns 
 */
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements)
  let index = 0;
  let prevSibling = null;
  while (index < elements.length) {
    const element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber;
    index++;
  }
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}
function reconcileChildren(workInProgressFiber, elements) {
  let index = 0;
  let oldFiber = workInProgressFiber.alternate && workInProgressFiber.alternate.child;
  let prevSibling = null
  while (index < elements.length ||
    oldFiber != null) {
    const element = elements[index];
    let newFiber = null;
    const sameType = oldFiber && element && element.type === oldFiber.type;

    if (sameType) {
      // 修改节点
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: workInProgressFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      }
    }
    if (element && !sameType) {
      //新增节点
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: workInProgressFiber,
        alternate: null,
        effectTag: 'PLACEMENT'
      }
    }
    if (oldFiber && !sameType) {
      // 删除oldFiber
      oldFiber.effectTag = 'DELETION'
      deletions.push(oldFiber);
    }

  }
}

const Didact = { render, createElement }

const container = document.getElementById("root")
Didact.render(createElement('p', { title: 'wode' }, 'woqu'), container)
