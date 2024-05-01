baseUrl = "https://localhost:44327/api/Borger";

const BorgerRegi = Vue.createApp({
    data() {
        return {
            borgerTlfArray: [], //tomt array til at indeholde data omkring borgere
			outputTlfData: "",
			registrArray: [], //tomt array til registreringerne
			addRegi: {
				ind: "",
				ud: "",
				addPause:{
					pauseStart: "",
					pauseSlut: ""
				}
			}

		}
    },
	created(){ // life cycle method. Called when browser reloads page
	// Extract 'tlf' parameter fra den nuværende URL's query string
		const tlf = new URLSearchParams(window.location.search).get('tlf');
		this.getRoutingBorgerTlf(baseUrl, tlf)
	},
	methods: {
		async getRoutingBorgerTlf(url, tlf){
		try{
		  //response with axios
		  // Construct the URL of the destination site by
		  	// appending the 'tlf' parameter to the base URL
		  const response = await axios.get(url + "/" + tlf + "/" + "BorgerTlf?tlf=" + tlf,  { tlf: this.tlf })
		  console.log(baseUrl + "/" + tlf + "/" + "BorgerTlf?tlf=" + tlf)
		  this.outputTlfData = response.data
		  console.log(response.data)
		  }
		catch(ex){
		  alert("fejl i tlf!" + ex.message)
		  }
	    },
		async getAllBorgerTlf(url, tlf){
			try{
				//response with axios
			    const response = await axios.get(url + "/" + tlf + "/" + "BorgerTlf?tlf=" + tlf,  { tlf: this.tlf })
			    this.registrArray = await response.data
				}
			catch(ex){
				alert("Fejl get all borger tlf " + ex.message)
				}
		},
		async opretRegistr(tlf){
			console.log(this.addRegi)
			console.log(this.addPause)
			try{
				await axios.post(baseUrl + "/" + tlf + "/" + "BorgerTlf?tlf=" + tlf,  { tlf: this.tlf })
				//response = await axios.post(baseUrl, this.addRegi)
				this.addRegi = "Responskode: " + response.status + " " + response.statusText
				this.getAllBorgerTlf(url, tlf)
				console.log(this.registrArray)
			}
			catch(ex){
				{alert("Fejl i opret registreringer! " + ex.message)}
                // alert("Fejl! Der er noget galt " + response.status)
			}
		},
	}
})
BorgerRegi.mount("#BorgerRegi") //her bliver appen mounted