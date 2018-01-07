<template>
  <div id="app-header" class="mt-3 pt-3">
    <h1 class="text-center">עזרה בדרך</h1>
    <div class="text-center m-4">
      <ul class="nav nav-justified p-0">
        <li class="nav-item">
          משתמש מחובר: אוהד
        </li>
        <li class="nav-item">
          <input class="form-control" type="text" placeholder="חיפוש">
        </li>
        <li class="nav-item">
          7 בינואר 2018, 14:04:56
        </li>
      </ul>
    </div>
    <ul class="nav nav-tabs mt-3">
      <li class="nav-item">
        <a class="nav-link active" href="#">מסך ראשי</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">פניות</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">מתנדבים</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">קבוצות מתנדבים</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">זקנים</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">מפה</a>
      </li>
    </ul>
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
#app-header{
  background-color: #eee;
}
</style>
