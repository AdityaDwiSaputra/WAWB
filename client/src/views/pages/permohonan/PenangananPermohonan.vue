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
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Penanganan Permohonan</v-card-title>
                    <v-divider></v-divider>
                    <form class="pa-5">
                        <v-select
                            label="Jenis Pelayanan"
                            prepend-icon="mdi-face-agent"
                            :items="['Kesehatan', 'Konseling']"
                            variant="outlined"
                            v-model="request.layanan"
                            readonly
                            :rules="rules"
                        ></v-select>
                        <v-select
                            label="Jenis Penanganan"
                            prepend-icon="mdi-hand-heart-outline"
                            :items="['Online', 'Offline']"
                            variant="outlined"
                            v-model="request.penanganan"
                            readonly
                            :rules="rules"
                        ></v-select>
                        <v-text-field readonly v-model="request.judul" label="Judul Keluhan" variant="outlined" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                        <v-textarea readonly v-model="request.deskripsi" label="Deskripsi Keluhan" variant="outlined" prepend-icon="mdi-note-plus" :rules="rules"></v-textarea>
                        <v-textarea v-model="request.feedback" label="Feedback" variant="outlined" prepend-icon="mdi-message-alert-outline" :rules="rules"></v-textarea>
                        <v-btn @click="submitForm" class="mt-3" color="success">Berikan Feedback</v-btn>
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
            request: {
                judul: "",
                deskripsi: "",
                layanan: "",
                penanganan: "",
                status: "",
                feedback: ""
            },
        };
    },
    methods: {
        async submitForm(){
            await axios
                .patch('/api/v1/requests/' + this.$route.params.id, this.request)
                .then(res => {
                    const response = res.data;
                    console.log(this.request);
                    this.$router.push({name: "Permohonan", params: { message: response.message }})
                });
        },
        async getPermohonanDetail(){
            await axios
                .get('/api/v1/requests/' + this.$route.params.id)
                .then(res => {
                    this.request = res.data
                    this.request.status = "Done"
                });
        }
    },
    async created(){
        await this.getPermohonanDetail();
    }
}
</script>