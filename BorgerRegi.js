baseUrl = "https://localhost:44327/api/Borger";

const BorgerRegi = Vue.createApp({
    data() {
        return {
            borgerTlfArray: [], //tomt array til at indeholde data omkring borgere
			outputTlfData: "",
			registrArray: [], //tomt array til registreringerne
			pauseArray: [], //tomt array til pauser
			borgerRegistreringer:
			{
			     ind: null,
				 ud: null,
			},
			//info fra backend, spørge serveren om
			state: "not working",
			borgerPauser:
			{
				pauseStart: null,
				pauseSlut: null,
			},
			//info fra backend, spørge serveren om
			statePause: "pause not started",

			tlf: "",
			id: 0,
			//borgerID: 0,
			addMessage: "",
		}
    },
	created(){ // life cycle method Called when browser reloads page
		//created() lifecycle hook is used to fetch data
		//when the browser reloads the page.
	// Extract 'tlf' parameter fra den nuværende URL's query string
		const tlf = new URLSearchParams(window.location.search).get('tlf');

		this.getRouteByBorgerTlf(tlf)
		this.getAllRegiForEnBorger(this.id)
		this.getAllPauserBorger(this.id)

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

			//this.borgerID = id;
			//hent regi data
			const response = await axios.get(baseUrl + "/" + id + "/BorgerRegistreringer")
			this.registrArray = await response.data
			console.log(response.data)
		}catch(ex){
            alert("Fejl! Der er noget galt i hent regi" + response.status)
		}
		},
		//1. sepererer ind og ud knapper V
		//2. hvis borger logget ind
		// er der to muligheder, slutpause eller ud
		//=== strict ligheds-operator, compare to værdier, uden en konvertering af typen
		async sendRegi(id, buttenClicked){
			const dato = new Date().toDateString();
			const tid = new Date().toLocaleTimeString();

			if(this.state === 'not working'){
				  if(buttenClicked === 'ind'){
					this.borgerRegistreringer.ind = " Dato: " + dato + " - " + " Tid: " + tid;
					this.borgerRegistreringer.ud = null; // Reset 'ud' if only 'ind' is set
					//du er nu indregistreret og din status er working
					this.state = "working";
					//send et borgerregi obj. med borger id her sender den det/post
					await axios.post(baseUrl + "/" + id + "/BorgerRegistreringer", this.borgerRegistreringer)
					this.getAllRegiForEnBorger(id)
					console.log(this.registrArray)
		    	    }
				    //sætte pause ind
				    else if(buttenClicked === 'ud' || buttenClicked === 'pauseSlut'){
					alert("Du kan ikke udregistrere/slutte en pause, før du er indregistreret!")
				}
			}
			else if(this.state === 'working'){
				if(buttenClicked === 'ud'){
					this.borgerRegistreringer.ind = null; // Reset 'ind' if only 'ud' is set
					this.borgerRegistreringer.ud = " Dato: " + dato + " - " + " Tid: " + tid;
					//trykket ud - state ændres til ikke på arbejde
					this.state = "not working";
					//borgerens id, send et borgerregi obj. her sender den det/post
			        await axios.post(baseUrl + "/" + id + "/BorgerRegistreringer", this.borgerRegistreringer)
			        //after, refresh the data
					//returns the updated registration array
					this.getAllRegiForEnBorger(id)
			        console.log(this.registrArray)
		    }
				//sætte pause ind
				else if(buttenClicked === 'ind'){
					alert("Du er allerede indregistreret!")
				}
			}
			// 	//borger skal ikke kunne logge sig ud, før man er logget ind
			// 	if(!this.borgerRegistreringer.ind){
			// 		alert("Du skal være indregistreret før du kan udregistrere dig!");
			// 		return
			// }
			//hvis du er indregistreret, så er der to muligheder,
			//holde pause eller ud registrere sig
		    console.log("ind: " + this.borgerRegistreringer.ind);
			console.log("ud: " + this.borgerRegistreringer.ud);
		},
		/////////////BORGER PAUSER/////////
		async getAllPauserBorger(id){
			//this.borgerID = id;
			try{
			//hent pause data
			const response = await axios.get(baseUrl + "/" + id + "/BorgerPauser")
			this.pauseArray = await response.data
			console.log(response.data)
		}catch(ex){
            alert("Fejl! Der er noget galt - hent pauser" + response.status)
		}
		},
		async sendPause(id, buttonClicked){
			const dato = new Date().toDateString();
			const tid = new Date().toLocaleTimeString();
			//=== operator is a strict equality operator in JavaScript. It compares two values for equality without performing any type conversion.
			//are of the same type and have the same value, === returns true.
			if (this.statePause === 'pause not started') {
				if (buttonClicked === 'pauseStart') {
					this.borgerPauser.pauseStart = " Dato: " + dato + " - " + " Tid: " + tid;
					this.borgerPauser.pauseSlut = null; // Reset 'PauseSlut' if only 'PauseStart' is set
					//pausen er nu startet
					this.statePause = "pause started"
					//send data pauser regi til serveren
					await axios.post(baseUrl + "/" + id + "/BorgerPauser", this.borgerPauser)
					//refresh
					this.getAllPauserBorger(id)
					console.log(this.pauseArray)
				}
				else if (buttonClicked === 'pauseSlut') {
					alert("Du skal have startet en pause, før du kan afslutte en pause!");
				}
			}
			else if (this.statePause === 'pause started') {
				if(buttonClicked === 'pauseSlut'){
					this.borgerPauser.pauseStart = null;// Reset 'pauseStart' if only 'PauseSlut' is set
					this.borgerPauser.pauseSlut = " Dato: " + dato + " - " + " Tid: " + tid;
					//state: pausen er nu afsluttet
					this.statePause = "pause not started"
					//send data pauser regi til serveren
					await axios.post(baseUrl + "/" + id + "/BorgerPauser", this.borgerPauser)
					//refresh the data after
					this.getAllPauserBorger(id)
					console.log(this.pauseArray)
				}
				else if (buttonClicked === 'pauseStart') {
					alert("Du har allerede startet din pause!");
				}
		    }
			console.log("Start: " + this.borgerPauser.pauseStart);
			console.log("Slut: " + this.borgerPauser.pauseSlut);
			console.log(this.pauseArray)
		},
	}
})
BorgerRegi.mount("#BorgerRegi") //her bliver appen mounted