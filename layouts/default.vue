<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>My Admin</h2>
      <nav>
        <NuxtLink to="/products">Products</NuxtLink>
        <NuxtLink to="/users">Users</NuxtLink>
      </nav>
    </aside>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 220px;
  background: #1e293b;
  color: white;
  padding: 20px;
}

.sidebar a {
  display: block;
  padding: 10px 0;
  color: white;
  text-decoration: none;
}

.sidebar a.router-link-active {
  font-weight: bold;
}

.content {
  flex: 1;
  padding: 24px;
  background: #f8fafc;
  overflow-y: auto;
}
</style>
