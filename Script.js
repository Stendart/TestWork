let leftArr = document.getElementById('leftArr');
let leftDisplay = document.getElementsByClassName('left')[0]; //первый элемент с классом left
let centerDisplay = document.getElementsByClassName('center')[0];
let rightArr = document.getElementById('rightArr');
let rightDisplay = document.getElementsByClassName('right')[0]; //первый элемент с классом left
let graphDispl = document.getElementById('graph');

let leftArrOpen = document.getElementById('leftArrOpen');	//стрелки восстановления боковых панелей
let rightArrOpen = document.getElementById('rightArrOpen');

let centerWidth = 60; //ширина центрального блока по умолчанию

let dataInput = document.getElementById('dataInput');
let collectGrapgsData = [];

let heightDisp;

leftArr.onclick = () => {
	leftDisplay.style.display = 'none';
	centerWidth += 20;
	centerDisplay.style.width = centerWidth + '%';

	leftArrOpen.style.display = 'inline';

resizeSVG();
}

leftArrOpen.onclick = () => {	//Восстановление левой панельки
	leftDisplay.style.display = 'block';
	centerWidth -= 20;
	centerDisplay.style.width = centerWidth + '%';

	leftArrOpen.style.display = 'none';

resizeSVG();
}


rightArr.onclick = () => {
	rightDisplay.style.display = 'none';
	centerWidth += 20;
	centerDisplay.style.width = centerWidth + '%';

	rightArrOpen.style.display = 'inline';

resizeSVG();
}

rightArrOpen.onclick = () => {	//Восстановление правой панельки
	rightDisplay.style.display = 'block';
	centerWidth -= 20;
	centerDisplay.style.width = centerWidth + '%';

	rightArrOpen.style.display = 'none';

resizeSVG();
}


document.onkeydown = (key) => {		
	if(document.activeElement.id == dataInput.id && key.keyCode == 13){		//Если при нажатии Enter активен input ввода, то читаем значение
		

		let newValue = {};	//Объект, что бы хранить рядом и текстовое поле и кнопку Remove
		newValue.val = document.createElement('div');
		newValue.val.innerHTML =  ' ' + dataInput.value;
		newValue.val.className = 'infoInput';

		newValue.but = document.createElement('button'); //Кнопка Remove
		newValue.but.className = 'removeBut';
		newValue.but.innerHTML = 'Remove';

		newValue.val.appendChild(newValue.but)

		document.getElementById('valueList').appendChild(newValue.val);
		collectGrapgsData.push(newValue);



		let arrPoint = [];		//Новый массив, в котором будет храниться только числовое значение

		collectGrapgsData.forEach((item, i, arr) => {

			arrPoint[i] = parseFloat(item.val.innerHTML);	//парсю, что бы отбросить текстовую часть

			item.but.onclick = (e) =>{

				e.path[1].remove();
				render(arrPoint);
			}

			console.log(arr);

		});

		render(arrPoint);
		}
	}		


function render(arrPoint){	//Отрисовка графика
	let rang = d3.extent(arrPoint);
		let linea = d3.scaleLinear()	//Разбиваем на нужный отрезак
			.domain([rang[0], rang[1]])
			.range([100, 500]);

		d3.select("#graph").select("svg").selectAll('*').remove();	//Очищаем SVG элемент


let selectInfo = d3.selectAll('div.infoInput'); //ловим все div со значениями

let stepX = 50;
for(let i=0; i<selectInfo._groups[0].length-1; i++){

	let startLine = parseFloat(selectInfo._groups[0][i].innerHTML); //точка начала линии
	let endLine = parseFloat(selectInfo._groups[0][i+1].innerHTML);	//точка конца линии

			svg.append("line")
    			.attr("x1", i*stepX)
    			.attr("y1", heightDisp -linea(startLine))
    			.attr("x2", (i+1) *stepX)
    			.attr("y2", heightDisp -linea(endLine));

    		svg.append("text")
    			.attr("x", i*stepX)
    			.attr("y", heightDisp -linea(startLine))
    			.style("font-size", "11px")
    			.text(startLine);
		}

		let endLine = parseFloat(selectInfo._groups[0][selectInfo._groups[0].length-1].innerHTML); //последняя точка графика (для подписи)

		svg.append("text")
    		.attr("x", (parseFloat(selectInfo._groups[0].length-1))*stepX)
    		.attr("y", heightDisp -linea(endLine))
    		.style("font-size", "11px")
    		.text(endLine);
}

heightDisp = graphDispl.offsetHeight;
let svg = d3.select("#graph").append("svg");
     
svg.attr("height", heightDisp)
    .attr("width", graphDispl.offsetWidth);


console.log(graphDispl);
/*window.onresize = () =>{
	console.log(graphDispl);
}*/

function resizeSVG() {
	heightDisp = graphDispl.offsetHeight;
	svg.attr("height", heightDisp)
    .attr("width", graphDispl.offsetWidth);

    console.log(graphDispl);
}