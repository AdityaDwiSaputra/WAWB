<template>
    <v-container>
        <v-row no-gutters justify="space-between">
            <v-col cols="4" class="pa-3 mr-5">
                <h2>Permohonan</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4" class="d-flex justify-end">
                <v-btn :to="{ name: 'Permohonan' }" rounded="lg" color="info" variant="outlined" prepend-icon="mdi-keyboard-backspace">
                    Kembali
                </v-btn>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col class="pa-4 mx-auto">
                <v-card class="pa-1" elevation="4">
                    <v-row no-gutters>
                        <v-col sm="6">
                            <v-list lines="one">
                                <v-list-item>
                                    <v-list-item-subtitle>Nama</v-list-item-subtitle>
                                    <v-list-item-title> {{ mahasiswa.nama }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>NRP</v-list-item-subtitle>
                                    <v-list-item-title> {{ mahasiswa.nrp }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Kelas</v-list-item-subtitle>
                                    <v-list-item-title> {{ mahasiswa.kelas }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Angkatan</v-list-item-subtitle>
                                    <v-list-item-title> {{ mahasiswa.angkatan }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Judul Keluhan</v-list-item-subtitle>
                                    <v-list-item-title> {{ permohonan.judul }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Jenis Pelayanan</v-list-item-subtitle>
                                    <v-list-item-title> {{ permohonan.layanan }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Jenis Penanganan</v-list-item-subtitle>
                                    <v-list-item-title> {{ permohonan.penanganan }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Status Permohonan</v-list-item-subtitle>
                                    <v-list-item-title> {{ permohonan.status }} </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col sm="6" class="mt-4">
                            <v-textarea label="Deskripsi Keluhan" variant="underlined" readonly v-model="permohonan.deskripsi"></v-textarea>
                            <v-spacer></v-spacer>
                            <v-textarea label="Feedback Keluhan" variant="underlined" readonly v-model="permohonan.feedback" v-if="permohonan.status == 'Done'"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-btn
                                size="small"
                                :variant="isHovering ? 'elevated' : 'outlined'"
                                color="warning"
                                v-bind="props"
                                v-if="permohonan.status == 'Draft' && LoginedUser.role == 'Mahasiswa'"
                                :to="{ name: 'EditPermohonan', params: { id: this.$route.params.id } }"
                            >
                                Edit
                            </v-btn>
                        </v-hover>            
                        <v-hover v-slot="{ isHovering, props }">
                            <v-btn
                                size="small"
                                :variant="isHovering ? 'elevated' : 'outlined'"
                                color="error"
                                v-bind="props"
                                v-if="permohonan.status == 'Draft' || permohonan.status == 'Ditolak' && LoginedUser.role == 'Mahasiswa'"
                                @click="deletePermohonan()"
                            >
                                Delete
                            </v-btn>
                        </v-hover>            
                        <v-hover v-slot="{ isHovering, props }">
                            <v-btn
                                size="small"
                                :variant="isHovering ? 'elevated' : 'outlined'"
                                color="primary"
                                v-bind="props"
                                v-if="permohonan.status == 'Draft' && LoginedUser.role == 'Mahasiswa'"
                                @click="statusPermohonan('Diajukan')"
                            >
                                Ajukan Permohonan
                            </v-btn>
                        </v-hover>            
                        <v-hover v-slot="{ isHovering, props }">
                            <v-btn
                                size="small"
                                :variant="isHovering ? 'elevated' : 'outlined'"
                                color="error"
                                v-bind="props"
                                v-if="permohonan.status == 'Diajukan' && LoginedUser.role == 'Kemahasiswaan'"
                                @click="statusPermohonan('Ditolak')"
                            >
                                Tolak Permohonan
                            </v-btn>
                        </v-hover>            
                        <v-hover v-slot="{ isHovering, props }">
                            <v-btn
                                size="small"
                                :variant="isHovering ? 'elevated' : 'outlined'"
                                color="success"
                                v-bind="props"
                                v-if="permohonan.status == 'Diajukan' && LoginedUser.role == 'Kemahasiswaan'"
                                @click="statusPermohonan('Disetujui')"
                            >
                                Setujui Permohonan
                            </v-btn>
                        </v-hover>            
                        <v-hover v-slot="{ isHovering, props }">
                            <v-btn
                                size="small"
                                :variant="isHovering ? 'elevated' : 'outlined'"
                                color="primary"
                                v-bind="props"
                                v-if="permohonan.status == 'Disetujui' && LoginedUser.role == 'Tenaga_Kesehatan'"
                                :to="{ name: 'PenangananPermohonan', params: { id: this.$route.params.id } }"
                            >
                                Tangani Permohonan
                            </v-btn>
                        </v-hover>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            permohonan: [],
            mahasiswa: [],
            message: '',
            LoginedUser: JSON.parse(window.localStorage.getItem('user'))
        };
    },
    methods: {
        async getDetail(){
            await axios
                .get('/api/v1/requests/' + this.$route.params.id)
                .then(res => {
                    this.permohonan = res.data;
                    this.mahasiswa = res.data.mahasiswa;
                    console.log(this.permohonan.mahasiswa.nama);
                })
        },
        async statusPermohonan(status){
            await axios
                .patch('/api/v1/requests/' + this.$route.params.id, {
                    "status": status
                })
                .then(res => {
                    const response = res.data;
                    if(status == "Diajukan"){
                        this.message = "Berhasil Mengajukan Permohonan...";
                    }else if(status == "Ditolak"){
                        this.message = "Permohonan Berhasil Ditolak...";
                    }else if(status == "Disetujui"){
                        this.message = "Permohonan Disetujui";
                    }
                    console.log(response);
                    this.$router.push({name: "Permohonan", params: { message: this.message }})
                });
        },
        async deletePermohonan(){
            await axios
                .delete('/api/v1/requests/' + this.$route.params.id)
                .then(res => {
                    const response = res.data;
                    this.$router.push({name: "Post", params: { message: response.message }})
                });
        }
    },
    async created(){
        await this.getDetail();
    }
}
</script>
