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
            <v-col cols="8" class="pa-4 mx-auto">
                <v-card class="pa-1" elevation="4" v-if="user.role == 'Mahasiswa'">
                    <v-row align="center" no-gutters>
                        <v-col cols="8">
                            <v-list lines="one">
                                <v-list-item>
                                    <v-list-item-subtitle>Nama</v-list-item-subtitle>
                                    <v-list-item-title> {{ user.nama }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>NRP</v-list-item-subtitle>
                                    <v-list-item-title> {{ mahasiswa.nrp }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Email</v-list-item-subtitle>
                                    <v-list-item-title> {{ user.email }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Status</v-list-item-subtitle>
                                    <v-list-item-title> 
                                        <v-btn variant="text" color="success" v-if="mahasiswa.status == 'Active'">
                                            {{ mahasiswa.status }}
                                        </v-btn>
                                        <v-btn variant="text" color="error" v-if="mahasiswa.status == 'Inactive'">
                                            {{ mahasiswa.status }}
                                        </v-btn>
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Alamat</v-list-item-subtitle>
                                    <v-list-item-title> {{ mahasiswa.alamat }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Kelas</v-list-item-subtitle>
                                    <v-list-item-title> {{ mahasiswa.kelas }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Angkatan</v-list-item-subtitle>
                                    <v-list-item-title> {{ mahasiswa.angkatan }} </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="4">
                            <v-row>
                                <v-col>
                                    <v-hover v-slot="{ isHovering, props }">
                                        <v-btn
                                            size="small"
                                            :variant="isHovering ? 'elevated' : 'outlined'"
                                            color="warning"
                                            v-bind="props"
                                            :to="{ name: 'EditMahasiswa', params: { id: this.$route.params.id } }"
                                        >
                                            Edit
                                        </v-btn>
                                    </v-hover>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-hover v-slot="{ isHovering, props }">
                                        <v-btn
                                            size="small"
                                            :variant="isHovering ? 'elevated' : 'outlined'"
                                            color="error"
                                            v-bind="props"
                                            @click="deleteUser()"
                                        >
                                            Delete
                                        </v-btn>
                                    </v-hover>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
                <v-card class="pa-1" elevation="4" v-if="user.role == 'Kemahasiswaan'">
                    <v-row align="center" no-gutters class="mt-1 mx-1">
                        <v-col sm="6">
                            <v-list lines="one">
                                <v-list-item>
                                    <v-list-item-subtitle>Nama</v-list-item-subtitle>
                                    <v-list-item-title> {{ user.nama }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>NIP</v-list-item-subtitle>
                                    <v-list-item-title> {{ kemahasiswaan.nip }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Email</v-list-item-subtitle>
                                    <v-list-item-title> {{ user.email }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Jabatan</v-list-item-subtitle>
                                    <v-list-item-title> {{ kemahasiswaan.jabatan }} </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col sm="6" class="d-flex justify-center">
                            <v-hover v-slot="{ isHovering, props }">
                                <v-btn
                                    size="small"
                                    :variant="isHovering ? 'elevated' : 'outlined'"
                                    color="warning"
                                    v-bind="props"
                                    class="mr-2"
                                    :to="{ name: 'EditKemahasiswaan', params: { id: this.$route.params.id } }"
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
                                    @click="deleteUser()"
                                >
                                    Delete
                                </v-btn>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-card>
                <v-card class="pa-1" elevation="4" v-if="user.role == 'Unit_Kegiatan'">
                    <v-row align="center" no-gutters class="mt-1 mx-1">
                        <v-col sm="6">
                            <v-list lines="one">
                                <v-list-item>
                                    <v-list-item-subtitle>Nama</v-list-item-subtitle>
                                    <v-list-item-title> {{ user.nama }} </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-subtitle>Email</v-list-item-subtitle>
                                    <v-list-item-title> {{ user.email }} </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col sm="6" class="d-flex justify-center">
                            <v-hover v-slot="{ isHovering, props }">
                                <v-btn
                                    size="small"
                                    :variant="isHovering ? 'elevated' : 'outlined'"
                                    color="warning"
                                    v-bind="props"
                                    class="mr-2"
                                    :to="{ name: 'EditKegiatan', params: { id: this.$route.params.id } }"
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
                                    @click="deleteUser()"
                                >
                                    Delete
                                </v-btn>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-card>
                <v-card class="text-center pa-4" elevation="4" v-if="user.role == 'Tenaga_Kesehatan'">
                    <v-avatar :image="`/${user.kesehatan.foto}`" size="80"></v-avatar>
                    <v-card-title> {{ user.nama }} </v-card-title>
                    <v-card-subtitle> {{user.kesehatan.jabatan}} </v-card-subtitle>
                    <v-card-text> {{user.email}} </v-card-text>
                    <v-card-actions class="d-flex justify-center">
                        <v-hover v-slot="{ isHovering, props }">
                            <v-btn
                                size="small"
                                :variant="isHovering ? 'elevated' : 'outlined'"
                                color="warning"
                                v-bind="props"
                                :to="{ name: 'EditKesehatan', params: { id: this.$route.params.id } }"
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
                                @click="deleteUser()"
                            >
                                Delete
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
    name: 'DetailUser',
    data() {
        return{
            user: [],
            mahasiswa: [],
            kemahasiswaan: [],
            kesehatan: [],
        }
    },
    methods: {
        async getUserDetail() {
            await axios
                .get('/api/v1/users/' + this.$route.params.id)
                .then(res => {
                    this.user = res.data;
                    if(this.user.role == 'Mahasiswa'){
                        this.mahasiswa = this.user.mahasiswa;
                    }else if(this.user.role == 'Kemahasiswaan'){
                        this.kemahasiswaan = this.user.kemahasiswaan;
                    }else if(this.user.role == 'Tenaga_Kesehatan'){
                        this.kesehatan = this.user.kesehatan;
                    }
                })
        },
        async deleteUser() {
            await axios
                .delete('/api/v1/users/' + this.$route.params.id)
                .then(res => {
                    const response = res.data;
                    this.$router.push({name: "User", params: { message: response.message }})
                });
        }
    },
    async created(){
        this.getUserDetail();
    }
}
</script>