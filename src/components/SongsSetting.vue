<template>
    <div>
        <a-form>
            <a-form-item v-for="(setting, key) in setting" :key="key" :label="setting.label">
                <a-input :value="setting.val" @input="setting.val = $event.target.value" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" size="medium" @click="editSetting()">保存</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { Form, Input, Button, message } from 'ant-design-vue';

export default {
    components: {
        'a-form': Form,
        'a-form-item': Form.Item,
        'a-input': Input,
        'a-button': Button,
    },


    setup() {
        const setting = ref({});
        return {
            setting,
        };
    },

    methods: {
        syncSetting() {
            fetch('http://localhost:4220/songs/setting/sync')
                .then(response => response.json())
                .then(data => {
                    Object.keys(data).forEach(key => {
                        this.setting[key] = data[key];
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        editSetting() {
           message.loading('正在保存...');
            fetch('http://localhost:4220/songs/setting/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.setting),
            })
                .then((response) => response.json())
                .then((data) => {
                    message.destroy();
                    if (data.ok ===1) {
                        message.success(data.msg)
                    }
                    else{
                        message.error(data.msg)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },

    mounted() {
        this.syncSetting()
    },
};
</script>