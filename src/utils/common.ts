import * as allAnimation from './animation'

/**
 * 创建一个类名为 cloneElClassName 的深度克隆元素节点
 * */
export function createElMainCloneEl(cloneElClassName: string): HTMLElement {
  if (!cloneElClassName) console.warn('创建克隆动画元素时未找到 cloneElClassName ')
  const elMainEl = document.getElementById('el-main')
  if (!elMainEl) return
  const elMainCloneEl = document.createElement('div')
  elMainCloneEl.classList.add(cloneElClassName.replace('.', ''))
  Array.from(elMainEl.children).forEach(node => {
    elMainCloneEl.appendChild(node.cloneNode(true))
  })
  const rect = elMainEl.getBoundingClientRect()
  elMainCloneEl.style.overflow = 'hidden'
  elMainCloneEl.style.position = 'fixed'
  elMainCloneEl.style.height = `${rect.height}px`
  elMainCloneEl.style.width = `${rect.width}px`
  elMainCloneEl.style.left = `${rect.x}px`
  elMainCloneEl.style.top = `${rect.y}px`
  return elMainCloneEl
}

/**
 * 执行某个动画
 * animation.length 如果参数是一个，则不克隆目标节点，如果是两个，则克隆并添加到body上
 * */
export async function execAnimation(animation: Function, classNameBaseOrEl: string | HTMLElement, classNameCloneOrEl: string | HTMLElement) {
  if (typeof classNameBaseOrEl === 'string') classNameBaseOrEl = document.querySelector(classNameBaseOrEl)
  if (!classNameBaseOrEl) return;
  if (typeof classNameCloneOrEl === 'string') classNameCloneOrEl = createElMainCloneEl(classNameCloneOrEl)
  if (typeof animation !== 'function') return
  document.body.appendChild(<HTMLElement>classNameCloneOrEl);
  await animation.call(null, classNameBaseOrEl, classNameCloneOrEl);
  classNameCloneOrEl.remove()
}

/**
 * 随机选择一个动画名称
 * */
export function choiceRandAnimation(): Function {
  const keys = Object.keys(allAnimation)
  const index = Math.floor(Math.random() * keys.length)
  return <Function> allAnimation[keys[index]]
}

/**
 * 随机选择一个动画名称
 * */
const animationList: Function[] = Object.values(allAnimation)

export function choiceAnimation(): Function {
  const animation = <Function>animationList.shift()
  animationList.push(animation)
  return animation
}

/**
 * 随机选择某个列表项
 * */
export function choice(list: any[]) {
  const index = Math.floor(Math.random() * list.length)
  return list[index]
}
