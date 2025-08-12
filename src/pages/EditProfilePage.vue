<template>
  <div class="edit-profile">
    <!-- Header -->
    <header class="header">
      <button class="back-btn" @click="$router.back()"><img src="/src/assets/leftarrow.svg" alt="Back"  /></button>
      <h1>Edit Profile</h1>
    </header>

    <!-- Avatar Section -->
    <div class="avatar-section">
      <div class="avatar-wrapper">
        <img class="avatar" src="/src/assets/userprofile.svg" alt="User Avatar" />
        <button v-if="!isEditing" class="edit-icon" @click="toggleEdit">
          <img src="/src/assets/edit-line.svg" class="edit-icon-image" alt="User Avatar"/>
        </button>
      </div>
      <h2 class="name">{{ name }}</h2>
      <p class="info">{{ email }} | +{{ phone }}</p>
    </div>

    <!-- Form -->
    <form class="form" @submit.prevent="submit">
      <div class="form-group">
        <label>Full name</label>
        <input type="text" v-model="name" :readonly="!isEditing" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" :readonly="!isEditing" />
      </div>

      <div class="form-group phone-group">
        <label>Phone Number</label>
        <div class="phone-input">
          <img src="https://flagcdn.com/w20/us.png" alt="flag" />
          <input style="padding: 0.4rem; background: transparent;" type="tel" v-model="phone" :readonly="!isEditing" />
        </div>
      </div>

      <button v-if="isEditing" type="submit" class="submit-btn">SUBMIT</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isEditing = ref(false);

const name = ref('Jane Doe');
const email = ref('jane@gmail.com');
const phone = ref('01 234 567 89');

function toggleEdit() {
  isEditing.value = true;
}

function submit() {
  isEditing.value = false;
}
</script>

<style scoped>
.edit-profile {
  padding: 22px;
  background-image: url(/src/assets/Rectangle.svg);
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100% auto; /* Stretch full width */
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
}

.header h1 {
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.back-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.avatar-section {
  text-align: center;
  margin-bottom: 24px;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.edit-icon {
  position: absolute;
  bottom: 5px;
  right: 5px;
  transform: translate(25%, 25%);
  background: #f5f5f5;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  border: 3px solid white;
  
}

.edit-icon-image{
  position: relative;
  bottom : -2px
}

.name {
  margin-top: 12px;
  font-size: 16px;
  font-weight: 500;
}

.info {
  font-size: 16px;
}
label {
  opacity: 0.8;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  display: block;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #f3f3f3;
  font-size: 14px;
}

.form-group input[readonly] {
  background: #f9f9f9;
  color: #333;
}

.phone-input {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f3f3f3;
  padding: 12px;
  border-radius: 8px;
}

.phone-input img {
  width: 20px;
  height: 14px;
}

.phone-input input {
  border: none;
  background: transparent;
  font-size: 14px;
  flex: 1;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #283352;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
}
</style>
