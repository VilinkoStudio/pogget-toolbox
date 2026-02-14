<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(20)
let timer = null

onMounted(() => {
  // 启动倒计时
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      router.push('/')
    }
  }, 1000)
})

onUnmounted(() => {
  // 清理定时器
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#e64c4f" stroke-width="2"/>
          <path d="M12 8V12" stroke="#e64c4f" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 16H12.01" stroke="#e64c4f" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <h1 class="error-title">参数错误</h1>
      <p class="error-description">
        <strong>Error: 400 Bad Request</strong>
        <br/>
        当前 URL 包含无效参数，请检查后重试。
      </p>
      <p class="countdown-text">
        {{ countdown }} 秒后自动返回首页
      </p>
    </div>
  </div>
</template>

<style scoped>
.error-container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.error-content {
  text-align: center;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px;
  /* 禁止文本复制 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.error-icon {
  margin-bottom: 20px;
}

.error-title {
  font-size: 24px;
  font-weight: bold;
  color: #e64c4f;
  margin-bottom: 10px;
}

.error-description {
  font-size: 16px;
  color: #666666;
  line-height: 1.5;
  margin-bottom: 20px;
}

.countdown-text {
  font-size: 14px;
  color: #999999;
  margin-top: 20px;
}
</style>