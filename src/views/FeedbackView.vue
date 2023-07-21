<script setup>
import { ref, onMounted } from "vue";
import Nav from "../components/Nav.vue";
import { getCommunity, db, getUser } from "../firebase";
import { collection, addDoc, getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'

const props = defineProps([])
const newSuggestion = ref(false);
const name = ref("");
const body = ref("");
const suggestions = ref([]);
const community = ref(null);
const user = ref(null);

onMounted(async () => {
    user.value = await getUser();
    community.value = await getCommunity()
    suggestions.value = await Promise.all(
        community.value.suggestions.map(
            async suggestion => (await getDoc(
                doc(db, "suggestions", suggestion.trim())
            )).data()
        )
    )
})

const addSuggestion = async () => {
    const suggestionDoc = await addDoc(collection(db, 'suggestions'), {
        name: name.value,
        body: body.value,
        author: user.value.id
    })
    await updateDoc(doc(db, 'communities', user.value.community), {
        suggestions: arrayUnion(suggestionDoc.id)
    })
}

</script>

<template>
    <Nav />
    <main>
        <span class="page-name">Feedback</span>
        <div class="feedback">
            <div class="suggestion" v-for="suggestion in suggestions">
                <div class="suggestion__name">{{ suggestion.name }}</div>
                <div class="suggestion__body">{{ suggestion.body }}</div>
            </div>
        </div>
        <div class="new-suggestion-page" :class="{ active: newSuggestion }">
            <div class="new-suggestion-container">
                <div class="new-suggestion-btn" @click="() => newSuggestion = true">
                    <img src="@/assets/img/addfeedback.svg" alt="+">
                </div>
                <div class="view-suggestion-btn" @click="() => newSuggestion = false">
                    <img src="@/assets/img/viewfeedback.svg" alt="-">
                </div>
                <form class="new-suggestion-form" action="#" method="post" @submit.prevent="addSuggestion">
                    <div class="heading">Add Suggestion</div>
                    <input class="suggestion-heading" v-model="name" type="text" placeholder="Heading...">
                    <textarea class="suggestion-desc" v-model="body" placeholder="Description..."></textarea>
                    <button class="suggestion-btn">Add</button>
                </form>
            </div>
        </div>
    </main>
</template>

<style scoped>
.new-suggestion-form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: min(100%, 30em);
}

.suggestion-heading {
    font-size: 1.2em;
}

.suggestion-desc {
    height: 15em;
}

.suggestion-btn {
    cursor: pointer;
    padding: .5em;
    border-radius: .25em;
    font-size: 1.3em;
    background-color: unset;
    /* background-color: var(--accent); */
    border: 2px solid white;
    color: white;
    transition: background-color 200ms, color 200ms;
}

.suggestion-btn:hover {
    background-color: white;
    color: var(--primary)
}

.suggestion-heading,
.suggestion-desc {
    resize: none;
    padding: .5em;
    border-radius: .25em;
    border: 1px solid white;
}

.suggestion-heading:focus,
.suggestion-desc:focus {
    outline: none;
}

.new-suggestion-container {
    padding: 2em;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em
}

.feedback {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.new-suggestion-page {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(100%);
    width: 100%;
    height: 100%;
    background-color: var(--primary);
    transition: transform 500ms ease-out;
}

.new-suggestion-page.active {
    transform: translateY(0)
}

.new-suggestion-container .heading {
    color: white;
}

.new-suggestion-btn,
.view-suggestion-btn {
    cursor: pointer;
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translateX(-50%) scale(2);
}

.view-suggestion-btn {
    bottom: unset;
    top: 0;
    transform: translateX(-50%) scale(-2);
}

.suggestion {
    width: 60%;
    border: 2px solid var(--primary);
    padding: 1em;
    border-radius: .5em;
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.suggestion.complaint {
    border: 2px solid var(--red)
}

.suggestion__name {
    font-size: 1.5em;
    text-decoration: underline;
    text-decoration-color: var(--accent);
    text-decoration-thickness: 3px;
}

.suggestion__body {
    color: #444;
}

@media (max-width: 60em) {
    .suggestion {
        width: 90%;
    }
}
</style>