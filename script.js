baseUrl = "https://localhost:44327/api/Borger";

const app = Vue.createApp({
    data() {
        return {
            borgerTlf: [], //tomt array til at indeholde data omkring borger
			tlf: "",
			id: 0,
			outPutMessage: "",
		}
    },
	created(){ // life cycle method. Called when browser reloads page

	},
	methods:{
		async getByTlfBorger(tlf){
		try{
		  const result = await axios.post(baseUrl + "/" + tlf + "/" + "BorgerTlf?tlf=" + tlf,
		  { tlf: this.tlf });
		  console.log(result.data);
		  this.outPutMessage = result.data
		  window.location.href = "/BorgerRegi.html?tlf=" + tlf;
		  } catch (ex) {
			// Handle error
			{
				alert("Du er allerede logget ind med tlf! ... "  + ex.message)
			}
		  }
	    },
	}

}).mount("#app") //her bliver appen mounted