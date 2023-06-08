<template>
  <div>
    <h1>Calorie Calculator</h1>
    <form @submit.prevent="calculateCalories">
      <label for="weight">Weight (in kg):</label>
      <input type="number" id="weight" v-model="weight" required>
      <br>
      <label for="height">Height (in cm):</label>
      <input type="number" id="height" v-model="height" required>
      <br>
      <label for="age">Age:</label>
      <input type="number" id="age" v-model="age" required>
      <br>
      <label for="gender">Gender:</label>
      <select id="gender" v-model="gender" required>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <br>
      <label for="activityLevel">Activity Level:</label>
      <select id="activityLevel" v-model="activityLevel" required>
        <option value="sedentary">Sedentary</option>
        <option value="lightlyActive">Lightly Active</option>
        <option value="moderatelyActive">Moderately Active</option>
        <option value="veryActive">Very Active</option>
        <option value="extraActive">Extra Active</option>
      </select>
      <br>
      <label for="fitnessGoal">Fitness Goal:</label>
      <select id="fitnessGoal" v-model="fitnessGoal" required>
        <option value="loseWeight">Lose Weight</option>
        <option value="maintainWeight">Maintain Weight</option>
        <option value="gainWeight">Gain Weight</option>
      </select>
      <br>
      <button type="submit">Calculate</button>
    </form>
    <div v-if="calories">
      <h2>Target Calorie Intake:</h2>
      <p>Calories: {{ calories.calories }}</p>
      <p>Protein: {{ calories.protein }}g</p>
      <p>Fat: {{ calories.fat }}g</p>
      <p>Carbs: {{ calories.carbs }}g</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weight: null,
      height: null,
      age: null,
      gender: 'male',
      activityLevel: 'sedentary',
      fitnessGoal: 'loseWeight',
      calories: null
    }
  },
  methods: {
    calculateCalories() {
      // Calculate target calorie intake based on formulas in FITNESS COACHING.pdf
      let bmr = 0;
      if (this.gender === 'male') {
        bmr = 88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.age);
      } else {
        bmr = 447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.age);
      }
      let activityFactor = 0;
      switch (this.activityLevel) {
        case 'sedentary':
          activityFactor = 1.2;
          break;
        case 'lightlyActive':
          activityFactor = 1.375;
          break;
        case 'moderatelyActive':
          activityFactor = 1.55;
          break;
        case 'veryActive':
          activityFactor = 1.725;
          break;
        case 'extraActive':
          activityFactor = 1.9;
          break;
      }
      let tdee = bmr * activityFactor;
      let calorieAdjustment = 0;
      switch (this.fitnessGoal) {
        case 'loseWeight':
          calorieAdjustment = -500;
          break;
        case 'maintainWeight':
          calorieAdjustment = 0;
          break;
        case 'gainWeight':
          calorieAdjustment = 500;
          break;
      }
      let targetCalories = tdee + calorieAdjustment;
      let protein = this.weight * 2.2 * 1.2;
      let fat = targetCalories * 0.25 / 9;
      let carbs = (targetCalories - (protein * 4) - (fat * 9)) / 4;
      this.calories = {
        calories: Math.round(targetCalories),
        protein: Math.round(protein),
        fat: Math.round(fat),
        carbs: Math.round(carbs)
      };
    }
  }
}
</script>