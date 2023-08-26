// noinspection JSUnusedGlobalSymbols

import gsap from "gsap";

/**
 * 该文件只能存放动效函数，外部导出会将所有动效函数导出
 * 必须使用onComplete 手动通过resolve完成本次动画任务
 * 如果函数参数只有一个，则不会产生该base节点的克隆节点，如果函数参数指定为两个，可会产生一个base元素完全一个样的克隆节点
 * 函数名对应：
 * 数字 度数或者距离
 * F  fade
 * B  bottom  到底部
 * T  top   到顶部
 * L  left   从右到左
 * R  right   从左到右
 * SI scale inner   往内缩放
 * SO scale outer   往外放大
 * RY rotate   Y轴旋转
 * I  往内(Z轴)
 * I  往外(Z轴)
 * FO  fold 折叠
 * E  expand 展开
 * D  dissolution 溶解效果
 * */

export async function Clone_F_B__Base_F_T(classNameBaseOrEl: HTMLElement, classNameCloneOrEl: HTMLElement) {
  return new Promise(resolve => {
    gsap.timeline()
      .fromTo(classNameCloneOrEl, {
        ease: 'back.in',
      }, {
        scale: 0.8,
      })
      .fromTo(classNameCloneOrEl, {
        ease: 'back.inOut',
      }, {
        y: '100%',
        opacity: 0,
      })
      .from(classNameBaseOrEl, {
        y: '100%',
        opacity: 0,
        zIndex: 1000,
        onComplete() {
          resolve()
        }
      }, '<')
  })
}

export async function Clone_F_B__Base_F_B(classNameBaseOrEl: HTMLElement, classNameCloneOrEl: HTMLElement) {
  return new Promise(resolve => {
    gsap.timeline()
      .fromTo(classNameCloneOrEl, {
        ease: 'back.in',
      }, {
        scale: 0.8,
      })
      .fromTo(classNameCloneOrEl, {
        ease: 'back.inOut',
      }, {
        y: '100%',
        opacity: 0,
      })
      .from(classNameBaseOrEl, {
        y: '-100%',
        opacity: 0,
        zIndex: 1000,
        onComplete() {
          resolve()
        }
      }, '<')
  })
}

export async function Clone_F_SI_Base_F_SO(classNameBaseOrEl: HTMLElement, classNameCloneOrEl: HTMLElement) {
  return new Promise(resolve => {
    gsap.timeline()
      .to(classNameCloneOrEl, {
        duration: 0.3,
        opacity: 0,
        scale: 0.5
      })
      .from(classNameBaseOrEl, {
        duration: 0.3,
        opacity: 0,
        scale: 0.5,
        onComplete() {
          resolve()
        }
      })
  })
}

export async function Clone_FO_F_T__Base_F_E_B(classNameBaseOrEl: HTMLElement, classNameCloneOrEl: HTMLElement) {
  return new Promise(resolve => {
    gsap.timeline()
      .set(classNameBaseOrEl, {
        opacity: 0
      })
      .to(classNameCloneOrEl, {
        opacity: 0,
        ease: 'back.out',
        duration: 0.5,
        height: 0
      })
      .from(classNameBaseOrEl, {
        height: 0,
        opacity: 1,
        onComplete() {
          resolve()
        }
      })
  })
}


export async function Clone_F_RY_SI__BASE_B_L(classNameBaseOrEl: HTMLElement, classNameCloneOrEl: HTMLElement) {
  return new Promise(resolve => {
    gsap.timeline()
      .set(classNameCloneOrEl.parentNode, {
        perspective: 1000
      })
      .set(classNameBaseOrEl.parentNode, {
        perspective: 1000,
      })
      .to(classNameCloneOrEl, {
        rotateY: 90,
        translateZ: -1000,
        width: '10%',
        x: '-30%',
        opacity: 0,
        duration: 1,
        transformOrigin: 'right',
        transformStyle: 'preserve-3d',
      })
      .from(classNameBaseOrEl, {
        x: '100%',
        onComplete() {
          resolve()
        }
      }, '<')
  })
}


export async function Clone_F_RY_I_90__Base_F_RY_O_90(classNameBaseOrEl: HTMLElement, classNameCloneOrEl: HTMLElement) {
  return new Promise(resolve => {
    gsap.timeline()
      .set(classNameCloneOrEl.parentNode, {
        perspective: 1000
      })
      .set(classNameBaseOrEl.parentNode, {
        perspective: 1000,
      })
      .to(classNameCloneOrEl, {
        rotateY: 90,
        translateZ: -1000,
        opacity: 0,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      })
      .from(classNameBaseOrEl, {
        translateZ: -1000,
        opacity: 0,
        rotateY: -90,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        onComplete() {
          resolve()
        }
      })
  })
}

export async function Clone_F_RX_I_45__Base_B(classNameBaseOrEl: HTMLElement, classNameCloneOrEl: HTMLElement) {
  return new Promise(resolve => {
    gsap.timeline()
      .set(classNameCloneOrEl.parentNode, {
        perspective: 1000
      })
      .to(classNameCloneOrEl, {
        rotateX: 45,
        opacity: '0.6',
        transformStyle: 'preserve-3d',
        transformOrigin: 'bottom',
      })
      .from(classNameBaseOrEl, {
        y: '-100%',
        zIndex: 1000,
        duration: 0.4,
        onComplete() {
          resolve()
        }
      }, '>-0.2')
      .to(classNameCloneOrEl, {
        opacity: 0,
      }, '>-0.25')
  })
}


export async function Clone_D__Base_D(classNameBaseOrEl: HTMLElement, classNameCloneOrEl: HTMLElement) {
  return new Promise(resolve => {
    gsap.timeline()
      .to(classNameCloneOrEl, {
        duration: 0.6,
        opacity: 0,
        filter: 'blur(12px) ',
      })
      .from(classNameBaseOrEl, {
        zIndex: 1000,
        duration: 0.6,
        opacity: 0,
        filter: 'blur(12px)',
        onComplete() {
          resolve(void 1)
        }
      }, '>-0.6')
  })
}
