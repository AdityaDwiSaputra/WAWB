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
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>

            <v-text-field
                density="compact"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                v-model="login.email"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Password

                <!-- <a
                class="text-caption text-decoration-none text-blue"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
                >
                Forgot login password?</a> -->
            </div>

            <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
                v-model="login.password"
            ></v-text-field>

            <v-btn
                block
                class="mb-8"
                color="blue"
                size="large"
                variant="tonal"
                @click="submitForm"
            >
                Log In
            </v-btn>

            <v-card-text class="text-center">
                <v-btn :to="{ name: 'Register' }" variant="text" append-icon="mdi-chevron-right" class="text-blue">
                    Sign up now
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
            login: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        async submitForm(){
            await axios
                .post('/api/v1/login', this.login)
                .then(res => {
                    const response = res.data;
                    localStorage.setItem('user', JSON.stringify(response.data));
                    console.log(response)
                    this.$router.push({name: "Dashboard", params: { message: response.message }})
                });
        }
    }
}
</script>