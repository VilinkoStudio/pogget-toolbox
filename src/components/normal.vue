<template>
  <div class="home-container">
    <div class="categories-container">
      <div 
        v-for="(category, index) in categories" 
        :key="index" 
        class="category-card"
      >
        <h2 class="category-title">{{ category.name }}</h2>
        <div class="tools-grid">
          <button
            v-for="tool in category.tools"
            :key="tool.id"
            class="tool-button"
            @click="goToTool(tool)"
          >
            {{ tool.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import allowedSites from '@/data/allowedSites.json'

export default {
  name: 'NormalHome',
  data() {
    return {
      categories: allowedSites.categories || []
    }
  },
  mounted() {
    console.log('Categories loaded:', this.categories)
  },
  methods: {
    goToTool(tool) {
      // 验证链接有效性
      if (!tool.url || tool.url.trim() === '') {
        console.warn('无效的链接:', tool)
        return
      }
      
      try {
        // 检查是否为有效URL
        new URL(tool.url)
        // 动态获取当前部署环境的基础URL
        const baseUrl = `${window.location.origin}${window.location.pathname}`
        // 移除可能的文件名，确保指向正确的基础路径
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'
        const redirectUrl = `${cleanBaseUrl}#/webview?key=${tool.id}&link=${encodeURIComponent(tool.url)}`
        // 在当前页面跳转而非新页面打开
        window.location.href = redirectUrl
        // 跳转后强制刷新页面
        setTimeout(() => {
          window.location.reload()
        }, 100)
      } catch (error) {
        console.error('无效的URL格式:', tool.url, error)
      }
    }
  }
}
</script>

<style scoped>
.home-container {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  box-sizing: border-box;
  overflow-x: hidden;
  margin: 0;
}

.categories-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  box-sizing: border-box;
}

.category-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #ddd;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
}

.category-title {
  color: #333;
  font-size: 1.4rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
  width: 100%;
  box-sizing: border-box;
}

.tool-button {
  background: #f5f5f5;
  color: #5279fb;
  border: none;
  border-radius: 25px;
  padding: 12px 16px;
  font-size: 1rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  box-sizing: border-box;
  width: 100%;
}

.tool-button:hover {
  background: #f5f5f5;
  box-shadow: 0 0 0 1px #5279fb;
  transform: none;
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .home-container {
    padding: 15px;
  }
}
</style>