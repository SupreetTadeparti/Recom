<script setup>
import Button from "../components/Button.vue"
import Nav from "../components/Nav.vue";
import { getCommunity } from "../firebase";
import { onMounted, ref } from "vue"

const community = ref({})

const headRoles = [
  "President", "Vice President", "Treasurer",
  "Secretary", "Event Coordinator", "Grievance Officer"
]

const calcHeads = () => {
  // if (community.value.headUpdateTime === )
}

onMounted(async () => {
  community.value = await getCommunity();
  calcHeads()
});

</script>

<template>
  <Nav />
  <main>
    <span class="page-name">Home</span>
    <div class="heading">{{ community.name ?? "Loading..." }}</div>
    <div class="address">{{ community.location ?? "Loading..." }}</div>
    <div class="heading">Members</div>
    <div class="members">
      <div class="member" v-for="(role, idx) in headRoles">
        <img src="@/assets/img/default.png" alt="">
        <div class="details">
          <div class="name">{{ community.heads ? community.heads[idx] ?? "Not Elected" : "Not Elected" }}</div>
          <div class="role">{{ role }}</div>
        </div>
      </div>
      <Button text="All Members" />
    </div>
  </main>
</template>

<style scoped>
main {
  gap: 1.25em;
}

.address {
  color: #555;
}

.members {
  display: grid;
  row-gap: 1em;
  column-gap: 3em;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
}

.member {
  width: 15em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  border-radius: .25em;
  box-shadow: 0 0 5px 0 rgba(0 0 0 / .25);
  padding: .5em 1.25em;
}

.member>.details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.member>.details>.name {
  font-size: 1.2em;
}

.member>.details>.role {
  color: var(--accent);
  font-size: 0.9em;
}

.member>img {
  width: 2.5em;
  aspect-ratio: 1;
}

@media (max-width: 80em) {
  .members {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 55em) {
  .members {
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>