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
		  //valider tlf nr
		  const tlfPattern = /^[0-9]{3}[0-9]{2}[0-9]{3}$/;
		  if(!tlfPattern.test(this.tlf)){
			alert("Fejl! Indtast et tlf.nr. i det korekte format: XXXXXXXX");
			return;
		  }
		  console.log("tlf.nr er korrekt:", this.tlf);
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