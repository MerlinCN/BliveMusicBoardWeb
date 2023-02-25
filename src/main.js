import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'; // 引入样式文件
import Antd from 'ant-design-vue';
import router from './router';




// import 'ant-design-vue'
createApp(App).use(router).use(Antd).mount('#app');
