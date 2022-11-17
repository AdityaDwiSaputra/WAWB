<template>
    <v-container>
        <v-row no-gutters>
            <v-alert class="my-4"
            border="start"
            closable
            close-label="Close Alert"
            theme="dark"
            type="success"
            v-if="this.$route.params.message"
            >
                {{ this.$route.params.message }}
            </v-alert>
        </v-row>
        <v-row no-gutters justify="space-between">
            <v-col cols="4" class="pa-3 mr-5">
                <h2>Users</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4" class="d-flex justify-end">
                <v-menu
                    transition="slide-y-transition"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn
                        color="primary"
                        v-bind="props"
                        prepend-icon="mdi-account-plus-outline"
                        >
                        Tambah User
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item :to="{ name: 'CreateMahasiswa' }">
                            <v-list-item-title>Mahasiswa</v-list-item-title>
                        </v-list-item>
                        <v-list-item :to="{ name: 'CreateKemahasiswaan' }">
                            <v-list-item-title>Kemahasiswaan</v-list-item-title>
                        </v-list-item>
                        <v-list-item :to="{ name: 'CreateKesehatan' }">
                            <v-list-item-title>Tenaga Kesehatan</v-list-item-title>
                        </v-list-item>
                        <v-list-item :to="{ name: 'CreateKegiatan' }">
                            <v-list-item-title>Unit Kegiatan</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col sm="12" class="mx-auto">
                <v-card class="pa-5" elevation="4">
                    <v-table fixed-header height="400px">
                        <thead>
                            <tr>
                                <th class="text-left">Nama</th>
                                <th class="text-left">Email</th>
                                <th class="text-left">Roles</th>
                                <th class="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user._id">
                                <td>{{ user.nama }}</td>
                                <td>{{ user.email }}</td>
                                <td>
                                    <v-btn size="small" rounded="pill" color="primary" v-if="user.role=='Kemahasiswaan'" >{{ user.role }}</v-btn>
                                    <v-btn size="small" rounded="pill" color="secondary" v-if="user.role=='Tenaga_Kesehatan'" >Tenaga Kesehatan</v-btn>
                                    <v-btn size="small" rounded="pill" color="success" v-if="user.role=='Mahasiswa'" >{{ user.role }}</v-btn>
                                    <v-btn size="small" rounded="pill" color="warning" v-if="user.role=='Unit_Kegiatan'" >Unit Kegiatan</v-btn>
                                </td>
                                <td>
                                    <v-hover v-slot="{ isHovering, props }">
                                        <v-btn
                                            size="small"
                                            :variant="isHovering ? 'elevated' : 'outlined'"
                                            color="info"
                                            v-bind="props"
                                            :to="{ name: 'UserDetail', params: { id: user._id } }"
                                        >
                                            Detail
                                        </v-btn>
                                    </v-hover>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: "UserIndex",
    data () {
      return {
        users: [],
      }
    },
    methods: {
        async fetchUser(){
            await axios
                .get('/api/v1/users/')
                .then(res => {
                    this.users = res.data;
                    console.log(this.users);
                });
        },
    },    
    async created(){
        this.fetchUser();
    },
}
</script>