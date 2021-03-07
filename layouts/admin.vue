<template>
    <div>
        <nav>
            <nuxt-link to="/"> Home </nuxt-link>
            <nuxt-link to="/profile"> Profile </nuxt-link>
            <nuxt-link to="/signup"> Signup </nuxt-link>
            <nuxt-link to="/admin"> Admin </nuxt-link>
        </nav>
        <nuxt /> <!-- router-view 대신에 쓰는 친구 -->
    </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>