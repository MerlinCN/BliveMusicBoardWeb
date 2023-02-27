<template>
    <a-layout :style="{ height: '100vh' }" theme="auto">
        <a-layout-sider>
            <a-menu mode="inline" v-model:selectedKeys="current" @select="handleMenuSelect">
                <a-menu-item key="1">
                    <span>编辑</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <span>设置</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px' }">
            <component :is="selectedTab" />
        </a-layout-content>
    </a-layout>
</template>
  
<script>
import { Layout } from 'ant-design-vue';
import SongEditor from '../components/SongEditor.vue';
import SongsSetting  from "../components/SongsSetting.vue";
import { ref } from "vue";
export default {
    name: 'AdminMain',
    components: {
        'a-layout': Layout,
        SongEditor,
        SongsSetting
    },
    data() {
        return {
            collapsed: false,
            selectedTab: 'SongEditor', // 默认显示歌曲列表页签
        };
    },
    methods: {
        handleMenuSelect({ key }) {
            if (key === '1') {
                this.selectedTab = 'SongEditor'; // 切换到歌曲列表页签
            } else if (key === '2') {
                this.selectedTab = 'SongsSetting'; // 切换到设置页签
            }
        },
    },
    setup() {
        const current = ref(['1']);
        return {
            current,
        };
    },
};
</script>
  