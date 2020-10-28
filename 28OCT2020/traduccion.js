function traducir() 
{
    var entrada = document.getElementById('entrada');

    var data = {entrada:entrada.value}
    const Http = new XMLHttpRequest();
    Http.open("POST",`http://localhost:3000/jison`, true);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(data));
    Http.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200)
        {
            var data = JSON.parse(Http.responseText);
            document.getElementById('salida').innerHTML = data.traduccion;
            console.log(data.arbol)
        }
    }
}