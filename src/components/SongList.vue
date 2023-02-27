<template>
    <div class="table-container" :class="{ 'scrollable': isScrollable }">
        <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :locale="{ emptyText: '还没有人点歌哦~' }"
            :showHeader="false" />
    </div>
</template>

<style>
.table-container .ant-table-wrapper .ant-table {
    background-color: transparent;
}

.table-container .ant-table-cell {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    font-family: "文道芋圆丸子体";
}
</style>
  
<script>
import { ref, computed } from 'vue';
import { Table ,message} from 'ant-design-vue';
export default {
    components: {
        'a-table': Table,
    },

    mounted() {
        this.ws = new WebSocket('ws://localhost:4220/songs/ws');
        this.ws.addEventListener('open', event => {
            console.log('WebSocket connected', event);
            this.ws.send("sync_songs")
        });
        this.ws.onmessage  = event => {
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
            }else if (opcode == "send_msg") {
                if (payload.ok == 1) {
                    message.success(payload.msg)
                }else{
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
    methods: {
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
  