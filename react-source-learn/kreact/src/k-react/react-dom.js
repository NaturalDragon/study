

function render(vnode, container) {
    const dom = createNode(vnode)

    if (!dom) return
    container.appendChild(dom)
}

function createNode(vnode) {
    if (!vnode) return
    const { type } = vnode;
    let node;
    if (typeof type === 'string') {
        node = updateHostComponent(vnode)
    }
    else if (typeof type === 'function') {
        node =
            type.prototype.isReactComponent ? updateClassComponet(vnode) : updateFunctionComponent(vnode)
    }
    else {
        node = updateTextComponent(vnode)
    }
    return node
}

function updateHostComponent(vnode) {
    const { type, props } = vnode;
    var node = document.createElement(type)
    updateNode(node, props)
    reconcileChildren(node, props.children)
    return node
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
function updateFunctionComponent(vnode) {
    const { type, props } = vnode;
    const vvnode = type(props);
    const node = createNode(vvnode)
    return node;
}
const isProperty = key => key !== 'children'
/**
 * 更新属性
 * @param {*} node 
 * @param {*} nextProps 
 */
function updateNode(node, nextProps) {
    Object.keys(nextProps)
        .filter(isProperty)
        .forEach(name => node[name] = nextProps[name])
}
function updateTextComponent(vnode) {
    return document.createTextNode(vnode)
}
function reconcileChildren(parentNode, children) {
    const newChildren = Array.isArray(children) ? children : [children];
    for (let i = 0; i < newChildren.length; i++) {
        const element = newChildren[i];
        render(element, parentNode)

    }
}
export default {
    render
}
