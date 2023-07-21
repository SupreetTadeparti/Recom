<script setup>
import Nav from "../components/Nav.vue";
import Button from "../components/Button.vue";
import { onMounted, ref } from "vue";
import { db, getCommunity, getUser, getUserRef } from "../firebase";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";

const props = defineProps([])
const user = ref({})
const contestants = ref([])
const roles = ["President", "Vice President", "Treasurer", "Secretary", "Event Coordinator", "Grievance Officer"]

const updateUser = async () => {
    user.value = await getUser();
}

const updateCandidates = async () => {
    const community = await getCommunity()
    const candidates = await Promise.all(
        community.members.map(async member =>
            (await getDoc(
                doc(db, "users", member.trim())
            )).data()
        )
    )
    contestants.value = candidates.sort((a, b) => b.votes - a.votes)
}

onMounted(async () => {
    await updateUser()
    await updateCandidates();
})

const photo = (candidate) => {
    return new URL(
        `../assets/img/${candidate.photo ? candidate.name.toLowerCase().replace(" ", "_") : "default"
        }.png`,
        import.meta.url,
    ).href
}

const role = ref("President")

const roleClick = (e) => {
    role.value = e.target.textContent.trim();
}

const voted = id => user.value.voted[roles.indexOf(role.value)] === id

const vote = async id => {
    const idx = roles.indexOf(role.value)

    const userVoted = user.value.voted;

    const prevId = userVoted[idx];

    userVoted[idx] = id === prevId ? "" : id

    const userRef = getUserRef();

    await updateDoc(userRef, {
        voted: userVoted
    })

    // Unvote to previous candidate
    if (prevId) {
        const candidateDoc = doc(db, "users", prevId);

        const candidate = await getDoc(candidateDoc);

        const votes = candidate.data().votes;

        votes[roles.indexOf(role.value)]--;


        await updateDoc(candidateDoc, {
            votes: votes
        });
    }

    if (prevId !== id) {
        // Vote for current candidate (if a different candidate)
        const candidateDoc = doc(db, "users", id);

        const candidate = await getDoc(candidateDoc);

        const votes = candidate.data().votes;

        votes[roles.indexOf(role.value)]++;

        await updateDoc(candidateDoc, {
            votes: votes
        });
    }

    updateUser();
    updateCandidates();
}

const running = () => user.value.candidate === role.value

const candidacy = async () => {
    const userRef = getUserRef();
    const candidateVal = running() ? "NA" : role.value;
    await updateDoc(userRef, {
        candidate: candidateVal
    })
    user.value.candidate = candidateVal;
    updateCandidates()
}

const modalText = ref();
const showModal = ref(false);

const displayModal = () => {
    modalText.value = running() ?
        `Are you sure you want to withdraw from the election for ${role.value}?` :
        `Are you sure you want to run for ${role.value} in the election? 
            This will withdraw you from elections of all other roles.`;

    showModal.value = true;
}

const confirmModal = () => {
    candidacy()
    showModal.value = false;
}
</script>

<template>
    <Nav />
    <main>
        <div class="page-name">Elections</div>
        <div class="voting-container">
            <div class="contestants-container">
                <div class="contestants-heading">Candidates</div>
                <div class="contestants">
                    <div class="contestant"
                        v-for="contestant in contestants.filter(contestant => contestant.candidate === role)">
                        <div class="contestant__left">
                            <img :src="photo(contestant)" alt="photo" class="contestant__photo" width="50">
                            <div class="contestant__votes">{{ contestant.votes[roles.indexOf(role)] }}</div>
                        </div>
                        <div class="contestant__right">
                            <div class="contestant__name">{{ contestant.fullname }}</div>
                            <Button @click="vote(contestant.id)" :text="voted(contestant.id) ? 'Unvote' : 'Vote'"
                                size="small" :gray="voted(contestant.id)" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="roles">
                <div v-for="r in roles" @click="roleClick" :class="{ active: role === r }">
                    {{ r }}
                </div>
            </div>
        </div>
        <div class="run-container">
            <Button @click="displayModal" :text="running() ? `Withdraw from election` : `Run for ${role}`"
                :gray="running()" />
        </div>
        <div class="confirm-modal-container" v-if="showModal">
            <div class="confirm-modal">
                <div class="confirm-modal__msg">
                    {{ modalText }}
                </div>
                <Button @click="confirmModal" text="Confirm" :thin="true" />
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    width: 100%;
}

.confirm-modal-container {
    position: fixed;
    inset: 0;
    background: rgba(0 0 0 / .5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.confirm-modal {
    background-color: white;
    padding: 2em 2em;
    gap: 3em;
    text-align: center;
    border-radius: .25em;
    max-width: 50%;
}

.confirm-modal__msg {
    margin-bottom: 1.25em;
    width: 100%;
}

.run-container {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.voting-container {
    width: 80%;
    display: grid;
    column-gap: 3em;
    grid-template-columns: 3fr 1fr;
}

.contestants-container {
    display: flex;
    flex-direction: column;
    gap: 2em;
}

.contestants {
    height: 55vh;
    overflow-y: auto;
    justify-items: center;
    /* place-items: center; */
    display: grid;
    row-gap: 1em;
    grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
    scrollbar-width: thin;
}

.contestants::-webkit-scrollbar {
    width: 5px;
}

.contestants::-webkit-scrollbar-track {
    border-radius: 100vh;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.contestants::-webkit-scrollbar-thumb {
    border-radius: 100vh;
    background-color: darkgrey;
}

.contestant {
    display: flex;
    gap: .5em;
    width: max-content;
    height: max-content;
    align-items: center;
    padding: .5em;
}

.contestant__right {
    min-width: 10em;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: .5em
}

.contestant__name {
    font-size: 1.2em;
    font-weight: 500;
}

.contestant__left {
    position: relative;
}

.contestant__photo {
    width: 4em;
}

.contestant__votes {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: gray;
    width: 50%;
    aspect-ratio: 1;
    color: white;
    border-radius: 50%;
}

.roles {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5em;
}

.roles>* {
    font-size: 1.1em;
    cursor: pointer;
    width: 100%;
    text-align: center;
    border: 2px solid var(--primary);
    color: var(--accent);
    border-radius: .5em;
    padding: .5em;
}

.roles>.active {
    font-size: 1.2em;
    font-weight: 500;
    background-color: var(--primary);
    color: white;
}

.contestants-heading {
    grid-column: 1 / span 2;
    text-align: center;
    font-size: 1.75em;
    font-weight: 500;
}
</style>