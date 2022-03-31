const express = require ('express')
const path = require ('path' )
const cors = require  ('cors')
const axios = require ('axios')
const app = express();

const port = 3030
app.use(cors())

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname,'/view'));
//consumindo a api
app.get(`/pet`, async (req,res)=>{
	try{
		const {data} = await axios('https://lookao-api.herokuapp.com/pet')
		return res.json(data);
	}catch(err)
	{
		console.error(err)
	}
})
app.get('/raca', async (req,res) =>{
	try{
		const {data} = await axios('https://lookao-api.herokuapp.com/raca')
		return res.json(data);
	}catch(err)
	{
		console.error(err)
	}
})

app.get('/', (req,res)=>{
	res.render('index')
})
app.get('/search', (req,res) =>{
	res.render('search')
})

app.post('/',(req,res)=>{
	res.render('index')
})
app.listen(port,() => {
	console.log(`server listen on http://localhost:${port}`);
})

