<template>
  <div>
    <h2>פניה חדשה</h2>
    <form>
      <div class="form-group">
        <label for="referrer">גורם מפנה</label>
        <input type="text" class="form-control" id="referrer" placeholder="שם הגורם המפנה">
      </div>
      <div class="form-group">
        <label for="elder">זקן</label>
        <input type="text" class="form-control" id="elder" placeholder="שם הזקן">
      </div>
      <div class="form-group">
        <label for="ticket-type">סוג פניה</label>
        <select class="form-control" id="ticket-type">
          <option>ליווי</option>
          <option>ביקור</option>
          <option>עזרה טכנית</option>
          <option>שיחה</option>
        </select>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary mb-2">פתח פניה</button>
      </div>
      
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
