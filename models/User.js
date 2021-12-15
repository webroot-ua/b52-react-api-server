const Firebird = require('firebird')

const user = {}

// router.get('/api/auth/login', function(req, res) {
//   console.log(`>Getting => ${HOST}:${PORT}/api/auth/login`)

//   firequary = "select kod, name from spr_sotr"
//   let conn = fb.createConnection()

//   conn.connect(firecfg.db, firecfg.user, firecfg.password, firecfg.role, function(){
//     // console.log(">runing /api/podr")

//     conn.query(firequary, function(err, qres){
//         if(err){ 
//             console.log("error")
//             console.log(err)
//             return
//         }
//         var podr = qres.fetchSync("all",true)
//         res.send(podr)
//         console.log(podr)
//         conn.disconnect()
//       })
//     })
// })

module.exports = user

// const User = () => {
//   const save = (id) =>{
//     console.log('Save User ID: ', id)
//   }

//   const findOne = (id) =>{
//     console.log('Finde User ID: ', id)
//   }

// }

// module.exports = User


// export const User = () => {
//   const save = (id) =>{
//     console.log('Save User ID: ', id)
//   }
//   const findOne = (id) =>{
//     console.log('Finde User ID: ', id)
//   }
// }