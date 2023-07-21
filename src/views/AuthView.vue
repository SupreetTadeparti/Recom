<script setup>
import { ref } from "vue"
import Button from "../components/Button.vue"
import { signIn, signUp, googleSignIn } from "../auth"
import router from "@/router"
import { getDocs, addDoc, collection, query, where } from "firebase/firestore";
import { db } from "@/firebase"

const toggleFormType = () => {
    formType.value = 1 - formType.value;
}

const togglePageNumber = () => {
    registerPage.value = 1 - registerPage.value;
}

const authenticate = async () => {
    if (formType.value === 0) {
        errorMessage.value = await signIn(usernameEmail.value, password.value);
    }
    else if (registerPage.value === 1) {
        let communityName = createCommunityName.value || joinCommunityName.value

        if (createCommunityName.value.length > 0) {
            await addDoc(collection(db, "communities"), {
                name: createCommunityName.value,
                location: createCommunityLocation.value,
                members: [],
                suggestions: [],
                heads: []
            });
        }

        const communitiesRef = collection(db, 'communities')

        const q = query(communitiesRef, where('name', '==', communityName))

        const querySnapshot = await getDocs(q)

        if (querySnapshot.docs.length === 0) {
            console.log("No Communities Found")
            return;
        }

        const community = querySnapshot.docs[0]

        errorMessage.value = await signUp(
            username.value,
            email.value,
            password.value,
            confirmPassword.value,
            fullName.value,
            community,
        );
    }
    else togglePageNumber();
}

// 0 -> Sign In
// 1 -> Sign Up
const formType = ref(0)

// 0 -> First page
// 1 -> Second Page
const registerPage = ref(0)

// Input refs
const usernameEmail = ref("");
const username = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const joinCommunityName = ref("")
const fullName = ref("")
const createCommunityName = ref("")
const createCommunityLocation = ref("")
const errorMessage = ref("")

</script>

<template>
    <div class="auth-page">
        <div class="form-container">
            <div class="back-btn" @click="() => router.push('/')"><span>Back</span></div>

            <form class="form" action="" method="post" @submit="(e) => e.preventDefault()">
                <div class="form__heading">{{ formType === 0 ? "Login" : "Register" }}</div>
                <label v-if="formType === 0" class="form__label">Username or Email Address</label>
                <input v-if="formType === 0" v-model="usernameEmail" type="text" class="form__input"
                    placeholder="Enter username/email here...">

                <label v-if="formType === 1 && registerPage === 0" class="form__label">Username</label>
                <input v-if="formType === 1 && registerPage === 0" v-model="username" type="text" class="form__input"
                    placeholder="Enter username here...">

                <label v-if="formType === 1 && registerPage === 0" class="form__label">Email</label>
                <input v-if="formType === 1 && registerPage === 0" v-model="email" type="email" class="form__input"
                    placeholder="Enter email here...">

                <label v-if="formType === 0 || registerPage === 0" class="form__label">Password</label>
                <input v-if="formType === 0 || registerPage === 0" v-model="password" type="password" class="form__input"
                    placeholder="Enter password here...">

                <label v-if="formType === 1 && registerPage === 0" class="form__label">Confirm Password</label>
                <input v-if="formType === 1 && registerPage === 0" v-model="confirmPassword" type="password"
                    class="form__input" placeholder="Enter password here again...">

                <label v-if="formType === 1 && registerPage === 1" class="form__label">Profile Picture</label>
                <input v-if="formType === 1 && registerPage === 1" type="file" placeholder="Upload a photo">

                <label v-if="formType === 1 && registerPage === 1" class="form__label">Full Name</label>
                <input v-if="formType === 1 && registerPage === 1" v-model="fullName" type="text" class="form__input"
                    placeholder="Enter full name">

                <label v-if="formType === 1 && registerPage === 1" class="form__label">Join a Community</label>
                <input :disabled="createCommunityName.length > 0" v-if="formType === 1 && registerPage === 1"
                    v-model="joinCommunityName" type="select" class="form__input" placeholder="Select your community">

                <div v-if="formType === 1 && registerPage === 1" class="or-line"><span>or</span></div>

                <label v-if="formType === 1 && registerPage === 1" class="form__label">Create a Community</label>
                <input :disabled="joinCommunityName.length > 0" v-if="formType === 1 && registerPage === 1"
                    v-model="createCommunityName" type="text" class="form__input" placeholder="Enter community name...">
                <input :disabled="joinCommunityName.length > 0" v-if="formType === 1 && registerPage === 1"
                    v-model="createCommunityLocation" type="text" class="form__input"
                    placeholder="Enter community location...">

                <div class="error-message">{{ errorMessage }}</div>

                <Button @click="authenticate" type="submit"
                    :text="formType === 0 ? 'Login' : registerPage === 0 ? 'Next' : 'Register'" :thin="true" />
                <div v-if="formType === 0" class="form__type-toggle" @click="toggleFormType">
                    Don't have an account? <span> Register here.</span>
                </div>
                <div v-if="formType === 1" class="form__type-toggle" @click="toggleFormType">
                    Have an account? <span> Login here.</span>
                </div>

                <div class="or-line"><span>or</span></div>

                <div class="oauth-buttons">
                    <div @click="googleSignIn" class="oauth-button">
                        <img src="@/assets/img/googlelogo.png" alt="google">
                        Sign in with Google
                    </div>
                    <div class="oauth-button">
                        <img src="@/assets/img/facebooklogo.png" alt="fb">
                        Sign in with Facebook
                    </div>
                </div>
            </form>
        </div>
        <div class="form-bg"></div>
    </div>
</template>

<style scoped>
.auth-page {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 2fr 3fr;
}

.back-btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5em;
    position: absolute;
    top: 2.5em;
    left: 7.5em;
}

.back-btn>span {
    font-size: 1.1em;
    color: #444;
}

.back-btn::before {
    content: "";
    width: 10px;
    height: 10px;
    border-top: 1px solid #444;
    border-left: 1px solid #444;
    transform: rotate(-45deg);
}

.form-bg {
    background-image: url("@/assets/img/form_bg.svg");
    background-size: cover;
    border-top-left-radius: 2em;
    border-bottom-left-radius: 2em;
    position: relative;
    overflow: hidden;
}

.form-container {
    position: relative;
    padding: 2.5em 7.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    font-size: .9em;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
}

.form__heading {
    font-size: 2em;
    font-weight: 500;
    margin: .5em 0;
}

.form__label {
    display: block;
    color: #222;
}

.form__input {
    font-size: 1em;
    height: 2.75em;
    border-radius: .25em;
    border: 1px solid #333;
    padding: 0 1em;
    color: #444;
}

.form__input::placeholder {
    color: #444;
}

.form__input:focus {
    outline: none;
}

.form__type-toggle {
    color: #555;
}

.form__type-toggle>span {
    cursor: pointer;
    color: inherit;
    text-decoration: underline;
}

.or-line {
    position: relative;
    display: flex;
    justify-content: center;
}

.or-line>span {
    padding: 0 .75em;
    color: #666;
    font-size: 1.25em;
    background-color: white;
    z-index: 5;
}

.or-line::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background-color: #888;
}

.oauth-buttons {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.oauth-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1.5em;
    padding: .5em 1em;
    border: 1px solid #333;
    border-radius: 100vh;
    position: relative;
    background-color: white;
    transition: box-shadow 100ms ease-out;
}

.oauth-button:hover {
    box-shadow: 0 0 5px 0 rgba(0 0 0 / .25);
}

.oauth-button>img {
    width: 1.75em;
}

.error-message {
    color: var(--red);
}

@media (max-width: 60em) {
    .form-bg {
        display: none;
    }

    .auth-page {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 40em) {
    .form-container {
        padding: 1em;
    }
}
</style>