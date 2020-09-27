let plannerItems = [];

//if planner is saved retrieve it
if (localStorage.getItem('plannerItems') != null)
{
    plannerItems = JSON.parse(localStorage.getItem('plannerItems'));
    for (let x in plannerItems)
    {
        newElement(plannerItems[x])
    }
}
//add check symbol when item clicked
var list = document.querySelector('ul');
list.addEventListener('click', function(e)
{
    if (e.target.tagName === 'LI')
    {
        e.target.classList.toggle('checked');
        let item = plannerItems.find(plannerItem => plannerItem.id == e.target.id);
        console.log(e.target.id);
        if (item.checked == true) item.checked = false;
        else if (item.checked == false) item.checked = true;
        localStorage.setItem('plannerItems', JSON.stringify(plannerItems));
    }
}, false);

//add list item to page
function newElement(elementID) {
    var li = document.createElement("li");
    if (plannerItems.length == 0) var index = 0;
    else if (elementID == null) var index = plannerItems.length;
    else index = elementID.id;
    if (elementID == null)
    {
        //if this is called from add button
        li.id = index;
        var inputValue = document.getElementById('myInput').value;
        if (inputValue === '') return alert('You must select something!');
        plannerItems.push({'id': index, 'value': inputValue, 'checked': false});
        localStorage.setItem('plannerItems', JSON.stringify(plannerItems));
    }
    else
    {
        //if this is called from page loading
        li.id = plannerItems.indexOf(elementID);
        var inputValue = elementID.value;
        var inputChecked = elementID.checked;
    }
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') alert('You must select something!');
    else document.getElementById('list').appendChild(li);
    document.getElementById('myInput').value = "";

    var uparrow = document.createElement('img');
    uparrow.className = 'up-arrow arrow';
    uparrow.src = 'assets/images/arrow.png';
    uparrow.addEventListener('click', (e) => {
        var id = e.target.parentElement.id;
        if (id == 0) return;
        array_move(plannerItems, id, id - 1);
        id += 1;
        localStorage.setItem('plannerItems', JSON.stringify(plannerItems));
        location.reload();
    });
    //create up and down arrows for changing order
    li.appendChild(uparrow);
    var downarrow = document.createElement('img');
    downarrow.className = 'down-arrow arrow';
    downarrow.src = 'assets/images/arrow.png';
    downarrow.addEventListener('click', (e) => {
        var id = e.target.parentElement.id;
        if (id == plannerItems.length - 1) return;
        array_move(plannerItems, id, id + 1);
        id += 1;
        localStorage.setItem('plannerItems', JSON.stringify(plannerItems));
        location.reload();
    });
    li.appendChild(downarrow);
    //create close button
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.onclick = (e) => {
        plannerItems.splice(e.target.id);
        localStorage.setItem('plannerItems', JSON.stringify(plannerItems));
        var div = e.target.parentElement;
        div.style.display = "none";
    }
    span.appendChild(txt);
    li.appendChild(span);
    //mark as checked if checked from last time (only used if this is being created on a load)
    if (elementID != null && inputChecked == true)
    {
        li.classList.toggle('checked');
    }
}

//Move index of items in array
function array_move(arr, old_index, new_index) {
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
}