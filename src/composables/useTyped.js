import { ref, onBeforeUnmount } from 'vue'

export function useTyped(strings, { typeSpeed = 80, backSpeed = 50, backDelay = 2000, loop = true } = {}) {
  const currentText = ref('')
  let index = 0
  let charIndex = 0
  let isDeleting = false
  let timer = null
  let stopped = false

  function tick() {
    if (stopped) return

    const currentString = strings[index]

    if (!isDeleting) {
      // 打字
      charIndex++
      currentText.value = currentString.slice(0, charIndex)

      if (charIndex >= currentString.length) {
        // 打完，等待后开始删除
        timer = setTimeout(() => {
          isDeleting = true
          tick()
        }, backDelay)
        return
      }

      timer = setTimeout(tick, typeSpeed)
    } else {
      // 删除
      charIndex--
      currentText.value = currentString.slice(0, Math.max(0, charIndex))

      if (charIndex <= 0) {
        isDeleting = false
        if (loop) {
          index = (index + 1) % strings.length
        } else {
          index++
          if (index >= strings.length) {
            // 停在最后一句，不再继续
            stopped = true
            return
          }
        }
        timer = setTimeout(tick, typeSpeed * 2)
        return
      }

      timer = setTimeout(tick, backSpeed)
    }
  }

  function start() {
    stopped = false
    timer = setTimeout(tick, 300)
  }

  function stop() {
    stopped = true
    if (timer) clearTimeout(timer)
  }

  onBeforeUnmount(stop)

  return { currentText, start, stop }
}
