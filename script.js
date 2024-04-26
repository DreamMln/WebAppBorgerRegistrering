baseUrl = "https://localhost:44327/api/Borger";

const app = Vue.createApp({
    data() {
        return {
            borgerTlf: [], //tomt array til at indeholde data omkring borger
			tlf: "",
			outPutMessage: "",
		}
    },
	created(){ // life cycle method. Called when browser reloads page

	},
	methods:
	{
		async login(){
		try{
		  const response = await axios.post(baseUrl,
			{
			tlf: this.tlf
		    });
		  console.log(response.data);
		  this.outPutMessage = response.data;
		  window.location.href = "/BorgerRegi.html";
		  } catch (ex) {
			// Handle error
			{
				alert("Du kan ikke logges ind, der er en fejl! " + ex.message)
			}
		  }
	    },
            //location.href="/borgerRegi.html?id=" + borgerID
	}

}).mount("#app") //her bliver appen mounted