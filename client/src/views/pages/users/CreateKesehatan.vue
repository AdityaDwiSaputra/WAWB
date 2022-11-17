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
                    <v-card-title>Add New Tenaga Kesehatan</v-card-title>
                    <v-divider></v-divider>
                    <form class="pa-5"  enctype="multipart/form-data">
                        <v-text-field v-model="user.nama" label="Nama" variant="outlined" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                        <v-text-field v-model="user.email" label="Email" variant="outlined" prepend-icon="mdi-at" :rules="rules"></v-text-field>
                        <v-text-field v-model="user.password" label="Password" variant="outlined" prepend-icon="mdi-form-textbox-password" :rules="rules"></v-text-field>
                        <v-text-field v-model="user.jabatan" label="Jabatan" variant="outlined" prepend-icon="mdi-face-agent" :rules="rules"></v-text-field>
                        <v-file-input @change="selectedFile" variant="outlined" :rules="rules" show-size counter multiple label="Select Foto"></v-file-input>
                        <v-btn @click="submitForm" class="mt-3" color="primary">Tambah Tenaga Kesehatan</v-btn>
                    </form>
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
                password: "",
                role: "Tenaga_Kesehatan",
                jabatan: "",
                foto: "",
            },
            image: "",
        };
    },
    methods: {
        selectedFile(file){
            this.image = file.target.files[0];
        },
        async submitForm(){
            const formData = new FormData();
            formData.append('image', this.image);
            formData.append('nama', this.user.nama);
            formData.append('email', this.user.email);
            formData.append('password', this.user.password);
            formData.append('role', this.user.role);
            formData.append('jabatan', this.user.jabatan);
            await axios
                .post('/api/v1/users/', formData)
                .then(res => {
                    const response = res.data;
                    console.log(response);
                    this.$router.push({name: "User", params: { message: response.message }})
                });
        }
    }
}
</script>