import express from 'express'
import bodyParser from 'body-parser'
import authRoutes from './routes/authRoutes'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});

app.use('/auth',authRoutes)

app.listen(4000,()=>{
  console.log('Api gateway running on port 4000')
})