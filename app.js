new Vue({
    el: '#app',
    data: {
        inputWeight: 175,
        inputHeight: 72,
        weight: null,
        height: null,
        age: 19,
        gender: 'male',
        activityLevel: 'highlyActive',
        fitnessGoal: 'maintainWeight',
        calories: null,
        unitSystem: 'imperial',
    },
    computed: {
        weightUnits() {
            return this.unitSystem === 'imperial' ? 'lbs' : 'kg';
        },
        heightUnits() {
            return this.unitSystem === 'imperial' ? 'in' : 'cm';
        },
        activityLevelDescription() {
          switch (this.activityLevel) {
            case 'sedentary':
              return 'Works a desk job, very little activity outside of lifting';
            case 'lightlyActive':
              return 'Works a desk job, takes pet for a walk most days in addition to lifting';
            case 'moderatelyActive':
              return 'Works as a full-time waitress, occasionally plays tennis in addition to lifting';
            case 'highlyActive':
              return 'Works as a construction worker, regular hiking in addition to lifting';
            default:
              return '';
          }
        }
      },
    methods: {
        calculateCalories() {
            // Convert input values to metric units if the user selects imperial units
            if (this.unitSystem === 'imperial') {
                this.weight = this.inputWeight / 2.20462;
                this.height = this.inputHeight * 2.54;
            } else {
                this.weight = this.inputWeight;
                this.height = this.inputHeight;
            }

            // Calculate target calorie intake based on formulas in FITNESS COACHING.pdf
            let bmr = 0;
            if (this.gender === 'male') {
                bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age + 5;
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
                case 'highlyActive':
                    activityFactor = 2.2;
                    break;
            }
            let tdee = bmr * activityFactor;
            let calorieAdjustment = 0;
            switch (this.fitnessGoal) {
                case 'loseWeight':
                    calorieAdjustment = -0.2;
                    break;
                case 'maintainWeight':
                    calorieAdjustment = 0;
                    break;
                case 'gainWeight':
                    calorieAdjustment = 0.15;
                    break;
            }
            let targetCalories = tdee + calorieAdjustment * tdee;
            let targetProtein = this.weight * 2.2 * 1.2;
            let targetFat = this.weight * 2.2 * 0.3;
            let targetCarbs = (targetCalories - (targetProtein * 4) - (targetFat * 9)) / 4;
            this.calories = {
                calories: targetCalories.toFixed(0),
                protein: targetProtein.toFixed(0),
                fat: targetFat.toFixed(0),
                carbs: targetCarbs.toFixed(0)
            };
        }
    },
    watch: {
      unitSystem(newVal, oldVal) {
        if (oldVal === 'imperial' && newVal === 'metric') {
          this.inputWeight = Math.round(this.inputWeight / 2.20462);
          this.inputHeight = Math.round(this.inputHeight / 0.393701);
        } else if (oldVal === 'metric' && newVal === 'imperial') {
          this.inputWeight = Math.round(this.inputWeight * 2.20462);
          this.inputHeight = Math.round(this.inputHeight * 0.393701);
        }
      }
    }
});