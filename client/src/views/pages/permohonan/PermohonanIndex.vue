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
                <h2>Permohonan</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4" class="d-flex justify-end">
                <v-btn v-if="LoginedUser.role == 'Mahasiswa'" :to="{ name: 'CreatePermohonan' }" rounded="lg" color="primary" prepend-icon="mdi-note-plus-outline">
                    Tambah Permohonan
                </v-btn>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col sm="12" class="mx-auto">
                <v-card class="pa-5" elevation="4">
                    <v-table fixed-header height="400px">
                        <thead>
                            <tr>
                                <th class="text-left">NRP</th>
                                <th class="text-left">Nama</th>
                                <th class="text-left">Judul Keluhan</th>
                                <th class="text-left">Layanan</th>
                                <th class="text-left">Status</th>
                                <th class="text-left">Tanggal Pengajuan</th>
                                <th class="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="request in requests" :key="request._id">
                                <td>{{ request.mahasiswa.nrp }}</td>
                                <td>{{ request.mahasiswa.nama }}</td>
                                <td>{{ request.judul }}</td>
                                <td>{{ request.layanan }}</td>
                                <td>
                                    {{ request.status }}
                                </td>
                                <td>{{ request.created }}</td>
                                <td>
                                    <v-hover v-slot="{ isHovering, props }">
                                        <v-btn
                                            size="small"
                                            :variant="isHovering ? 'elevated' : 'outlined'"
                                            color="info"
                                            v-bind="props"
                                            :to="{ name: 'DetailPermohonan', params: { id: request._id } }"
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
import axios from 'axios'
export default {
    data() {
        return {
            requests: [],
            LoginedUser: JSON.parse(window.localStorage.getItem('user'))
        }
    },
    methods: {
        async fetchRequests(){
            await axios
                .get('/api/v1/requests/')
                .then( res => {
                    this.requests = res.data;
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
                    this.requests.forEach(request => {
                        request.created = new Date(request.created).toLocaleDateString("id", options);
                    });
                })
        }
    },
    async created(){
        this.fetchRequests();
    }
}
</script>