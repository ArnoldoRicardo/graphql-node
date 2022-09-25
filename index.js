require('dotenv').config()

require('@babel/register')({
  extensions: ['.js', '.ts']
})

require('./src/app.ts')
