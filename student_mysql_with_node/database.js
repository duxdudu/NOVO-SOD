const {createPool}=require('mysql')
const pool=createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'courses',
    connectionLimit:10
});

pool.query('SELECT * FROM couse',(error,result,field)=>{
            if(error){
                return console.log(error)
            }
            console.log(result);
        }) 


//HOW TO INSERT A RECORD IN MYSQL


pool.query('INSERT INTO couse(first_name,last_name,date_of_birth,enrollment_date) VALUES(?,?,?,?)',['fredu','durant', '2000-10-12','2001-08-12','1'],(error,result,field)=>{
    if(error){
        return console.log(error)
    }
    pool.query('SELECT * FROM couse',(error,result,field)=>{
        if(error){
            return console.log(error)
        }
        console.log(result);
})
})

// //HOW TO UPDATE A RECORD IN MYSQL


pool.query('UPDATE course SET first_name=? WHERE course_id=?',['fredu',3],(error,result,field)=>{
    if(error){
        return console.log(error)
    }
    pool.query('SELECT * FROM course',(error,result,field)=>{
        if(error){
            return console.log(error)
        }
        console.log(result);
})
})

// //HOW TO DELETE A RECORD IN MYSQL
pool.query('DELETE FROM course WHERE course_id=?',[1],(error,result,field)=>{
    if(error){
        return console.log(error)
    }
    pool.query('SELECT * FROM course',(error,result,field)=>{
        if(error){
            return console.log(error)
        }
        console.log(result);
    })
})