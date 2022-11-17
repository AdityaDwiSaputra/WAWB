<template>
  <div class="py-4">
    <v-img
      class="mx-auto mb-10"
      max-width="228"
      :src="require('../../../assets/PENS.png')"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
    
        <form>
            <div class="text-subtitle-1 text-medium-emphasis">Nama</div>

            <v-text-field
                density="compact"
                placeholder="Nama"
                prepend-inner-icon="mdi-account-circle-outline"
                variant="outlined"
                v-model="register.nama"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">NRP</div>

            <v-text-field
                density="compact"
                placeholder="NRP"
                prepend-inner-icon="mdi-format-list-numbered"
                variant="outlined"
                v-model="register.nrp"
            ></v-text-field>
            
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>

            <v-text-field
                density="compact"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                v-model="register.email"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Password
            </div>

            <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
                v-model="register.password"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Address</div>

            <v-textarea
                rows="3"
                density="compact"
                placeholder="Address"
                prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined"
                v-model="register.alamat"
            ></v-textarea>

            <div class="text-subtitle-1 text-medium-emphasis">Kelas</div>

            <v-text-field
                density="compact"
                placeholder="Kelas"
                prepend-inner-icon="mdi-google-classroom"
                variant="outlined"
                v-model="register.kelas"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Angkatan</div>

            <v-text-field
                density="compact"
                placeholder="Angkatan"
                prepend-inner-icon="mdi-newspaper-variant-outline"
                variant="outlined"
                v-model="register.angkatan"
            ></v-text-field>

            <v-btn
                block
                class="mb-8"
                color="blue"
                size="large"
                variant="tonal"
                type="submit"
                @click="submitForm"
            >
                Register
            </v-btn>

            <v-card-text class="text-center">
                <v-btn :to="{ name: 'Login' }" variant="text" prepend-icon="mdi-chevron-left" class="text-blue">
                    Sign in
                </v-btn>
            </v-card-text>
        </form>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return{
            visible: false,
            register: {
                nama: '',
                email: '',
                password: '',
                role: 'Mahasiswa',
                nrp: '',
                status: 'Active',
                alamat: '',
                kelas: '',
                angkatan: '',
            }
        }
    },
    methods: {
        async submitForm(){
            await axios
                .post('/api/v1/register', this.register)
                .then(res => {
                    const response = res.data;
                    localStorage.setItem('user', JSON.stringify(response.data));
                    console.log(response);
                    this.$router.push({name: "Dashboard", params: { message: response.message }})
                });
        }
    }
}
</script>