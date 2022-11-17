<template>
    <v-container>
        <v-row no-gutters justify="space-between">
            <v-col cols="4" class="pa-3 mr-5">
                <h2>Users</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4" class="d-flex justify-end">
                <v-btn :to="{ name: 'User' }" rounded="lg" color="info" variant="outlined" prepend-icon="mdi-keyboard-backspace">
                    Kembali
                </v-btn>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Edit Kemahasiswaan</v-card-title>
                    <v-divider></v-divider>
                    <from class="pa-5">
                        <v-text-field v-model="user.nama" label="Nama" variant="outlined" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                        <v-text-field v-model="user.kemahasiswaan.nip" label="NIP" variant="outlined" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
                        <v-text-field readonly v-model="user.email" label="Email" variant="outlined" prepend-icon="mdi-at" :rules="rules"></v-text-field>
                        <v-text-field v-model="user.newPassword" label="New Password" variant="outlined" prepend-icon="mdi-form-textbox-password" :rules="rules"></v-text-field>
                        <v-text-field v-model="user.kemahasiswaan.jabatan" label="Jabatan" variant="outlined" prepend-icon="mdi-face-agent" :rules="rules"></v-text-field>
                        <v-btn @click="submitForm" class="mt-3" color="success">Update Kemahasiswaan</v-btn>
                    </from>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            rules: [(value) => !!value || "This field is required"],
            user: {
                nama: "",
                email: "",
                newPassword: "",
                role: "Kemahasiswaan",
                kemahasiswaan: {
                    nip: '',
                    jabatan: '',
                },
            },
        };
    },
    methods: {
        async submitForm(){
            await axios
                .patch('/api/v1/users/' + this.$route.params.id, this.user)
                .then(res => {
                    const response = res.data;
                    console.log(response);
                    this.$router.push({name: "User", params: { message: response.message }})
                });
        },
        async getDetail(){
            await axios
                .get('/api/v1/users/' + this.$route.params.id)
                .then(res => {
                    this.user = res.data;
                });
        }
    },
    async created(){
        await this.getDetail();
    }
}
</script>