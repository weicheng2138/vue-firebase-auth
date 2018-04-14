<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Select your working dead...</h2>

    <template>
      <!--<div>-->
        <!--<v-date-picker-->
          <!--mode='single'-->
          <!--v-model='selectedValue'-->
        <!--&gt;-->
        <!--</v-date-picker>-->
      <!--</div>-->
      <v-calendar
        :attributes='attributes'
        @dayclick='dayClicked'>
      </v-calendar>
    </template>

    <div>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'Hello',
    data() {

      return {
        attributes: [
          // This is a single attribute
          {
            // An optional key can be used for retrieving this attribute later,
            // and will most likely be derived from your data object
            key: 1,
            // The attribute can contain any of the following object types
            // -> highlight/dot/bar/popover/contentStyle/customData
            highlight ({ isFocused }) {
              return {
                backgroundColor: '#ff8080',
              };
            },
            popover: {
              label: 'No need to work!',
            },
            contentStyle: {
              color: '#fafafa',
            },
            // popover: { ... },
            // contentStyle: { ... },
            // Supply your custom data object for later access, if needed
            // customData: { ... },

            // We also need some dates to know where to display the attribute
            // We use a single date here, but it could also be a date range or a complex date pattern.
            // Arrays are also allowed
            dates: [

            ],
            // You can optionally provide dates to exclude.
            // All other dates are used by the attributed.
            excludeDates: null,
            // Think of `order` like `z-index`
            order: 0
          }
        ],
        msg: 'Welcome to Our Happy Working Dead *.*',
        selectedDay: null
      }
    },
    methods: {
      logout: function () {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login');
        })
      },
      dayClicked(day) {
        let index = this.attributes[0].dates.indexOf(day.date);
        if (index !== -1) {
          console.log(day.date);
          this.attributes[0].dates.splice(index, 1);
        } else {
          this.attributes[0].dates.push(day.date);
        }
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  button {
    margin-top: 30px;
    padding: 10px 20px;
    background: #42b983;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 22px;
    outline: 0;
    cursor: pointer;
  }
  #hello {
    display: flex;
  }

  .selected-day {
    margin-left: 10px;
  }
</style>
