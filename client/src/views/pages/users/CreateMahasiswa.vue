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
                    <v-card-title>Add New Mahasiswa</v-card-title>
                    <v-divider></v-divider>
                    <form class="pa-5">
                        <v-text-field v-model="user.nama" label="Nama" variant="outlined" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                        <v-text-field v-model="user.nrp" label="NRP" variant="outlined" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
                        <v-text-field v-model="user.email" label="Email" variant="outlined" prepend-icon="mdi-at" :rules="rules"></v-text-field>
                        <v-text-field v-model="user.password" label="Password" variant="outlined" prepend-icon="mdi-form-textbox-password" :rules="rules"></v-text-field>
                        <v-select
                            label="Status"
                            prepend-icon="mdi-list-status"
                            :items="['Active', 'Inactive']"
                            variant="outlined"
                            v-model="user.status"
                            :rules="rules"
                        ></v-select>
                        <v-textarea v-model="user.alamat" label="Alamat" variant="outlined" prepend-icon="mdi-map-marker" :rules="rules"></v-textarea>
                        <v-text-field v-model="user.kelas" label="Kelas" variant="outlined" prepend-icon="mdi-google-classroom" :rules="rules"></v-text-field>
                        <v-text-field v-model="user.angkatan" label="Angkatan" variant="outlined" prepend-icon="mdi-book-variant" :rules="rules"></v-text-field>
                        <v-btn @click="submitForm" class="mt-3" color="primary">Tambah Mahasiswa</v-btn>
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
                role: "Mahasiswa",
                nrp: '',
                status: 'Active',
                alamat: '',
                angkatan: '',
                kelas: '',
            },
        };
    },
    methods: {
        async submitForm(){
            await axios
                .post('/api/v1/users/', this.user)
                .then(res => {
                    const response = res.data;
                    console.log(response);
                    this.$router.push({name: "User", params: { message: response.message }})
                });
        }
    }
}
</script>