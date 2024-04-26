baseUrl = "https://localhost:44327/api/Borger";

const BorgerRegi = Vue.createApp({
    data() {
        return {
            borgerRegi: [], //tomt array til at indeholde data omkring actors
			result: null,
		}
    },
	created(){ // life cycle method. Called when browser reloads page
		this.getAll()
	},
	methods: {
		getAll(){
		  //use a helpermethod - DRY
		  this.getAllHelper(baseUrl)
		},
		async getAllHelper(url){ //helper method
		try{
		  //response with axios
		  const response = await axios.get(url)
		  this.borgerRegi = await response.data
		  }
		catch(ex){
		  alert(ex.message)
		  }
	    },
	}
})
BorgerRegi.mount("#BorgerRegi") //her bliver appen mounted