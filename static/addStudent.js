var v=new Validacija(document.getElementById("dodavanje"));

function validate() {
    var ime=document.getElementsByName("ime")[0];
    var index=document.getElementsByName("index")[0];
    v.ime(ime);
    v.index(index);
}