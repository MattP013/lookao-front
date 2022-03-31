const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const cardContainer = document.querySelector(".card-container");
const Card = document.querySelector(".card")

const navMenu = document.getElementById('nav-menu')
const navToggle = document.getElementById('nav-toggle')	
const navClose = document.getElementById('nav-close')
const navLink = document.querySelectorAll('.nav__link')
if (navToggle) {
	navToggle.addEventListener('click', ()=>{
		navMenu.classList.add('show-menu')
	})
}
if(navClose){
	navClose.addEventListener('click',()=>{
		navMenu.classList.remove('show-menu')
	})
}

function linkAction(){
	navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click',linkAction))
const pet = [

				{
					id:1,
					name:"mylon",
					raca:"viralata",
					especie:"canina",
					situacao: "perdido",
					endereco:"11347640",
					img:"./img/pet1.jpg",
					descricao:"ele esta perdido, na região do bairro Rio Branco, desde o dia 15/10.  Ele é um viralata muito docio da cor caramelo, ele tem uma faixa branca perto do seu rabo"
				},


				{
					id:2,
					name:"edu",
					raca:"viralata",
					especie:"canina",
					situacao: "perdido",
					endereco:"11347640",
					img:"./img/pet1.jpg",
					descricao:"ele esta perdido, na região do bairro Rio Branco, desde o dia 15/10.  Ele é um viralata muito docio da cor caramelo, ele tem uma faixa branca perto do seu rabo"
				},


				{
					id:3,
					name:"loke",
					raca:"pinsher",
					especie:"canina",
					situacao: "localizado",
					endereco: "11702-580",
					img:"./img/pet2.jpg",
					descricao:" Ele ainda é um filhote, e é bem medroso. Caso tenha encontrado ele aproxime-se bem devagar"
				},
				{
					id:4,
					name:"loke",
					raca:"pinsher",
					especie:"canina",
					situacao: "localizado",
					endereco: "11702-580",
					img:"./img/pet2.jpg",
					descricao:" Ele ainda é um filhote, e é bem medroso. Caso tenha encontrado ele aproxime-se bem devagar"
				},
		]
//Conexao com a api no heroku
// async function getContent(){
// 	try{
// 		const response = await fetch('http://localhost:3030/raca');
// 		console.log(response.json())
// 	}catch(err){
// 		console.error(err)
// 	}
		
// }

// getContent()

// Funcoes para listar e filtrar os pets 
const listarPet = (searchPet)=>{
	const Pets = searchPet.map((pets)=>{
	 	return `
	 		 <div class="row">
	            <div class="col-md-3">
	                <div class="card-sl">
	                    <div class="card-image">
	                        <img
	                            src="${pets.img}"
	                            class="petperfil"
	                        />
	                    </div>
	                    <div class="card-heading">
	                        ${pets.name}
	                    </div>
	                    <div class="card-text">
	                    	${pets.descricao}
	                    </div>
	                    <div class="card-text">
	                       <i class="fas fa-clock"></i> 14 de janeiro de 2022
	                    </div>
	                    <a href="#" id="btn-details" 
	                      data-toggle="modal" onclick="detailsPet(${pets.id})" 
	                      data-target="#details-modal"
						  class="card-button"> 
						   	Ver mais
						 </a>
	                </div>
	            </div>
        	</div>
	 	`
	}).join('');

	cardContainer.innerHTML = Pets;
}
	
 document.body.onload = listarPet(pet);

inputBox.onkeyup = async (e) =>{
	const search = e.target.value;
	searchWrapper.classList.remove('active');
	const validaCEP = /^[0-9]{8}$/
	
	if (validaCEP.test(search)) {
		 const data = await resultCEP(search)
		 searchWrapper.classList.add('active')
		suggBox.innerHTML = `<li>Resultado para: ${data.street}, ${data.neighborhood} ${data.city}</li>`;

		const PetByCEP = pet.filter((pets) =>{
			return pets.endereco == search
		})

		listarPet(PetByCEP)
	}
	else
	{
		//resultPet(CEP)
	}

}

const resultPet = (search) =>{

	searchWrapper.classList.remove('active')
	const filterPets = pet.filter((pets)=>{
		return pets.raca == search || pets.especie == search
	});
	
	listarPet(filterPets);
	searchWrapper.classList.add('active')
	suggBox.innerHTML = `<li>Resultado para: ${search}</li>`;

}

const resultCEP = async (search) =>{
	
		const link = `https://brasilapi.com.br/api/cep/v2/${search}`
		const data = await fetch(link).then(response => response.json()).catch(error => console.log(error))
		return data;
}

const SwitchOption = (value) =>{
	let buttons = document.querySelectorAll('.btn-filter')
	buttons.forEach(btn =>{
		if (value.toLowerCase() == btn.innerText.toLowerCase()) {
			btn.classList.add('btn-active')
			const filterSituation = pet.filter((pets)=>{
				return pets.situacao == value.toLowerCase()
			})
			if (filterSituation.length != 0) {
				listarPet(filterSituation);
			}
			else{
				listarPet(pet);
			}

		}
		else{
			 btn.classList.remove('btn-active')
		}
	})
}





//script para modal
const modalDetails = document.getElementById('details-modal')
const btnDetails = document.getElementById('btn-details')

const detailsPet = (id) => {
	console.log(id)
	const details = pet.filter((p) =>{
		return  p.id == id
	})

	if (details.length != 0 ) {
		PetById(...details)
	}
}
const PetById = async (p) =>{
	let cep = p.endereco;
	const address = await resultCEP(cep);
	console.log(address)
	const contentPet = 
		`
						  <div class="row">
						    <div class="col-6">
						      <img class="pet-img" src="${p.img}">
						    </div>
						    <div class="col-md">
						    	<div class="form-group">
						    		<h6>Nome</h6>
									<div class="input-group mb-3">
										${p.name}
									</div>	
						    	</div>
						      	<div class="form-group">
						    		<h6>Endereço</h6>
									<div class="input-group mb-3">
										 ${address.street}, ${address.neighborhood} ${address.city}
									</div>	
						    	</div>
								
								<h6>Descrição</h6>
								<div class="input-group">
								  	<textarea class="form-control" rows="5" aria-label="With textarea">
								  		${p.descricao}
								  	</textarea>
								</div>
						    </div>
						  </div>
						</div>
						<hr>
						<div class="row">
							<div class="col d-flex justify-content-center">
								<h6>Informações de contato</h6>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<div class="form-group">
						    		<h6>Telefone</h6>
									<div class="input-group mb-3">
										13997147806
									</div>	
						    	</div>
							</div>
							<div class="col">
								<div class="form-group">
						    		<h6>E-mail</h6>
									<div class="input-group mb-3">
										E-mail@gmail.com
									</div>	
						    	</div>
							</div>
						</div>
						<hr>
						<div class="row">
							<div class="col d-flex justify-content-center">
								Mapa
							</div>
						</div>
						<div class="map" id="map" style="width: 100% ;height: 500px;">
							
						</div>
					`


	const container = document.querySelector('.container')
	container.innerHTML = contentPet;

	showMap(address.location.coordinates )
	
}	

const showMap = (coordinates)=>{
	
	let latitude = coordinates.latitude;
	let longitude =  coordinates.longitude;
	const initialCoordinates = [latitude,longitude];

		var map = L.map('map').setView([longitude,latitude], 13);
		
 		L.marker([longitude,latitude]).addTo(map)
							.bindPopup("Ultima vez avistado")
							.openPopup();

}