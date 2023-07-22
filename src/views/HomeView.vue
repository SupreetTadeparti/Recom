<script setup>
import { getDoc, doc, updateDoc } from "firebase/firestore";
import Button from "../components/Button.vue"
import Nav from "../components/Nav.vue";
import { db, getCommunity, getCommunityRef, getPhoto } from "../firebase";
import { onMounted, ref } from "vue"

const community = ref({})

const headRoles = [
  "President", "Vice President", "Treasurer",
  "Secretary", "Event Coordinator", "Grievance Officer"
]

const heads = ref(Array(6).fill(null))
const headPhotos = ref(Array(6).fill(null))

const calcHeads = async () => {
  const prevTimestamp = community.value.headsUpdateTime;
  const prevDate = new Date(prevTimestamp.seconds * 1_000)
  const currDate = new Date();
  const timeElapsed = currDate - prevDate;
  const timeElapsedHours = timeElapsed / (3_600_000);

  if (timeElapsedHours > 24) {
    const headVotes = Array(6).fill(0);
    const headIds = Array(6).fill("");

    const userIds = community.value.members;

    for (const userId of userIds) {
      const userDoc = await getDoc(doc(db, "users", userId.trim()));
      const user = userDoc.data();

      for (const role of headRoles) {
        const roleIdx = headRoles.indexOf(role)
        const userVotes = user.votes[roleIdx]
        if (user.candidate === role && userVotes > headVotes[roleIdx]) {
          headIds[roleIdx] = userDoc.id
          headVotes[roleIdx] = userVotes;
        }
      }
    }

    const communityDoc = await getCommunityRef()

    await updateDoc(communityDoc, {
      heads: headIds
    })

    community.value = await getCommunity()
  }

  const headsTemp = []
  const headPhotosTemp = []

  for (const headId of community.value.heads) {
    let head = null;
    if (headId) {
      const headDoc = await getDoc(doc(db, "users", headId));
      head = headDoc.data()
    }
    headsTemp.push(head)
    headPhotosTemp.push(await getPhoto(head))
  }

  heads.value = headsTemp
  headPhotos.value = headPhotosTemp
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
        <img :src="headPhotos[idx]" alt="">
        <div class="details">
          <div class="name">{{ heads[idx] ? heads[idx].fullname ?? "Not Elected" : "Not Elected" }}</div>
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
  align-items: center;
  width: 75%;
}

.member {
  min-width: 15em;
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
  border-radius: 50%;
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