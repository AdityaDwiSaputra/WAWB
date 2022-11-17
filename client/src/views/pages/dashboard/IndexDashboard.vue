<template>
    <v-container>
        <v-row no-gutters justify="space-between">
            <v-col cols="4" class="pa-3 mr-5">
                <h2>Dashboard</h2>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row no-gutters class="mb-4">
            <v-col>
                <v-card elevation="4">
                    <v-card-title>
                        Selamat Datang {{LoginedUser.nama}} ...
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row no-gutters v-if="LoginedUser.role == 'Kemahasiswaan'" class="my-4">
            <v-col>
                <v-card class="mx-2" elevation="4">
                    <v-card-text>
                        Jumlah User
                    </v-card-text>
                    <v-card-title>
                        {{dashboard.jumlahUser}}
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-2" elevation="4">
                    <v-card-text>
                        Jumlah Mahasiswa
                    </v-card-text>
                    <v-card-title>
                        {{dashboard.jumlahMahasiswa}}
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-2" elevation="4">
                    <v-card-text>
                        Jumlah Tenaga Kesehatan
                    </v-card-text>
                    <v-card-title>
                        {{dashboard.jumlahNakes}}
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-2" elevation="4">
                    <v-card-text>
                        Jumlah Unit Kegiatan
                    </v-card-text>
                    <v-card-title>
                        {{dashboard.jumlahKegiatan}}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row no-gutters v-if="LoginedUser.role == 'Kemahasiswaan'" class="my-4">
            <v-col>
                <v-card class="mx-2" elevation="4">
                    <v-card-text>
                        Jumlah Permohonan
                    </v-card-text>
                    <v-card-title>
                        {{dashboard.jumlahPermohonan}}
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-2" elevation="4">
                    <v-card-text>
                        Jumlah Permohonan Disetujui
                    </v-card-text>
                    <v-card-title>
                        {{dashboard.jumlahPermohonanDisetujui}}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row no-gutters v-if="LoginedUser.role == 'Mahasiswa'" class="my-4">
            <v-col>
                <v-card class="mx-2" elevation="4">
                    <v-card-text>
                        Jumlah Permohonan
                    </v-card-text>
                    <v-card-title>
                        {{dashboard.jumlahPermohonan}}
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-2" elevation="4">
                    <v-card-text>
                        Jumlah Permohonan Disetujui
                    </v-card-text>
                    <v-card-title>
                        {{dashboard.jumlahPermohonanDisetujui}}
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-2" elevation="4">
                    <v-card-text>
                        Jumlah Permohonan Selesai
                    </v-card-text>
                    <v-card-title>
                        {{dashboard.jumlahPermohonanSelesai}}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row no-gutters v-if="LoginedUser.role == 'Tenaga_Kesehatan'" class="my-4">
            <v-col>
                <v-card class="mx-2" elevation="4">
                    <v-card-text>
                        Jumlah Permohonan
                    </v-card-text>
                    <v-card-title>
                        {{dashboard.jumlahPermohonan}}
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-2" elevation="4">
                    <v-card-text>
                        Jumlah Permohonan Ditangani
                    </v-card-text>
                    <v-card-title>
                        {{dashboard.jumlahPermohonanSelesai}}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row no-gutters v-if="LoginedUser.role == 'Unit_Kegiatan'" class="my-4">
            <v-col>
                <v-card class="mx-2" elevation="4">
                    <v-card-text>
                        Jumlah Info Kesehatan
                    </v-card-text>
                    <v-card-title>
                        {{dashboard.jumlahPost}}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';

export default {
    name: "DashboardIndex",
    data () {
      return {
        dashboard: [],
        LoginedUser: JSON.parse(window.localStorage.getItem('user'))
      }
    },
    methods: {
        async fetchDashboard(){
            await axios
                .get('/api/v1/dashboard/')
                .then(res => {
                    this.dashboard = res.data.data;
                    console.log(this.dashboard);
                });
        },
    },    
    async created(){
        this.fetchDashboard();
    },
}
</script>