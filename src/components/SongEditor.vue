<template>
    <a-table :dataSource="dataSource" :columns="columns"  :locale="{ emptyText: '还没有人点歌哦' }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
                <a-button type="danger" size="medium" @click="deleteSong(record)">
                    删除</a-button>
            </template>
        </template>
    </a-table>
</template>
  
<script>
import { message } from 'ant-design-vue';
import { ref } from "vue";
export default {
    methods: {
        fetchSongData() {
            fetch("http://localhost:4220/songs")
                .then((response) => response.json())
                .then((data) => {
                    this.dataSource = data.data.map((item, index) => {
                        return {
                            ...item,
                            index: index + 1,
                        };
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteSong(record) {
            console.log(record.number);
            fetch('http://localhost:4220/songs/del', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ number: record.number }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.ok === 1) {
                        message.success('删除成功');
                        // 重新获取歌曲数据
                        this.fetchSongData();
                    } else {
                        message.error(data.msg);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    message.error('删除失败');
                });
        }
    },
    mounted() {
        this.fetchSongData(); // 初始化页面数据
        setInterval(() => {
            this.fetchSongData(); // 每隔1秒获取最新的歌曲数据
        }, 1000);
    },
    setup() {
        const dataSource = ref([]);
        const columns = [
            {
                title: "序号",
                key: "index",
                dataIndex: "index",
                width: "50px",
            },
            {
                title: "歌名",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "点歌人",
                dataIndex: "user",
                key: "user",
            }, {
                title: '操作',
                key: 'action',
            },

        ];
        return {
            dataSource,
            columns,
        };
    }
}
</script>
  
