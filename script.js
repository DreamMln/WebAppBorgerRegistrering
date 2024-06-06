baseUrl = "https://localhost:44327/api/Borger";

const app = Vue.createApp({
    data() {
        return {
            borgerTlf: [], //tomt array til at indeholde data omkring borger
			tlf: "",
			id: 0,
			outPutMessage: "",
			success: "",
    		error: "",
		}
    },
	created(){ // life cycle method. Called when browser reloads page

	},
	methods:{
		async getByTlfBorger(tlf){
		try{
		  //valider tlf nr
		if (this.tlf.match(/^[0-9]{8}$/)) {
			this.success = 'Success! Du bliver nu logget ind!';
        	this.error = '';
		  } else {
			this.success = '';
        	this.error = 'Fejl! Nr. skal være 8 tal!';
		  }
		  const result = await axios.post(baseUrl + "/" + tlf + "/" + "BorgerTlf?tlf=" + tlf,
		  { tlf: this.tlf });
		  console.log(result.data);
		  this.outPutMessage = result.data
		  window.location.href = "/BorgerRegi.html?tlf=" + tlf;
		  } catch (ex) {
			// Handle error
			{
				alert("Du kan ikke logge dig ind lige nu. "  + ex.message)
			}
		  }
	    },
	}

}).mount("#app") //her bliver appen mounted