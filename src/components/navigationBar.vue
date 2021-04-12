<template>
  <div>
  <nav class="navBar">
    <router-link to="/Home"><img class="logo" src="../assets/logo.png"></router-link>
              <ul class="nav-list" >
                <li class="nav-item">
                  <router-link to="/howTo"><button type="button" class="btn btn-outline-info">How to</button></router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/aboutUs"><button type="button" class="btn btn-outline-info">About Us</button></router-link>
                </li>
                <li class="nav-item">
                   <router-link to="/contact"><button type="button" class="btn btn-outline-info">Contact</button></router-link>
                  </li>
              </ul> 
    </nav>
    <div class="description">
    <h4>Tinker With a Neural Network Right Here in Your Browser.<br>
    Don’t Worry, You Can’t Break It. We Promise.</h4>
    </div>
    </div>
    
</template>

<script>
export default {
  name: 'navigationBar',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navBar{
  margin-top: 1%;
  left:0;
  width:100%;
  height:12vh;
  position: relative;
}
.logo{
  width: 30vw;
  float: left;
}
.nav-list {
    position: relative;
    display:flex;
    float:right;
    font-family: 'Marcellus SC';
    font-size: 22px;
    list-style: none;
    margin-top: 1%;
    width:60vw;
  }
.nav-item{
margin-right: 5%;
  }
.description{
  display: flex;
  position: relative;
  text-align: center;
  justify-content: center;
  height: 15vh;
  min-height: 100px;
  width:100%;
  background-color: #183d4e;
  color:white;
}
h4{
  font-size: 18px;
  margin-top: 3%;
}
.btn{
  width:14vw;
}
</style>
