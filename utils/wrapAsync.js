// function wrapAsync(fn){
//     return function(req,res,next){
//         fn(req,res,next).catch(next);
//     }
// }
//We can write above code in a better way as follows.
module.exports = (fn) =>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    }
}