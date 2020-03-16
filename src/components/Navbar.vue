<template>
    <nav>
        <v-app-bar flat light dense>
            <v-icon small class="pr-2" color="darkgrey">mdi-handshake</v-icon>
            <v-toolbar-title class="pr-3 darkgrey--text">
                <span class="font-weight-light">LS</span>
                <span class="font-weight-medium">DR</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text color="darkgrey" class="px-2">
                <v-icon small class="pr-2">mdi-home</v-icon>
                <span class="font-weight-light">Home</span>
            </v-btn>
            <v-btn text color="darkgrey" class="px-2">
                <v-icon small class="pr-2">mdi-view-dashboard</v-icon>
                <span class="font-weight-light">Dashboard</span>
            </v-btn>
            <v-btn text color="darkgrey" class="px-2">
                <v-icon small class="pr-2">mdi-school</v-icon>
                <span class="font-weight-light">Schools</span>
            </v-btn>
            <v-btn text color="darkgrey" class="px-2">
                <v-icon small class="pr-2">mdi-comment-question</v-icon>
                <span class="font-weight-light">About</span>
            </v-btn>

        </v-app-bar>
    </nav>
</template>

<script>
export default {
    data() {
    }
}
</script>