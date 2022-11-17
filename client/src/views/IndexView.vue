<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >

      <v-img :src="require('../assets/Asset.jpg')">
        <div class="text-center">
          <v-avatar
            class="my-4"
            color="grey darken-1"
            size="64"
          >
            <v-img :aspect-ratio="30" src="http://api.randomuser.me/portraits/lego/0.jpg"></v-img>
          </v-avatar>

          <h4 class="text-white pa-4">Admin Dashboard</h4>
        </div>
      </v-img>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          active-color="primary"
          rounded="shaped"
          :to="{ name: 'Dashboard' }"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-home-analytics"></v-icon>
          </template>

          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item
          active-color="primary"
          rounded="shaped"
          :to="{ name: 'User' }"
          v-if="LoginedUser.role == 'Kemahasiswaan'"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-account-box"></v-icon>
          </template>

          <v-list-item-title>Users</v-list-item-title>
        </v-list-item>
        <v-list-item
          active-color="primary"
          rounded="shaped"
          v-if="LoginedUser.role != 'Unit_Kegiatan'"
          :to="{ name: 'Permohonan' }"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-file-chart-outline"></v-icon>
          </template>

          <v-list-item-title>Permohonan</v-list-item-title>
        </v-list-item>
        <v-list-item
          active-color="primary"
          rounded="shaped"
          :to="{ name: 'Post' }"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-note-search-outline"></v-icon>
          </template>

          <v-list-item-title>Info Kesehatan</v-list-item-title>
        </v-list-item>
        <v-list-item
          active-color="primary"
          rounded="shaped"
          class="logout_cursor"
          @click="logout()"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-exit-to-app"></v-icon>
          </template>

          <v-list-item-title>Keluar</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({ 
      drawer: null,
      selectedItem: 1,
      items: [
        { text: 'Dashboard', icon: 'mdi-home-analytics' },
        { text: 'User', icon: 'mdi-account-box' },
        { text: 'Permohonan', icon: 'mdi-file-chart-outline' },
        { text: 'Info Kesehatan', icon: 'mdi-note-search-outline' },
        { text: 'Keluar', icon: 'mdi-exit-to-app' },
      ],
      LoginedUser: JSON.parse(window.localStorage.getItem('user'))
    }),
    methods: {
      async logout(){
        await axios
                .get('/api/v1/logout')
                .then(res => {
                  const response = res.data;
                  localStorage.clear();
                  this.$router.push({name: "Home"})
                  console.log(response);
                })
      }      
    }
  }
</script>

<style scoped>
.logout_cursor{
  cursor: pointer;
}
</style>