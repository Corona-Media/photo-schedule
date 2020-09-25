let plannerItems = [];

if (localStorage.getItem('plannerItems') != null)
{
    plannerItems = JSON.parse(localStorage.getItem('plannerItems'));
    for (let x in plannerItems)
    {
        newElement(plannerItems[x])
    }
}
// Create Check Symbol
var list = document.querySelector('ul');
list.addEventListener('click', function(e)
{
    if (e.target.tagName === 'LI')
    {
        e.target.classList.toggle('checked');
        let item = plannerItems.find(plannerItem => plannerItem.value === e.target.innerText.substring(0, e.target.innerText.length - 1));
        if (item.checked == true) item.checked = false;
        else if (item.checked == false) item.checked = true;
        localStorage.setItem('plannerItems', JSON.stringify(plannerItems));
    }
}, false);

// Create Item When Add Button Clicked
function newElement(elementID) {
    var li = document.createElement("li");
    if (elementID == null)
    {
        var inputValue = document.getElementById("myInput").value;
        if (inputValue === '') return alert("You must select something!");
        plannerItems.push({"value": inputValue, "checked": false});
        localStorage.setItem('plannerItems', JSON.stringify(plannerItems));
    }
    else
    {
        var inputValue = elementID.value;
        var inputChecked = elementID.checked;
    }
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') alert("You must select something!");
    else document.getElementById("list").appendChild(li);
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.onclick = (e) => {
        plannerItems.splice(plannerItems.indexOf(e.target.innerText));
        localStorage.setItem('plannerItems', JSON.stringify(plannerItems));
        var div = e.target.parentElement;
        div.style.display = "none";
    }
    span.appendChild(txt);
    li.appendChild(span);
    if (elementID != null && inputChecked == true)
    {
        li.classList.toggle('checked');
    }
}