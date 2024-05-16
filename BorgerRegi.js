baseUrl = "https://localhost:44327/api/Borger";

const BorgerRegi = Vue.createApp({
    data() {
        return {
            borgerTlfArray: [], //tomt array til at indeholde data omkring borgere
			outputTlfData: "",
			registrArray: [], //tomt array til registreringerne

			borgerRegistreringer:
			{
			     ind: "",
				 ud: "",
					borgerPauser:
						{
							pauseStart: "",
							pauseSlut: ""
						}

				},
			tlf: "",
			id: 0,
			//borgerID: 0,
			addMessage: "",
			objectDate: "",
		}
    },
	created(){ // life cycle method Called when browser reloads page
		//created() lifecycle hook is used to fetch data
		//when the browser reloads the page.
	// Extract 'tlf' parameter fra den nuværende URL's query string
		const tlf = new URLSearchParams(window.location.search).get('tlf');

		this.getRouteByBorgerTlf(tlf)
		this.getAllRegiForEnBorger(this.id)

	},
	methods: {
		//CheckIfBorgerExists from Api
		async getRouteByBorgerTlf(tlf){
		try{
		  //response with axios
		  // Construct the URL of the destination site by
		  	// appending the 'tlf' parameter to the base URL
		  const response = await axios.get(baseUrl + "/" + tlf + "/" + "BorgerTlf?tlf=" + tlf,  { tlf: this.tlf })
		  console.log(baseUrl + "/" + tlf + "/" + "BorgerTlf?tlf=" + tlf)
		  this.outputTlfData = response.data
		  console.log(response.data)
		  }
		catch(ex){
		  alert("fejl i tlf!" + ex.message)
		  }
	    },
		//In the getAllRegi method,
		//you're asynchronously fetching all registrations for a citizen
		//based on their ID.
		async getAllRegiForEnBorger(id){
			try{
			// Converts the date, to ISO format
			let objectDate = new Date()
			objectDate.toDateString()
			//this.borgerID = id;
			//hent regi data
			const response = await axios.get(baseUrl + "/" + id + "/BorgerRegistreringer")
			this.registrArray = await response.data
			console.log(response.data)
		}catch(ex){
            alert("Fejl! Der er noget galt i hent regi" + response.status)
		}
		},
		async sendRegi(id){
			try{
			//udfylde med dato og sende til serveren,
			//( ikke modtage regiobj. kun sende/post)
			//spørger, hvad tilstand er brugeren i - er han på arb, eller ej
			//pauser - flere tilstande, er vi på pause eller ej?
			//logget ind to mulig, pause eller gå hjem
			//1. er jeg på arbejde og er jeg på pause
			//to metoder

			// Converts the date, to ISO format
			let objectDate = new Date();
			//let day = objectDate.getDate();
			//let month = objectDate.getMonth();
			//let year = objectDate.getFullYear();
			//let hours = objectDate.getHours();
			//let minutes = objectDate.getMinutes();
			//let seconds = objectDate.getSeconds();

			this.borgerRegistreringer.ind = objectDate
			this.borgerRegistreringer.ud = objectDate

			//pause
			this.borgerPauser.startPause = objectDate
			this.borgerPauser.slutPause = objectDate

			//this.borgerRegistreringer.ind = objectDate


			//this.borgerRegistreringer.ind =
			//date.toDateString();
			//this.borgerRegistreringer.ud =
			//date.toDateString();
		    console.log("ind: " + this.borgerRegistreringer.ind);
			console.log("ud: " + this.borgerRegistreringer.ud);
			//borgerens id, send et borgerregi obj. her sender den det/post
			const response = await axios.post(baseUrl + "/" + id + "/BorgerRegistreringer", this.borgerRegistreringer)
			//after, refresh the data
			this.getAllRegiForEnBorger(id)
			console.log(this.registrArray)
			//https://www.freecodecamp.org/news/how-to-format-a-date-with-javascript-date-formatting-in-js/
			}
			catch(ex){
				{alert("Fejl i opret registreringer! " + ex.message)}
			}
		},
		async sendPause(){
			let objectDate = new Date();

			//pause
			this.borgerPauser.startPause = objectDate
			this.borgerPauser.slutPause = objectDate
		},
	}
})
BorgerRegi.mount("#BorgerRegi") //her bliver appen mounted