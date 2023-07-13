<script setup>
import Button from "../components/Button.vue"
import Nav from "../components/Nav.vue";
</script>

<template>
  <Nav />
  <main>
    <span class="page-name">Home</span>
    <div class="heading">The Green Living Community</div>
    <div class="address">Pipeline Road, Shivaji Nagar, Shirdi Sai Nagar, Manikonda Jagir, Telangana 500089</div>
    <div class="heading">Members</div>
    <div class="members">
      <div class="member">
        <img src="@/assets/img/default.png" alt="">
        <div class="details">
          <div class="name">John Doe</div>
          <div class="role">President</div>
        </div>
      </div>
      <div class="member">
        <img src="@/assets/img/default.png" alt="">
        <div class="details">
          <div class="name">John McAfee</div>
          <div class="role">Vice President</div>
        </div>
      </div>
      <div class="member">
        <img src="@/assets/img/default.png" alt="">
        <div class="details">
          <div class="name">Joe Biden </div>
          <div class="role">Treasurer</div>
        </div>
      </div>
      <div class="member">
        <img src="@/assets/img/default.png" alt="">
        <div class="details">
          <div class="name">John Doe</div>
          <div class="role">Secretary</div>
        </div>
      </div>
      <div class="member">
        <img src="@/assets/img/default.png" alt="">
        <div class="details">
          <div class="name">John Doe</div>
          <div class="role">Event Coordinator</div>
        </div>
      </div>
      <div class="member">
        <img src="@/assets/img/default.png" alt="">
        <div class="details">
          <div class="name">John Doe</div>
          <div class="role">Grievance Officer</div>
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
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
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

.member.btn {
  width: 12.5em;
  justify-content: center;
  background-color: var(--primary);
  color: white;
  font-size: 1.2em;
  padding: .75em 0;
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
</style>