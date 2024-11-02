
let myPageSlider = new Swiper('.page-slider', {
	//* Буллеты, текущее положение, прогрессвар
	pagination: {
		el: '.swiper-pagination',
		// *@ Буллеты
		//*@ (включает переключение слайдов, при клике на точки)
		clickable: true,
		// //* Кастомные буллеты(в точках появляются порядковые номера слайдов)
		// renderBullet: function (index, className) {
		// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// }, 
	},
	//*@ Включение/отключение перетаскивания на ПК
	//* по умолчанию включено
	//simulateTouch: true,
	simulateTouch: false,
	//* Чувствительность свайпа от 0 до 1, где 0 полный игнор перетаскивания
	touchRatio: 1,
	//* Угол срабатывания свайпа/перетаскивания
	touchAngle: 45,
	//* Курсор перетаскивания в виде руки, при true
	grabCursor: true,
	//grabCursor: false,
	//*@ Управление клавиатурой
	keyboard: {
		//* Включить\выключить переключение стрелками, на клавиатуре
		enabled: true,
		//enabled: false,
		//* Включить\выключить переключение только когда слайдер, в пределах вьюпорта(окна браузера)
		//onlyInViewport: true,
		onlyInViewport: false,
		//* Включить\выключить управление клавишами pageUp, pageDown
		pageUpDown: true,
	},

	//*@ Управление колесом мыши
	mousewheel: {
		//* Чувствительность колеса мыши
		sensitivy: 1,
		//* Класс объекта на котором будет срабатывать прокрутка мышью (как ни странно работает и без него)
		//eventsTarget: ".page-slider"
	},
	//*@ Количество пролистываемых слайдов
	slidesPerGroup: 1,
	//*@Вертикальный слайдер
	//* Для адекватной работы необходимо прописать высоту слайдера .image-slider. Но всё равно изображения залазят друг на друга, как то коряво работает!Если же прописать и высоту для изображений в слайдах .image-slider__image img, то работает нормы
	direction: 'vertical',
});

let pagePagination = document.querySelector('.page-pagination');








let bulletsPage = document.querySelectorAll('.page-pagination span');
let pageLeftPanel = document.querySelector('.page-left-panel');
let headerLine = document.querySelector('.header-line-cnt');
let pageHeader = document.querySelector('.page-header');
let formMessage = document.querySelector('.form-message');


//функция отключающая некоторые блоки если ширина меньше, либо равна 768 и при этом включается не первый слайд
const pageIndex = function () {
	if (document.documentElement.clientWidth <= 768) {
		//*Если индекс слайда = 0, то отключается класс, дающий display:none;
		if (myPageSlider.realIndex == 0) {
			pageLeftPanel.classList.remove('no-display');
			headerLine.classList.remove('no-display');
			pageHeader.classList.remove('no-display');
			//* иначе,если слайд не первый, врубаестя класс display:none;(но это,если ширина окна браузера <= 768)
		} else {
			pageLeftPanel.classList.add('no-display');
			headerLine.classList.add('no-display');
			pageHeader.classList.add('no-display');
		}
		//* а сие условие говорит, что при ширине > 768, даже если был класс с display:none;, например при повороте телефона, то он пропадёт
	} else {
		pageLeftPanel.classList.remove('no-display');
		headerLine.classList.remove('no-display');
		pageHeader.classList.remove('no-display');
	}
};
//*Отключение формы с обсуждением проекта на 3ем слайде, и включение обратно на остальных
const formMes = function () {

	if (myPageSlider.realIndex !== 2) {
		formMessage.classList.remove('no-display');
	} else if (myPageSlider.realIndex == 2) {
		formMessage.classList.add('no-display');
	}
}
formMes();

myPageSlider.on('slideChange', function () {
	page4Hoverfun();
	pageIndex();
	formMes();
	//* Если активен один из первых трёх буллетов, то полоска, с буллетами, скроллится вверх, так чтобы было видно только первые 5 буллетов, если нет, то полоска скроллится вниз на 40px, так чтобы было видно буллеты со 2го по 6ой
	if (myPageSlider.realIndex == 0 || myPageSlider.realIndex == 1 || myPageSlider.realIndex == 2) {
		pagePagination.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		})
	} else {
		pagePagination.scrollTo({
			top: 40,
			left: 0,
			behavior: "smooth",
		})
	}
	document.querySelectorAll('.page6-card').forEach(element => {
		element.classList.remove('click');
		element.classList.remove('hover');
	});
});

































































































let page3Cnt = document.querySelector('.page3-cnt');
let page3title = document.querySelectorAll('.page3-title');


























//* Если навести курсор на .page3-title, родителю, с классом .page3-0, присваивается класс hover-page3.
page3Cnt.addEventListener("mouseover", function (event) {
	let target1 = event.target.closest('.page3-titlle-wrapper');
	// переход не на <span> - игнорировать
	if (!target1) return;
	target1.parentElement.closest('.page3-0').classList.add('hover-page3');
});

//* Если увести курсор с .page3-0 на другой такой же блок, то класс hover-page3 c него снимается. А если блок на который уходит курсор не имеет класса page3-0, то ничего не происходит!!!
page3Cnt.addEventListener("mouseover", function (event) {

	let target2 = event.target.closest('.page3-0');
	if (!target2.classList.contains('hover-page3')) {
		document.querySelectorAll('.page3-0').forEach(element => {
			element.classList.remove('hover-page3');
		});
	}
});


page3Cnt.addEventListener('click', function (event) {

	let target1 = event.target.closest('.page3-titlle-wrapper');
	let target2 = event.target.closest('.page3-0');

	if (target1) {
		if (!target1.parentElement.closest('.page3-0').classList.contains('page3-click')) {
			document.querySelectorAll('.page3-0').forEach(element => {
				element.classList.remove('hover-page3');
			});
			document.querySelectorAll('.page3-0').forEach(element => {
				element.classList.remove('page3-click');
			});
		}

		if (document.documentElement.clientWidth > 768) {
			target2.classList.add('page3-click');
			target2.classList.add('hover-page3');
		} else if (document.documentElement.clientWidth <= 768) {
			target2.classList.toggle('page3-click');
			target2.classList.toggle('hover-page3');
		}


	} else if (target2) {
		if (!target2.classList.contains('page3-click')) {
			document.querySelectorAll('.page3-0').forEach(element => {
				element.classList.remove('hover-page3');
			});
			document.querySelectorAll('.page3-0').forEach(element => {
				element.classList.remove('page3-click');
			});
		}


	} else {
		return;
	}
});

















































































let page4ServiceAfter = document.querySelector('.page4-cnt-after .page4-service-line');

let page4Service = document.querySelector('.page4-service-line');
let page4Title1 = document.querySelector('.ellipse1 .text');
let page4Title2 = document.querySelector('.ellipse2 .text');
let page4Title3 = document.querySelector('.ellipse3 .text');
let hoverMess = document.querySelectorAll('.hover-mess');
let page4HoverMessElite = document.querySelector('.page4-hover-mess-elite');
let page4HoverMessVip = document.querySelector('.page4-hover-mess-vip');
let page4HoverMessExtra = document.querySelector('.page4-hover-mess-extra');

let page6Strim = document.querySelector('.page6-strim');
let page6Video = document.querySelector('.page6-video');
let page6Furniture = document.querySelector('.page6-furniture');
let page6Appliances = document.querySelector('.page6-appliances');
let page6Service = document.querySelector('.page6-service');
let page6HoverMessStrim = document.querySelector('.page6-hover-mess-strim');
let page6HoverMessVideo = document.querySelector('.page6-hover-mess-video');
let page6HoverMessFurniture = document.querySelector('.page6-hover-mess-furniture');
let page6HoverMessAppliances = document.querySelector('.page6-hover-mess-appliances');
let page6HoverMessService = document.querySelector('.page6-hover-mess-service');




//* Если навести курсор на .text, родителю, с классом .ellipse0, присваивается класс hover-service-page4.
page4Service.addEventListener("mouseover", function (event) {
	let target1 = event.target.closest('.text');
	// переход не на <span> - игнорировать
	if (!target1) return;
	target1.parentElement.closest('.ellipse0').classList.add('hover-service-page4');
	target1.parentElement.closest('.ellipse0').previousElementSibling.classList.add('hover-service-page4');
	page4Hoverfun();
});

page4ServiceAfter.addEventListener("mouseover", function (event) {
	let target1 = event.target.closest('.text');
	// переход не на <span> - игнорировать
	if (!target1) return;
	target1.parentElement.closest('.ellipse0').classList.add('hover-service-page4');
	target1.parentElement.closest('.ellipse0').previousElementSibling.classList.add('hover-service-page4');
	page4Hoverfun();
});




//* Если увести курсор с .text на другой блок, то класс hover-service-page4 c него снимается.
page4Service.addEventListener("mouseout", function (event) {
	if (!event.target.closest('.text')) return;

	let target2 = event.target.closest('.text');
	if (!target2.classList.contains('hover-service-page4')) {


		document.querySelectorAll('.ellipse0').forEach(element => {
			element.classList.remove('hover-service-page4');
			element.previousElementSibling.classList.remove('hover-service-page4');

		});
	}
	hoverMess.forEach(element => {
		element.classList.remove('active');
	});
});

page4ServiceAfter.addEventListener("mouseout", function (event) {
	if (!event.target.closest('.text')) return;

	let target2 = event.target.closest('.text');
	if (!target2.classList.contains('hover-service-page4')) {


		document.querySelectorAll('.ellipse0').forEach(element => {
			element.classList.remove('hover-service-page4');
			element.previousElementSibling.classList.remove('hover-service-page4');

		});
	}
	hoverMess.forEach(element => {
		element.classList.remove('active');
	});
});



let page4Hoverfun = function () {
	hoverMess.forEach(element => {
		element.classList.remove('active');
	});
	if (myPageSlider.realIndex == 3) {

		if (event.target == page4Title1) {
			page4HoverMessElite.classList.add('active');
		} else if (event.target == page4Title2) {
			page4HoverMessVip.classList.add('active');
		} else if (event.target == page4Title3) {
			page4HoverMessExtra.classList.add('active');
		}
	} else if (myPageSlider.realIndex == 5) {


		if (event.target.closest('.page6-card') == page6Strim) {
			page6HoverMessStrim.classList.add('active');
		} else if (event.target.closest('.page6-card') == page6Video) {
			page6HoverMessVideo.classList.add('active');
		} else if (event.target.closest('.page6-card') == page6Furniture) {
			page6HoverMessFurniture.classList.add('active');
		} else if (event.target.closest('.page6-card') == page6Appliances) {
			page6HoverMessAppliances.classList.add('active');
		} else if (event.target.closest('.page6-card') == page6Service) {
			page6HoverMessService.classList.add('active');
		} else {
			hoverMess.forEach(element => {
				element.classList.remove('active');
			});
		}

	} else {
		hoverMess.forEach(element => {
			element.classList.remove('active');
		});
	}
};





//* разбивание чисел на разряды: делает из 1234567 - 1 234 567
function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

}


let page4Form = document.forms.page4Form;
let page4Input = page4Form.page4__input__name;
const page4InputPlaceholder = page4Input.placeholder;

let page4Form2 = document.forms.page4Form2;
let page4Input2 = page4Form2.page4__input__name;
const page4InputPlaceholder2 = page4Input2.placeholder;





//* Удаление плейсхолдера при фокусе
page4Input.addEventListener('focus', function (event) {
	page4Input.placeholder = '';
	page4Input2.placeholder = '';
});
page4Input2.addEventListener('focus', function (event) {
	page4Input.placeholder = '';
	page4Input2.placeholder = '';
});


const blurFirst = function () {

	page4Input.placeholder = 0;
	page4Input2.placeholder = 0;
	let value1 = page4Input.value;
	value1 = value1.replace(/, /g, '.');
	let value2 = page4Input2.value;
	value2 = value2.replace(/, /g, '.');

	if (page4Input.value.length == 0) {
		page4CalcPlaceholder();
		page4rezult.innerHTML = `${0}`;
	}
	if (page4Input2.value.length == 0) {
		page4CalcPlaceholder();
		page4rezult2.innerHTML = `${0}`;
	}
	lineEllpsePage4();
};


//* Восстановление плейсхолдера, при переходе фокуса на другой объект
page4Input.addEventListener('blur', blurFirst);
page4Input2.addEventListener('blur', blurFirst);
let page4rezult = document.querySelector('.page4-money .number');
let page4rezult2 = document.querySelector('.page4-cnt-after .page4-money .number');

let page4rezultValue;
let page4rezultValue2;




let page4CalcPlaceholder = function () {

	if (document.querySelector('.ellipse1').classList.contains('click-service-page4')) {
		page4rezultValue = 466000;
	} else if (document.querySelector('.ellipse2').classList.contains('click-service-page4')) {
		page4rezultValue = 466000 * 2;
	} else if (document.querySelector('.ellipse3').classList.contains('click-service-page4')) {
		page4rezultValue = 466000 * 4;
	}

	if (document.querySelector('.page4-cnt-after .ellipse1').classList.contains('click-service-page4')) {
		page4rezultValue2 = 466000;
	} else if (document.querySelector('.page4-cnt-after .ellipse2').classList.contains('click-service-page4')) {
		page4rezultValue2 = 466000 * 2;
	} else if (document.querySelector('.page4-cnt-after .ellipse3').classList.contains('click-service-page4')) {
		page4rezultValue2 = 466000 * 4;
	}
};
page4CalcPlaceholder();



const blurBackspace = function () {
	if (page4Input.value == 0) {
		page4Input.value = '0';
		page4Input.placeholder = '0';
		page4rezult.innerHTML = `0`;
	}
	if (page4Input2.value == 0) {
		page4Input2.value = '0';
		page4Input2.placeholder = '0';
		page4rezult2.innerHTML = `0`;
	}
};


let calculationPage4 = function () {
	let page4rezultSelf;
	let page4rezultSelf2;

	if (page4Input.value.length > 4) {
		page4Input.style.fontSize = "48px";
	} else {
		page4Input.style.fontSize = "64px";
	}
	if (page4Input2.value.length > 4) {
		page4Input2.style.fontSize = "48px";
	} else {
		page4Input2.style.fontSize = "64px";
	}

	let value1 = page4Input.value;
	value1 = value1.replace(/, /g, '.');
	let calculation;
	let value2 = page4Input2.value;
	value2 = value2.replace(/, /g, '.');
	let calculation2;




	if (document.querySelector('.ellipse1').classList.contains('click-service-page4')) {
		calculation = Math.ceil(value1 * 7281.25);


		document.querySelector('.page4-cnt-after .ellipse1').classList.add('click-service-page4');
		document.querySelector('.page4-cnt-after .line1').classList.add('click-service-page4');


	} else if (document.querySelector('.ellipse2').classList.contains('click-service-page4')) {
		calculation = Math.ceil(value1 * 7281.25 * 2);


		document.querySelector('.page4-cnt-after .ellipse2').classList.add('click-service-page4');
		document.querySelector('.page4-cnt-after .line2').classList.add('click-service-page4');


	} else if (document.querySelector('.ellipse3').classList.contains('click-service-page4')) {
		calculation = Math.ceil(value1 * 7281.25 * 4);


		document.querySelector('.page4-cnt-after .ellipse3').classList.add('click-service-page4');
		document.querySelector('.page4-cnt-after .line3').classList.add('click-service-page4');


	} else {
		calculation = 0;
	}


	if (document.querySelector('.page4-cnt-after .ellipse1').classList.contains('click-service-page4')) {
		calculation2 = Math.ceil(value2 * 7281.25);


		document.querySelector('.ellipse1').classList.add('click-service-page4');
		document.querySelector('.line1').classList.add('click-service-page4');


	} else if (document.querySelector('.page4-cnt-after .ellipse2').classList.contains('click-service-page4')) {
		calculation2 = Math.ceil(value2 * 7281.25 * 2);


		document.querySelector('.ellipse2').classList.add('click-service-page4');
		document.querySelector('.line2').classList.add('click-service-page4');


	} else if (document.querySelector('.page4-cnt-after .ellipse3').classList.contains('click-service-page4')) {
		calculation2 = Math.ceil(value2 * 7281.25 * 4);


		document.querySelector('.ellipse3').classList.add('click-service-page4');
		document.querySelector('.line3').classList.add('click-service-page4');


	} else {
		calculation2 = 0;
	}

	page4rezult.innerHTML = `${numberWithSpaces(calculation)}`;

	//page4rezultValue = `${numberWithSpaces(calculation)}`;
	page4rezult2.innerHTML = `${numberWithSpaces(calculation2)}`;
	// page4rezultValue2 = `${numberWithSpaces(calculation2)}`;


	if (page4rezult.innerHTML.length > 9) {
		page4rezult.style.fontSize = "48px";
	} else {
		page4rezult.style.fontSize = "64px";
	}
	if (page4rezult2.innerHTML.length > 9) {
		page4rezult2.style.fontSize = "48px";
	} else {
		page4rezult2.style.fontSize = "64px";
	}

	document.body.addEventListener('keydown', function (event) {
		console.log(event.key);
		if (event.key === "Backspace") {
			page4Input.addEventListener('blur', blurBackspace);
			page4Input2.addEventListener('blur', blurBackspace);
		}
	});
};

let page4EllipseSvg = document.querySelector('.yardage svg');
let page4movingPoint = document.querySelector('.page4-ellipse-point2');
let page4EllipseSvg2 = document.querySelector('.page4-cnt-after .yardage svg');
let page4movingPoint2 = document.querySelector('.page4-cnt-after .page4-ellipse-point2');

//* Функция для рисования линии на окружности в зависимости от площади написанной внутри
const lineEllpsePage4 = function () {
	//document.querySelector('.page4-servise-text').innerHTML = `${page4movingPoint.style.transform}2321`; //*@!!!!!!!!!!!!!!!!

	valueInEllipse = page4Input.value;
	valueInEllipse2 = page4Input2.value;

	let arcLength = valueInEllipse * 2.15625;
	if (arcLength > 738) {
		arcLength = 738;
	} else if (arcLength < 0) {
		arcLength = 0;
	}
	let arcLength2 = valueInEllipse2 * 2.15625;
	if (arcLength2 > 738) {
		arcLength2 = 738;
	} else if (arcLength2 < 0) {
		arcLength2 = 0;
	}

	page4EllipseSvg.style.strokeDashoffset = `${738 - arcLength}`;
	page4movingPoint.style.transform = `rotate(${arcLength * 0.4878}deg) translate(-50%, -50%)`;
	page4EllipseSvg2.style.strokeDashoffset = `${738 - arcLength2}`;
	page4movingPoint2.style.transform = `rotate(${arcLength2 * 0.4878}deg) translate(-50%, -50%)`;
};

page4Input.addEventListener('input', function () {
	page4Input.removeEventListener('blur', blurFirst);
	page4Input.removeEventListener('blur', blurBackspace);
	page4Input.placeholder = '';
	lineEllpsePage4();
	calculationPage4();
	page4Input2.value = page4Input.value
	page4rezult2.innerHTML = page4rezult.innerHTML;
});
page4Input2.addEventListener('input', function () {
	page4Input2.removeEventListener('blur', blurFirst);
	page4Input2.removeEventListener('blur', blurBackspace);
	page4Input2.placeholder = '';
	lineEllpsePage4();
	calculationPage4();
	page4Input.value = page4Input2.value
	page4rezult.innerHTML = page4rezult2.innerHTML;
});





























































































let page5EllipseSteps = document.querySelector('.page5-steps');
let page5EllipsePoint = document.querySelectorAll('.page5-ellipse-point');




let page5IndexEllipse = 3;




//* При клике на .page5-ellipse-point, если у других блоков с таки же классом есть класс .page5-ellipse-click, то этот класс удаляется у всех таких блоков (даже у того, по которому кликнули), а если нет то на этом функция останавливается. Так как класс всегда есть на одном из блоков, это значит что кликают именно по нему и действий не требуется(нужно чтобы браузер в консоли не матерился!!!) 
//* Потом к кликнутому блоку добавляется всё тот-же page5-ellipse-click
//* Если клик в области Эллипса попадает ни на page5-ellipse-point, то индекс = индекс+1 (то есть значение page5IndexEllipse увеличивается на 1)
//* далее сохраняем блок с классами .page5-ellipse-point и .page5-ellipse-click за переменной и грохаем класс page5-ellipse-click со всех блоков, в том числе и с того, который закреплён за переменной.
//* К следующему блоку, за той самой переменной добавляем класс .page5-ellipse-click
//* Если индекс повышается больше 6, то индекс приравнивается к еденице, а класс .page5-ellipse-click добавляется к самому первому блоку page5-ellipse-point

page5EllipseSteps.addEventListener("click", function (event) {
	if (event.target.closest('.page5-ellipse-point')) {
		let target1 = event.target.closest('.page5-ellipse-point');
		if (!target1.classList.contains('page5-ellipse-click')) {
			page5EllipsePoint.forEach(element => {
				element.classList.remove('page5-ellipse-click');
			});
		} else { return; }
		target1.classList.add('page5-ellipse-click');
	} else {
		page5IndexEllipse = page5IndexEllipse + 1;
		let page5PointActive = document.querySelector('.page5-ellipse-point.page5-ellipse-click');

		page5EllipsePoint.forEach(element => {
			element.classList.remove('page5-ellipse-click');
		});
		page5PointActive.nextElementSibling.classList.add('page5-ellipse-click');
		if (page5IndexEllipse > 6) {
			page5IndexEllipse = 1;
			page5EllipsePoint[0].classList.add('page5-ellipse-click');
		}
	}
	page5IndexDefinition();
	page5IndexAction();
});



let page5IndexDefinition = function () {
	if (page5EllipsePoint[0].classList.contains('page5-ellipse-click')) {
		page5IndexEllipse = 1;
	} else if (page5EllipsePoint[1].classList.contains('page5-ellipse-click')) {
		page5IndexEllipse = 2;
	} else if (page5EllipsePoint[2].classList.contains('page5-ellipse-click')) {
		page5IndexEllipse = 3;
	} else if (page5EllipsePoint[3].classList.contains('page5-ellipse-click')) {
		page5IndexEllipse = 4;
	} else if (page5EllipsePoint[4].classList.contains('page5-ellipse-click')) {
		page5IndexEllipse = 5;
	} else if (page5EllipsePoint[5].classList.contains('page5-ellipse-click')) {
		page5IndexEllipse = 6;
	}
};



let page5EllipseSvg = document.querySelector('.page5-steps svg');
let page5NumberCnt = document.querySelector('.page5-number-cnt');
let page5IconsWorkCnt = document.querySelector('.page5-iconsWork-cnt');
let page5TypeWorkCnt = document.querySelector('.page5-typeWork-cnt');





let page5IndexAction = function () {
	page5EllipsePoint.forEach(element => {
		element.classList.remove('page5-left-behind');
	});
	page5NumberCnt.style.transform = `translateY(${0 - 64 * (page5IndexEllipse - 1)}px)`;
	page5IconsWorkCnt.style.transform = `translateY(${0 - 110 * (page5IndexEllipse - 1)}px)`;
	if (document.documentElement.clientWidth <= 1700) {
		page5TypeWorkCnt.style.transform = `translateY(${0 - 50 * (page5IndexEllipse - 1)}px)`;
	} else {
		page5TypeWorkCnt.style.transform = `translateY(${0 - 110 * (page5IndexEllipse - 1)}px)`;
	}
	page5EllipseSvg.style.strokeDashoffset = `${738 - (738 / 6) * (page5IndexEllipse - 1)}`;
	if (page5IndexEllipse === 1) {
	} else if (page5IndexEllipse === 2) {
		page5EllipsePoint[0].classList.add('page5-left-behind');
	} else if (page5IndexEllipse === 3) {
		page5EllipsePoint[0].classList.add('page5-left-behind');
		page5EllipsePoint[1].classList.add('page5-left-behind');
	} else if (page5IndexEllipse === 4) {
		page5EllipsePoint[0].classList.add('page5-left-behind');
		page5EllipsePoint[1].classList.add('page5-left-behind');
		page5EllipsePoint[2].classList.add('page5-left-behind');
	} else if (page5IndexEllipse === 5) {
		page5EllipsePoint[0].classList.add('page5-left-behind');
		page5EllipsePoint[1].classList.add('page5-left-behind');
		page5EllipsePoint[2].classList.add('page5-left-behind');
		page5EllipsePoint[3].classList.add('page5-left-behind');
	} else if (page5IndexEllipse === 6) {
		page5EllipsePoint[0].classList.add('page5-left-behind');
		page5EllipsePoint[1].classList.add('page5-left-behind');
		page5EllipsePoint[2].classList.add('page5-left-behind');
		page5EllipsePoint[3].classList.add('page5-left-behind');
		page5EllipsePoint[4].classList.add('page5-left-behind');
	}
}
page5IndexAction();

let page6Cnt = document.querySelector('.page6-cnt');

page6Cnt.addEventListener("mouseover", function (event) {
	let target1 = event.target.closest('.page6-card');
	if (!target1) return;
	target1.classList.add('hover');
	page4Hoverfun();
});

page6Cnt.addEventListener("mouseout", function () {
	document.querySelectorAll('.page6-card').forEach(element => {
		element.classList.remove('hover');
	});
	hoverMess.forEach(element => {
		element.classList.remove('active');
	});
	// page4Hoverfun();
});





















let allWrapper = document.querySelector('.wrapper');
let headerMenu = document.querySelector('.header-menu');
let allMenu = document.querySelector('.menu');

headerMenu.addEventListener('click', function (event) {
	let menuTarget = event.target.closest('.header-menu-click');
	if (menuTarget) {
		if (allWrapper.classList.contains('call')) {
			allWrapper.classList.remove('call');
			if (!allMenu.classList.contains('active-menu')) {
				allMenu.classList.add('active-menu');
				if (document.documentElement.clientWidth <= 768) {
					document.body.classList.add('stop');
					allWrapper.classList.add('menu-active');
				} else {
					document.body.classList.remove('stop');
				}
			}
		} else if (aboutUs.classList.contains('active')) {
			aboutUs.classList.remove('active');
			allMenu.classList.add('active-menu');
		} else {
			allMenu.classList.toggle('active-menu');
			aboutUs.classList.remove('active');
			if (document.documentElement.clientWidth <= 768) {
				document.body.classList.toggle('stop');
				allWrapper.classList.toggle('menu-active');

			}
		}

	} else {
		return;
	}
	menuMess();
});



let menuUpBlockText1 = document.querySelector('.menu-upBlock-text1');
let menuUpBlockText2 = document.querySelector('.menu-upBlock-text2');
let menuUpBlockText3 = document.querySelector('.menu-upBlock-text3');
let menuUpBlockText4 = document.querySelector('.menu-upBlock-text4');
console.log(parseInt(getComputedStyle(page3Cnt).height));
console.log(parseInt(getComputedStyle(document.querySelector('.page3-cnt')).height));

allMenu.addEventListener('click', function (event) {
	let targetUpBlockText = event.target.closest('.menu-upBlock-text')
	if (targetUpBlockText) {
		if (targetUpBlockText == menuUpBlockText1) {
			if (document.documentElement.clientWidth > 768) {
				myPageSlider.slideTo(2, 500, false);
			} else if (document.documentElement.clientWidth <= 768) {
				window.scrollTo({ top: parseInt(getComputedStyle(document.querySelector('.page1-cnt')).height) + parseInt(getComputedStyle(document.querySelector('.form-message1')).height), behavior: "smooth", });
			}
		} else if (targetUpBlockText == menuUpBlockText2) {
			if (document.documentElement.clientWidth > 768) {
				myPageSlider.slideTo(3, 500, false);
			} else if (document.documentElement.clientWidth <= 768) {
				window.scrollTo({ top: parseInt(getComputedStyle(document.querySelector('.page1-cnt')).height) + parseInt(getComputedStyle(document.querySelector('.form-message1')).height) + parseInt(getComputedStyle(document.querySelector('.page3-cnt')).height), behavior: "smooth", });
			}
		} else if (targetUpBlockText == menuUpBlockText3) {
			if (document.documentElement.clientWidth > 768) {
				myPageSlider.slideTo(4, 500, false);
			} else if (document.documentElement.clientWidth <= 768) {
				window.scrollTo({ top: parseInt(getComputedStyle(document.querySelector('.page1-cnt')).height) + parseInt(getComputedStyle(document.querySelector('.form-message1')).height) + parseInt(getComputedStyle(document.querySelector('.page3-cnt')).height) + parseInt(getComputedStyle(document.querySelector('.page4-cnt-after')).height) + parseInt(getComputedStyle(document.querySelector('.form-message2')).height), behavior: "smooth", });
			}
		} else if (targetUpBlockText == menuUpBlockText4) {
			if (document.documentElement.clientWidth > 768) {
				myPageSlider.slideTo(5, 500, false);
			} else if (document.documentElement.clientWidth <= 768) {
				window.scrollTo({ top: parseInt(getComputedStyle(document.querySelector('.page1-cnt')).height) + parseInt(getComputedStyle(document.querySelector('.form-message1')).height) + parseInt(getComputedStyle(document.querySelector('.page3-cnt')).height) + parseInt(getComputedStyle(document.querySelector('.page4-cnt-after')).height) + parseInt(getComputedStyle(document.querySelector('.form-message2')).height) + parseInt(getComputedStyle(document.querySelector('.page4-cnt-after')).height), behavior: "smooth", });
			}
		}
		allMenu.classList.remove('active-menu');
		document.body.classList.remove('stop');
		allWrapper.classList.remove('menu-active');
	} else {
		return;
	}
});

allMenu.addEventListener('scroll', function (event) {

	if (document.documentElement.clientWidth <= 768) {
		document.querySelector('.page-header').style.marginTop = `-${allMenu.scrollTop}px`;
		document.querySelector('.header-line-cnt').style.marginTop = `-${allMenu.scrollTop}px`;
		document.querySelector('.page-left-panel').style.marginTop = `-${allMenu.scrollTop}px`;
	}

});

let scrollHeader0 = function () {
	if (document.documentElement.clientWidth <= 768) {
		document.querySelector('.page-header').style.marginTop = `0px`;
		document.querySelector('.header-line-cnt').style.marginTop = `0px`;
		document.querySelector('.page-left-panel').style.marginTop = `0px`;
	}
};
document.querySelector('.aboutUs-shadow').addEventListener('scroll', function (event) {
	console.log('scroll');

	if (document.documentElement.clientWidth <= 768) {
		document.querySelector('.page-header').style.marginTop = `-${document.querySelector('.aboutUs-shadow').scrollTop}px`;

		console.log(document.querySelector('.aboutUs-shadow').scrollTop);
		document.querySelector('.page-left-panel').style.marginTop = `-${document.querySelector('.aboutUs-shadow').scrollTop}px`;
		document.querySelector('.header-line-cnt').style.marginTop = `-${document.querySelector('.aboutUs-shadow').scrollTop}px`;
	}

});


let page2DownFlexCnt = document.querySelector('.page2-down-flex-cnt');
let menuDownArrow = document.querySelector('.menu-down-arrow');
var aboutUs = document.querySelector('.aboutUs');
let aboutUsDownBlockLink = document.querySelector('.aboutUs-downBlock-link');
let iconeCall = document.querySelector('.icone-call');
let orderCall = document.querySelector('.orderCall');
let thankYouDownBlock = document.querySelector('.thankYou-downBlock');
let galleruReturn = document.querySelector('.galleru-return');

let page3GalleryElit = document.querySelector('.page3-content-gallery.elite');
let eliteGallery = document.querySelector('.elite-gallery');
let vipGallery = document.querySelector('.vip-gallery');
let extraGallery = document.querySelector('.extra-gallery');
let galleryCounterCurrentPage = document.querySelectorAll('.gallery-counter-current-page');






document.body.addEventListener('click', function (event) {

	let targetMenuDownArrow = event.target.closest('.menu-down-arrow');

	let targetPage2DownFlexCnt = event.target.closest('.page2-down-flex-cnt');

	let targetAboutUsDownBlockLink = event.target.closest('.aboutUs-downBlock-link');

	let targetIconeCall = event.target.closest('.icone-call');
	let targetThankYouDownBlock = event.target.closest('.thankYou-downBlock');
	let targetPage3Gallery = event.target.closest('.page3-content-gallery');
	let targetPage3GalleryElit = event.target.closest('.page3-content-gallery.elite');
	let targetPage3GalleryVip = event.target.closest('.page3-content-gallery.vip');
	let targetPage3GalleryExtra = event.target.closest('.page3-content-gallery.extra');
	let targetGalleruReturn = event.target.closest('.galleru-return');
	let targetPage6Card = event.target.closest('.page6-card');
	let targetPage6ButtonClick = event.target.closest('.page6-button-click');
	let targetPage4SelectText = event.target.closest('.page4-select-text');
	let targetDriveCloseClick = event.target.closest('.drive-close-click');





	if (targetPage4SelectText) {
		document.querySelectorAll('.ellipse0').forEach(element => {
			element.classList.remove('click-service-page4');
			element.previousElementSibling.classList.remove('click-service-page4');
		});

		targetPage4SelectText.parentElement.closest('.ellipse0').previousElementSibling.classList.add('click-service-page4');
		targetPage4SelectText.parentElement.closest('.ellipse0').classList.add('click-service-page4');
		//calculationPage4();


		if (document.querySelector('.page4-cnt-after .ellipse1').classList.contains('click-service-page4')) {
			document.querySelector('.ellipse1').classList.add('click-service-page4');
			document.querySelector('.line1').classList.add('click-service-page4');
		} else if (document.querySelector('.page4-cnt-after .ellipse2').classList.contains('click-service-page4')) {
			document.querySelector('.ellipse2').classList.add('click-service-page4');
			document.querySelector('.line2').classList.add('click-service-page4');
		} else if (document.querySelector('.page4-cnt-after .ellipse3').classList.contains('click-service-page4')) {
			document.querySelector('.ellipse3').classList.add('click-service-page4');
			document.querySelector('.line3').classList.add('click-service-page4');
		}

		if (document.querySelector('.ellipse1').classList.contains('click-service-page4')) {
			document.querySelector('.page4-cnt-after .ellipse1').classList.add('click-service-page4');
			document.querySelector('.page4-cnt-after .line1').classList.add('click-service-page4');
		} else if (document.querySelector('.ellipse2').classList.contains('click-service-page4')) {
			document.querySelector('.page4-cnt-after .ellipse2').classList.add('click-service-page4');
			document.querySelector('.page4-cnt-after .line2').classList.add('click-service-page4');
		} else if (document.querySelector('.ellipse3').classList.contains('click-service-page4')) {
			document.querySelector('.page4-cnt-after .ellipse3').classList.add('click-service-page4');
			document.querySelector('.page4-cnt-after .line3').classList.add('click-service-page4');
		}




		if (page4Input.placeholder === '64') {
			page4CalcPlaceholder();
			page4rezult.innerHTML = `${numberWithSpaces(page4rezultValue)}`;
			// page4rezult2.innerHTML = page4rezult.innerHTML;
		} else {
			calculationPage4();
		}

		if (page4Input2.placeholder === '64') {
			page4CalcPlaceholder();
			page4rezult2.innerHTML = `${numberWithSpaces(page4rezultValue2)}`;
		} else {
			calculationPage4();
		}
		page4Hoverfun();




		let doubleStatus = function () {

			if (document.documentElement.clientWidth <= 768) {
				if (targetPage4SelectText.parentElement.classList.contains('ellipse1')) {
					document.querySelector('.ellipse1').classList.add('click-service-page4');
					document.querySelector('.line1').classList.add('click-service-page4');
				} else if (targetPage4SelectText.parentElement.classList.contains('ellipse2')) {
					document.querySelector('.ellipse2').classList.add('click-service-page4');
					document.querySelector('.line2').classList.add('click-service-page4');
				} else if (targetPage4SelectText.parentElement.classList.contains('ellipse3')) {
					document.querySelector('.ellipse3').classList.add('click-service-page4');
					document.querySelector('.line3').classList.add('click-service-page4');
				}
			} else {
				if (targetPage4SelectText.parentElement.classList.contains('ellipse1')) {
					document.querySelector('.page4-cnt-after .ellipse1').classList.add('click-service-page4');
					document.querySelector('.page4-cnt-after .line1').classList.add('click-service-page4');
				} else if (targetPage4SelectText.parentElement.classList.contains('ellipse2')) {
					document.querySelector('.page4-cnt-after .ellipse2').classList.add('click-service-page4');
					document.querySelector('.page4-cnt-after .line2').classList.add('click-service-page4');
				} else if (targetPage4SelectText.parentElement.classList.contains('ellipse3')) {
					document.querySelector('.page4-cnt-after .ellipse3').classList.add('click-service-page4');
					document.querySelector('.page4-cnt-after .line3').classList.add('click-service-page4');
				}
			}
		};
		//doubleStatus();



	}

	if (targetMenuDownArrow) {
		allMenu.scrollTo(0, 0);
		aboutUs.classList.add('active');
		allMenu.classList.remove('active-menu');
		allWrapper.classList.remove('menu-active');
		scrollHeader0();
	} else if (targetPage2DownFlexCnt) {
		aboutUs.classList.add('active');
	} else if (targetAboutUsDownBlockLink) {
		document.querySelector('.aboutUs-shadow').scrollTo(0, 0);
		aboutUs.classList.remove('active');
		document.body.classList.remove('stop');
		scrollHeader0();
	} else if (targetThankYouDownBlock) {
		allWrapper.classList.remove('thank');
		document.body.classList.remove('stop');
	} else if (targetIconeCall) {
		allWrapper.classList.toggle('call');
		if (allWrapper.classList.contains('call')) {
			if (document.body.classList.contains('stop')) {
			} else {
				document.body.classList.add('stop');
			}
		} else {
			if (allMenu.classList.contains('active-menu') || aboutUs.classList.contains('active')) {
			} else {
				document.body.classList.remove('stop');
			}
		}
	} else if (targetPage3GalleryElit) {
		eliteGallery.classList.add('active');

		console.log(document.querySelector('.form-message1'));

		if (document.documentElement.clientWidth <= 768) {
			document.body.classList.add('stop');
		}
	} else if (targetPage3GalleryVip) {
		vipGallery.classList.add('active');
		if (document.documentElement.clientWidth <= 768) {
			document.body.classList.add('stop');
		}
	} else if (targetPage3GalleryExtra) {
		extraGallery.classList.add('active');
		if (document.documentElement.clientWidth <= 768) {
			document.body.classList.add('stop');
		}
	} else if (targetGalleruReturn) {
		eliteGallery.classList.remove('active');
		vipGallery.classList.remove('active');
		extraGallery.classList.remove('active');
		if (document.documentElement.clientWidth <= 768) {
			document.body.classList.remove('stop');
		}
	} else if (targetPage6Card) {
		if (targetPage6ButtonClick) {
			console.log('button');
			document.querySelector('.flexUp-flexDown-wrapper').classList.toggle('page6-click');
		} else {
			if (document.documentElement.clientWidth > 768) {
				document.querySelectorAll('.page6-card').forEach(element => {
					element.classList.remove('click');
				});
				targetPage6Card.classList.add('click');
				page4Hoverfun();
			} else if (document.documentElement.clientWidth <= 768) {

				document.querySelector('.wrapper-drive').classList.add('active');
				document.body.classList.add('stop');
				if (targetPage6Card.closest('.page6-strim')) {
					document.querySelector('.drive.page6-hover-mess-strim').classList.add('active-drive');
				}
				if (targetPage6Card.closest('.page6-video')) {
					document.querySelector('.drive.page6-hover-mess-video').classList.add('active-drive');
				}
				if (targetPage6Card.closest('.page6-furniture')) {
					document.querySelector('.drive.page6-hover-mess-furniture').classList.add('active-drive');
				}
				if (targetPage6Card.closest('.page6-appliances')) {
					document.querySelector('.drive.page6-hover-mess-appliances').classList.add('active-drive');
				}
				if (targetPage6Card.closest('.page6-service')) {
					document.querySelector('.drive.page6-hover-mess-service').classList.add('active-drive');
				}
			}
		}
	} else if (targetDriveCloseClick) {
		document.querySelectorAll('.drive').forEach(element => {
			element.classList.remove('active-drive');
		});
		document.querySelector('.wrapper-drive').classList.remove('active');
		document.body.classList.remove('stop');
	} else if (!targetPage6Card) {
		document.querySelectorAll('.page6-card').forEach(element => {
			element.classList.remove('click');
		});


	} else {
		return;
	}


	if (targetPage3Gallery) {
		let myGallerySlider = new Swiper('.swiper-gallery', {
			//*@ Стрелки
			//*Достаточно добавить два блока div, с классами .swiper-button-next и .swiper-button-prev, даже без сss, появятся синие стрелки по краям, для переключения слайдов
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			//*@ Включение/отключение перетаскивания на ПК
			//* по умолчанию включено
			simulateTouch: true,
			//simulateTouch: false,
			//* Чувствительность свайпа от 0 до 1, где 0 полный игнор перетаскивания
			touchRatio: 1,
			//* Угол срабатывания свайпа/перетаскивания
			//touchAngle: 45,
			//* Курсор перетаскивания в виде руки, при true
			grabCursor: true,
			//grabCursor: false,
			//*@ Управление клавиатурой
			keyboard: {
				//* Включить\выключить переключение стрелками, на клавиатуре
				enabled: true,
				//enabled: false,
				//* Включить\выключить переключение только когда слайдер, в пределах вьюпорта(окна браузера)
				//onlyInViewport: true,
				onlyInViewport: false,
				//* Включить\выключить управление клавишами pageUp, pageDown
				pageUpDown: true,
			},

			//*@ Управление колесом мыши
			mousewheel: {
				//* Чувствительность колеса мыши
				sensitivy: 0,
				//* Класс объекта на котором будет срабатывать прокрутка мышью (как ни странно работает и без него)
				//eventsTarget: ".page-slider"
			},
			//*@ Количество пролистываемых слайдов
			slidesPerGroup: 1,
			//*@Вертикальный слайдер
			//* Для адекватной работы необходимо прописать высоту слайдера .image-slider. Но всё равно изображения залазят друг на друга, как то коряво работает!Если же прописать и высоту для изображений в слайдах .image-slider__image img, то работает нормы
			direction: 'horizontal',
			loop: false,
			//*@ Позволяет нормально свайпать слайды при повороте телефона
			observer: true,
			lazy: {
				// Подгружать предыдущую и следующую картинки
				//* если значение true, подгружает предыдущий и следующий слайды
				loadPrevNext: true,
			},
		});
		let galleryCount = function (event, event2) {
			let summ = event.realIndex + 1;
			if (summ > event2.nextElementSibling.innerHTML) {
				summ = parseInt(event2.nextElementSibling.innerHTML);
			}

			event2.innerHTML = `0${summ}`;
		};
		myGallerySlider[0].on('slideChange', function () {
			galleryCount(myGallerySlider[0], galleryCounterCurrentPage[0]);
		});
		myGallerySlider[1].on('slideChange', function () {
			galleryCount(myGallerySlider[1], galleryCounterCurrentPage[1]);
		});
		myGallerySlider[2].on('slideChange', function () {
			galleryCount(myGallerySlider[2], galleryCounterCurrentPage[2]);
		});

	}
	menuMess();
});

















































let menuMess = function () {

	if (myPageSlider.realIndex !== 2) {
		formMessage.classList.remove('no-display');
		//console.log('1');
	}

	if (aboutUs.classList.contains('active') || allMenu.classList.contains('active-menu') || allWrapper.classList.contains('call') || allWrapper.classList.contains('thank') || eliteGallery.classList.contains('active') || vipGallery.classList.contains('active') || extraGallery.classList.contains('active')) {
		formMessage.classList.add('no-display');
		//console.log('4');
	} else {
		formMessage.classList.remove('no-display');
		//console.log('5');
	}
	if (myPageSlider.realIndex == 2) {
		formMessage.classList.add('no-display');
		//console.log('6');
	}
};
// menuMess();
document.body.addEventListener('keydown', function (event) {
	if (event.key == "Escape") {
		// console.log('Шо ты там тыкаешь');
		allMenu.classList.remove('active-menu');
		aboutUs.classList.remove('active');
		allWrapper.classList.remove('thank');
		allWrapper.classList.remove('call');
		eliteGallery.classList.remove('active');
		vipGallery.classList.remove('active');
		extraGallery.classList.remove('active');
		document.querySelectorAll('.drive').forEach(element => {
			element.classList.remove('active-drive');
		});
		document.querySelector('.wrapper-drive').classList.remove('active');
		document.body.classList.remove('stop');
	} else {
		return;
	}
	menuMess();
});







































let page4ServiseText = document.querySelector('.page4-servise-text');
let page4ContentBlock = document.querySelector('.page4-content-block');
let page4Yardage = document.querySelector('.yardage');
let page5ContentText = document.querySelector('.page5-contentText');
let page5StagesWork = document.querySelector('.page5-stagesWork');
let page5Content = document.querySelector('.page5-content');
let page1 = document.querySelector('.page1');
let page1Cnt = document.querySelector('.page1-cnt');
let page3 = document.querySelector('.page3');
let page4 = document.querySelector('.page4');
let page4Cnt = document.querySelector('.page4-cnt');
let page5 = document.querySelector('.page5');
let page5Cnt = document.querySelector('.page5-cnt');
let page6 = document.querySelector('.page6');
var formMessage1 = document.querySelector('.form-message1');
let formMessage2 = document.querySelector('.form-message2');
let formMessage3 = document.querySelector('.form-message3');
let leftPanelText = document.querySelector('.left-panel-text');
let pageLeftPanelUp = document.querySelector('.page-left-panel-up');
let page1Brend = document.querySelector('.page1-brend');
var page4CntAfter = document.querySelector('.page4-cnt-after');





//* перестановки блоков при изменении размера
let rearrangingBlocks = function () {
	if (document.documentElement.clientWidth <= 1700) {
		page4ContentBlock.insertBefore(page4ServiseText, page4Yardage);
		page4ServiseText.innerHTML = `выберите площадь и один из пакетов услуг:`;

		page5Content.insertBefore(page5ContentText, page5EllipseSteps);


	} else {
		page4Service.insertBefore(page4ServiseText, null);
		page4ServiseText.innerHTML = `выберите площадь и <br> один из пакетов услуг:`;

		page5StagesWork.insertBefore(page5ContentText, null);
	}


	if (document.documentElement.clientWidth <= 950) {
		page1Brend.insertBefore(leftPanelText, null);
	} else {
		pageLeftPanelUp.insertBefore(leftPanelText, null);
	}


	if (document.documentElement.clientWidth <= 768) {
		allWrapper.insertBefore(page1Cnt, formMessage1);
		allWrapper.insertBefore(page3Cnt, page4CntAfter);
		allWrapper.insertBefore(page5Cnt, formMessage3);
		allWrapper.insertBefore(page6Cnt, formMessage3);

	} else {
		page1.insertBefore(page1Cnt, null);
		page3.insertBefore(page3Cnt, null);
		page4.insertBefore(page4Cnt, null);
		page5.insertBefore(page5Cnt, null);
		page6.insertBefore(page6Cnt, null);

	}
};
rearrangingBlocks();


document.body.addEventListener('touchstart', function (event) {
	let targetPage4InputClass = event.target.closest('.page4__input__class');
	if (targetPage4InputClass) {
		// event.preventDefault();
		page4Input.focus();
	} else {
		page4Input.blur();
	}
});














































const resize1 = function () {
	pageIndex();
	formMes();
	menuMess();
	rearrangingBlocks();
	page5IndexAction();
	if (document.documentElement.clientWidth > 768) {
		document.body.classList.remove('stop');
	} else {
		if (allMenu.classList.contains('active-menu') || aboutUs.classList.contains('active') || allWrapper.classList.contains('call') || allWrapper.classList.contains('thank')) {
			if (document.body.classList.contains('stop')) {
			} else {
				document.body.classList.add('stop');
			}
		}
	}
};
resize1();
window.addEventListener('resize', function () {
	resize1();
});
window.addEventListener('orientationchange', function () {
	resize1();
});


document.body.addEventListener('keydown', function (event) {
	// console.log(event.key);
});



















































































const mainFormMess1 = document.forms.formMessage1;
const mainFormMess1Name = mainFormMess1.name;
const mainFormMess1Tel = mainFormMess1.tel;
const mainFormMess2 = document.forms.formMessage2;
const mainFormMess2Name = mainFormMess2.name;
const mainFormMess2Tel = mainFormMess2.tel;
const mainFormMess3 = document.forms.formMessage3;
const mainFormMess3Name = mainFormMess3.name;
const mainFormMess3Tel = mainFormMess3.tel;
const mainFormCall = document.forms.formCall;
const mainFormCallName = mainFormCall.name;
const mainFormCallTel = mainFormCall.tel;

const mainFormMess1NamePlaceholder = mainFormMess1Name.placeholder;
const mainFormMess1TelPlaceholder = mainFormMess1Tel.placeholder;
const mainFormMess2NamePlaceholder = mainFormMess2Name.placeholder;
const mainFormMess2TelPlaceholder = mainFormMess2Tel.placeholder;
const mainFormMess3NamePlaceholder = mainFormMess3Name.placeholder;
const mainFormMess3TelPlaceholder = mainFormMess3Tel.placeholder;


mainFormMess1Name.addEventListener("focus", function (event) {
	mainFormMess1Name.placeholder = "";
});
mainFormMess1Name.addEventListener("blur", function () {
	mainFormMess1Name.placeholder = mainFormMess1NamePlaceholder;
});

mainFormMess1Tel.addEventListener("focus", function (event) {
	mainFormMess1Tel.placeholder = "";
});
mainFormMess1Tel.addEventListener("blur", function () {
	mainFormMess1Tel.placeholder = mainFormMess1TelPlaceholder;
});



mainFormMess2Name.addEventListener("focus", function (event) {
	mainFormMess2Name.placeholder = "";
});
mainFormMess2Name.addEventListener("blur", function () {
	mainFormMess2Name.placeholder = mainFormMess2NamePlaceholder;
});

mainFormMess2Tel.addEventListener("focus", function (event) {
	mainFormMess2Tel.placeholder = "";
});
mainFormMess2Tel.addEventListener("blur", function () {
	mainFormMess2Tel.placeholder = mainFormMess2TelPlaceholder;
});



mainFormMess3Name.addEventListener("focus", function (event) {
	mainFormMess3Name.placeholder = "";
});
mainFormMess3Name.addEventListener("blur", function () {
	mainFormMess3Name.placeholder = mainFormMess3NamePlaceholder;
});

mainFormMess3Tel.addEventListener("focus", function (event) {
	mainFormMess3Tel.placeholder = "";
});
mainFormMess3Tel.addEventListener("blur", function () {
	mainFormMess3Tel.placeholder = mainFormMess3TelPlaceholder;
});



mainFormCallName.addEventListener("focus", function (event) {
	mainFormCallName.placeholder = "";
});
mainFormCallName.addEventListener("blur", function () {
	mainFormCallName.placeholder = mainFormMess1NamePlaceholder;
});

mainFormCallTel.addEventListener("focus", function (event) {
	mainFormCallTel.placeholder = "";
});
mainFormCallTel.addEventListener("blur", function () {
	mainFormCallTel.placeholder = mainFormMess1TelPlaceholder;
});






let errorName1 = document.querySelector('.error-name1');
let errorTel1 = document.querySelector('.error-tel1');
let errorName2 = document.querySelector('.error-name2');
let errorTel2 = document.querySelector('.error-tel2');




allWrapper.addEventListener('submit', function (event) {
	event.preventDefault();
	let targetFormMessage = event.target.closest('.form-message');
	let targetFormCall = event.target.closest('.form-call');

	if (targetFormMessage || targetFormCall) {

		if (event.target.name.value.length > 1) {
			if (event.target.tel.value.length > 10 && event.target.tel.value.length < 19) {
				//Message1();
				allWrapper.classList.add('thank');
				menuMess();
				allMenu.classList.remove('active-menu');
				aboutUs.classList.remove('active');
				allWrapper.classList.remove('call');
				if (document.documentElement.clientWidth <= 768) {
					document.body.classList.add('stop');
				}
			}
		};

		if (event.target.name.value.length < 2) {
			if (targetFormCall) {
				event.target.name.nextElementSibling.classList.add('active');
				event.target.name.classList.add('active');
			} else {
				document.querySelectorAll('.form__input-name').forEach(element => {
					element.nextElementSibling.classList.add('active');
					element.classList.add('active');
				});
			}
		};

		if (event.target.tel.value.length < 11 || event.target.tel.value.length > 18) {
			if (targetFormCall) {
				event.target.tel.nextElementSibling.classList.add('active');
				event.target.tel.classList.add('active');
			} else {
				document.querySelectorAll('.form__input-tel').forEach(element => {
					element.nextElementSibling.classList.add('active');
					element.classList.add('active');
				});
			}
		};
	} else {
		return;
	}
});














allWrapper.addEventListener('input', function (event) {
	let inputTarget = event.target.closest('input');
	let formInputNameTarget = event.target.closest('.form__input-name');
	let formInputTelTarget = event.target.closest('.form__input-tel');

	if (event.target.closest('.form-call')) {
		inputTarget.classList.remove('active');
		inputTarget.nextElementSibling.classList.remove('active');
	} else {
		if (formInputNameTarget) {
			document.querySelectorAll('.form__input-name').forEach(element => {
				element.nextElementSibling.classList.remove('active');
				element.classList.remove('active');
			});
		} else {
			document.querySelectorAll('.form__input-tel').forEach(element => {
				element.nextElementSibling.classList.remove('active');
				element.classList.remove('active');
			});
		}
	}



	if (formInputNameTarget) {
		document.querySelectorAll('.form__input-name').forEach(element => {
			if (element == formInputNameTarget) {
			} else {
				element.value = `${formInputNameTarget.value}`;
			}
		});
	}

	if (formInputTelTarget) {
		document.querySelectorAll('.form__input-tel').forEach(element => {
			if (element == formInputTelTarget) {
			} else {
				element.value = `${formInputTelTarget.value}`;
			}
		});
	}


});





















































let Message1 = async function () {
	//alert("полетела")
	let data = {
		//* Берём значение, которое введёт пользователь (value), из input c id="name"
		name: document.getElementById("name1").value,
		//* Номер телефона специально по другому записан,что бы отправились цифры без маски, на вроде у пользователя забилось +7(908) 908-47-73, а прийдёт на почту 9089084773
		tel: document.getElementById("tel1").value,
		// msg: document.getElementById("msg").value
	}

	let response = await fetch("mail.php", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		}
	})

	let result = await response.text();

	alert(result);

	//* Если закоментировать с Let response.... по alert(result), включительно, а console.log разкомментировать, то при отправке, в консоли должен появляться массив
	//console.log(data);

};

let Message2 = async function () {
	let data = {
		name: document.getElementById("name2").value,
		tel: document.getElementById("tel2").value,
	}

	let response = await fetch("mail.php", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		}
	})

	let result = await response.text();
};






























