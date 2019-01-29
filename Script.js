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


leftArr.onclick = () => {
	leftDisplay.style.display = 'none';
	centerWidth += 20;
	centerDisplay.style.width = centerWidth + '%';

	leftArrOpen.style.display = 'inline';
}

leftArrOpen.onclick = () => {	//Восстановление левой панельки
	leftDisplay.style.display = 'block';
	centerWidth -= 20;
	centerDisplay.style.width = centerWidth + '%';

	leftArrOpen.style.display = 'none';
}


rightArr.onclick = () => {
	rightDisplay.style.display = 'none';
	centerWidth += 20;
	centerDisplay.style.width = centerWidth + '%';

	rightArrOpen.style.display = 'inline';
}

rightArrOpen.onclick = () => {	//Восстановление правой панельки
	rightDisplay.style.display = 'block';
	centerWidth -= 20;
	centerDisplay.style.width = centerWidth + '%';

	rightArrOpen.style.display = 'none';
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
				arr.splice(i,1);
				render(arrPoint);
			}

			

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

		let stepX = 50; //Шаг на графике по X
		for(let i=0; i<arrPoint.length-1; i++){
			svg.append("line")
    			.attr("x1", i*stepX)
    			.attr("y1", heightDisp -linea(arrPoint[i]))
    			.attr("x2", (i+1) *stepX)
    			.attr("y2", heightDisp -linea(arrPoint[i+1]));

    		svg.append("text")
    			.attr("x", i*stepX)
    			.attr("y", heightDisp -linea(arrPoint[i]))
    			.style("font-size", "11px")
    			.text(arrPoint[i]);	
		}

		svg.append("text")
    		.attr("x", (arrPoint.length-1)*stepX)
    		.attr("y", heightDisp -linea(arrPoint[arrPoint.length-1]))
    		.style("font-size", "11px")
    		.text(arrPoint[arrPoint.length-1]);
}

let heightDisp = graphDispl.offsetHeight;
let svg = d3.select("#graph").append("svg");
     
svg.attr("height", heightDisp)
    .attr("width", graphDispl.offsetWidth);


   
