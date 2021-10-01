const enterButton = document.getElementById('enter');
const input = document.getElementById('inputText');
const tableSection = document.getElementById('table-section');
const table = document.getElementById('table');
const tbody = document.getElementById('body-table');
const message = document.getElementById('message');

const URL = "https://gist.githubusercontent.com/jhonatan89/bc554ec3ded15407609714e8b7b8f1c8/raw/5ab1e3e5b45e99aabcbbdd30f55d2ae5eafb9cbe/nba-players";
var altura = 0;

enterButton.addEventListener('click', (event) => {
  //Implementar lógica del button submit
  altura = input.value;
  console.log(altura);
  readData(show);
  event.preventDefault();
});

/**
 * Llamado al backend con queryParam
 * @param {*} heightRef
 */
async function getresults(heightRef) {
  const resp = await fetch(`api?input=${heightRef}`);
  const data = await resp.json();
  console.log('data from back', data);
  //printValues(data);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//conexion para obtener los datos en un json
function readData(callback) {
  fetch(URL)
  .then((res) => res.json())
  .then((data) => callback(data))
}


function show(data) {
  var i = 0;
  var infor = data["values"]
  for(const elem in infor){
    for(const comp in infor){
      if(elem <comp ){
        var a = parseInt(infor[elem]["h_in"])+parseInt(infor[comp]["h_in"]);
        if(a==parseInt(altura)){
          i++;
          addData(i,infor[elem],infor[comp]);
        }
      }
    }
  } 
}
function addData(posicion, j1,j2){

  const row = document.createElement('tr');
  const t = getRowtemp(j1,j2,posicion);
  row.innerHTML = t;
  tbody.appendChild(row);
}

const getRowtemp = (j1,j2,i) =>{
  return `
    <th scope="row">${i}</th>
    <td>${j1["first_name"] + " " +j1["last_name"]}</td>
    <td>${j2["first_name"]+ " " +j2["last_name"]}</td>
    </td>
    `;
}

//readData(show);
