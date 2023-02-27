<template>
    <a-table :dataSource="dataSource" :columns="columns" :locale="{ emptyText: '还没有人点歌哦' }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
                <a-button type="danger" size="medium" @click="deleteSong(record)">
                    删除</a-button>
            </template>
        </template>
    </a-table>
    <a-button type="primary" size="medium" @click="switchStatus">{{ status === 1 ? '关闭点歌' : '开启点歌' }}</a-button>
</template>
  
<script>
import { message } from 'ant-design-vue';
import { ref } from "vue";
export default {
    methods: {
        deleteSong(record) {
            fetch('http://localhost:4220/songs/del', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ number: record.number }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.ok === 1) {
                        message.success('删除成功');

                    } else {
                        message.error(data.msg);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    message.error('删除失败');
                });

        },
        switchStatus() {
            fetch('http://localhost:4220/songs/switch')
                .then((response) => response.json())
                .then((data) => {
                    this.status = data.status
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.ws = new WebSocket('ws://localhost:4220/songs/ws');
        this.ws.addEventListener('open', event => {
            console.log('WebSocket connected', event);
            this.ws.send("sync_songs")
        });
        this.ws.onmessage = event => {
            const regex = /^(\w+)\s+({.*})$/;
            const match = event.data.match(regex);
            if (!match) {
                return
            }
            const opcode = match[1];
            const payload = JSON.parse(match[2]);
            console.log(`Received ${opcode}:`, payload);
            if (opcode == "sync_songs") {
                this.dataSource = payload.data.map((item, index) => {
                    return {
                        ...item,
                        index: index + 1,
                    };
                });
                this.status = payload.status
            } else if (opcode == "send_msg") {
                if (payload.ok == 1) {
                    message.success(payload.msg)
                } else {
                    message.error(payload.msg)
                }
            }
        }
    },
    beforeUnmount() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    },
    setup() {
        const dataSource = ref([]);
        const status = ref(1)
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
            status
        };
    }
}
</script>
  
