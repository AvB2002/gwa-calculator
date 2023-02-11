const addBtn = document.querySelector(".add");
const removeBtn = document.querySelector(".remove");
const container = document.querySelector(".container");
const row = document.querySelector(".row");      
const calcBtn = document.querySelector(".calculate");      
const clearBtn = document.querySelector(".clear");   
var counter = 0; 

function removeElement(node){
    node.remove();
}

function cloneElement(node, e) {    
    counter++;
    const clone = node.cloneNode(true);
    clone.setAttribute('id', 'row-' + counter);
    clone.removeAttribute("hidden");
    try {
        let prevChild = e.currentTarget.parentNode.parentNode.parentNode;
        prevChild.parentNode.insertBefore(clone, prevChild.nextSibling);
       
    } 
    catch (error) {container.appendChild(clone);}
    
    document.querySelector("#row-" + counter + " > td:nth-child(1)  input").setAttribute('name', 'subject-' + counter);
    document.querySelector("#row-" + counter + " > td:nth-child(1)  input").setAttribute('type', 'text');

    document.querySelector("#row-" + counter + " > td:nth-child(2) input").setAttribute('name', 'unit-' + counter);
    document.querySelector("#row-" + counter + " > td:nth-child(2) input").setAttribute('type', 'text');

    document.querySelector("#row-" + counter + " > td:nth-child(3) input").setAttribute('name', 'grade-' + counter);
    document.querySelector("#row-" + counter + " > td:nth-child(3) input").setAttribute('type', 'text');

    document.querySelector("#row-" + counter + " > td:nth-child(4) div button:nth-child(1)").setAttribute('id', 'addBtn-' + counter);
    document.querySelector("#row-" + counter + " > td:nth-child(4) div button:nth-child(2)").setAttribute('id', 'removeBtn-' + counter);
    var rowElement = document.querySelectorAll(".container tr");
    if(rowElement.length == 2){
        document.querySelector("#row-" + counter + " > td:nth-child(4) div button:nth-child(2)").setAttribute('hidden', true);
    }

    document.querySelector("#addBtn-" + counter).addEventListener('click', (e) => {
                cloneElement(row, e);         

    });

    document.querySelector("#removeBtn-" + counter).addEventListener('click', (e) => {
            removeElement(e.currentTarget.parentNode.parentNode.parentNode);
    });
}

function calculateGWA(){
    var fgradesum = 0;
    var funitsum = 0;
    var fgrade = [];
    var funit = [];
    const listItems = container.children;
    const listArray = Array.from(listItems);
    let cnt = 0;
    listArray.slice(1).forEach((item) => {
            let listItems = item.children;
            let listArray = Array.from(listItems);
            let grade = 1;
            let unit = 0;
            cnt++;
            listArray.slice(1).reverse().slice(1).forEach((childItem) => {
                let listItems = childItem.children;
                grade *= parseFloat(listItems[0].value);
            });

            listArray.reverse().slice(2).reverse().slice(1).forEach((childItem) => {
                let listItems = childItem.children;
                unit = parseFloat(listItems[0].value);
            });

            if(!isNaN(grade) && !isNaN(unit)){
                fgrade.push(grade);
                funit.push(unit);
            }
    });

    fgrade.forEach((value)=> {
        fgradesum += parseFloat(value);
    });

    funit.forEach((value)=> {
        funitsum += parseFloat(value);
    });

    if(fgradesum !=0 && funitsum!=0){
        const gwa = (Math.round((fgradesum/funitsum) * 100) / 100).toFixed(2);
        document.querySelector(".gwa").innerText = "GWA: " + gwa;
    }
    else{
        document.querySelector(".gwa").innerText = "GWA: 0.00";
    }
}

calcBtn.addEventListener('click', () => {
        calculateGWA();
});

clearBtn.addEventListener('click', (e) => {
    const listItems = container.children;
    const listArray = Array.from(listItems);
    listArray.slice(1).forEach((item) => {
            let listItems = item.children;
            let listArray = Array.from(listItems);
            listArray.reverse().slice(1).reverse().forEach((childItem) => {
                let listItems = childItem.children;
                document.querySelector('input[name="' + listItems[0].name + '"]').value = "";
                document.querySelector(".gwa").innerText = "GWA: 0.00";
            });
    });
});

window.addEventListener('DOMContentLoaded', () => {cloneElement(row);}, false);
