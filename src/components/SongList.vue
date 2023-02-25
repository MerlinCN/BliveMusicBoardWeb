<template>
    <div class="table-container" :class="{ 'scrollable': isScrollable }">
        <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :locale="{ emptyText: '还没有人点歌哦~' }"
            :showHeader="false" />

    </div>
</template>
  
<style scoped>
.table-container {
    opacity: 0.9;
}
</style>

  
<script>
import { ref, computed } from 'vue';
import { Table } from 'ant-design-vue';
export default {
    components: {
        'a-table': Table,
    },

    mounted() {
        this.fetchSongData(); // 初始化页面数据
        setInterval(() => {
            this.fetchSongData(); // 每隔1秒获取最新的歌曲数据
        }, 1000);
    },
    methods: {
        fetchSongData() {
            fetch('http://localhost:4220/songs')
                .then(response => response.json())
                .then(data => {
                    this.dataSource = data.data.map((item, index) => {
                        return {
                            ...item,
                            index: index + 1
                        };
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },

    setup() {
        const dataSource = ref([]);
        const columns = [
            {
                // title: '序号',
                key: 'index',
                dataIndex: 'index',
                width: '50px',
            },
            {
                // title: '歌名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                // title: '点歌人',
                dataIndex: 'user',
                key: 'user',
            },
        ];

        const isScrollable = computed(() => dataSource.value.length > 10);
        return {
            dataSource,
            columns,
            isScrollable,
        };
    },
};
</script>
  