//This is the basic syntax for the wrapAsync function
// function wrapAsync(fn){
//     return function(req,res,next){
// fn(req,res,next).catch(next);
//     }
// }

module.exports = (fn)=> {
    return (req,res,next)=>{
fn(req,res,next).catch(next);
    }
}