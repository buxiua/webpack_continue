module.exports = {
    fun:function(){
        console.log("hello webpack");
        let el = document.createElement("div")
        document.body.appendChild(el);
        return el;
    }
}