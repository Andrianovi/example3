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

































































































let page3cnt = document.querySelector('.page3-cnt');
let page3title = document.querySelectorAll('.page3-title');


























//* Если навести курсор на .page3-title, родителю, с классом .page3-0, присваивается класс hover-page3.
page3cnt.addEventListener("mouseover", function (event) {
	let target1 = event.target.closest('.page3-titlle-wrapper');
	// переход не на <span> - игнорировать
	if (!target1) return;
	target1.parentElement.closest('.page3-0').classList.add('hover-page3');
});

//* Если увести курсор с .page3-0 на другой такой же блок, то класс hover-page3 c него снимается. А если блок на который уходит курсор не имеет класса page3-0, то ничего не происходит!!!
page3cnt.addEventListener("mouseover", function (event) {

	let target2 = event.target.closest('.page3-0');
	if (!target2.classList.contains('hover-page3')) {
		document.querySelectorAll('.page3-0').forEach(element => {
			element.classList.remove('hover-page3');
		});
	}
});


page3cnt.addEventListener('click', function (event) {

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
		target2.classList.add('page3-click');
		target2.classList.add('hover-page3');


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



let page4Hoverfun = function () {
	hoverMess.forEach(element => {
		element.classList.remove('active');
	});
	if (myPageSlider.realIndex == 3) {
		/* if (event.target.closest('.text')) {
			hoverMess.forEach(element => {
				element.classList.remove('active');
			});
		} */
		if (event.target == page4Title1) {
			page4HoverMessElite.classList.add('active');
		} else if (event.target == page4Title2) {
			page4HoverMessVip.classList.add('active');
		} else if (event.target == page4Title3) {
			page4HoverMessExtra.classList.add('active');
		}
	} else if (myPageSlider.realIndex == 5) {

		/* if (page6Strim.classList.contains('hover')) */
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
//* При кликнуть на .text, если класс click-service-page4 есть у родителя другого блока с .text, то с этого родителя и предыдущего блока класс click-service-page4 снимается, а потом родителю блока, на который кликнули, с классом .ellipse0, и элементу перед родителем, присваивается класс click-service-page4.
page4Service.addEventListener("click", function (event) {
	if (!event.target.closest('.text')) return;
	let target1 = event.target.closest('.text');
	// переход не на <span> - игнорировать
	if (!target1.parentElement.closest('.ellipse0').classList.contains('click-service-page4')) {
		document.querySelectorAll('.ellipse0').forEach(element => {
			element.classList.remove('click-service-page4');
			element.previousElementSibling.classList.remove('click-service-page4');
		});
	}
	target1.parentElement.closest('.ellipse0').previousElementSibling.classList.add('click-service-page4');
	target1.parentElement.closest('.ellipse0').classList.add('click-service-page4');
	calculationPage4();



	if (page4Input.placeholder === '64') {
		page4CalcPlaceholder();
		page4rezult.innerHTML = `${numberWithSpaces(page4rezultValue)}`;
	}
	page4Hoverfun();
});




//* разбивание чисел на разряды: делает из 1234567 - 1 234 567
function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


let page4Form = document.forms.page4Form;


//*Отмена отправки формы, ибо форма page4Form нужна только для приёма числа и умножения
page4Form.addEventListener('submit', function (event) {
	event.preventDefault();
});
let page4Input = page4Form.page4__input__name;
const page4InputPlaceholder = page4Input.placeholder;


//* Удаление плейсхолдера при фокусе
page4Input.addEventListener('focus', function (event) {
	event.preventDefault();
	page4Input.placeholder = '';
});



const blurFirst = function () {
	console.log(page4InputPlaceholder);
	page4Input.placeholder = 0;
	let value1 = page4Input.value;
	value1 = value1.replace(/, /g, '.');

	if (page4Input.value.length == 0) {
		page4CalcPlaceholder();
		page4rezult.innerHTML = `${0}`;
	}
	lineEllpsePage4();
};


//* Восстановление плейсхолдера, при переходе фокуса на другой объект
page4Input.addEventListener('blur', blurFirst);


let page4rezult = document.querySelector('.page4-money .number');
let page4rezultValue;



let page4CalcPlaceholder = function () {
	if (document.querySelector('.ellipse1').classList.contains('click-service-page4')) {
		page4rezultValue = 466000;
	} else if (document.querySelector('.ellipse2').classList.contains('click-service-page4')) {
		page4rezultValue = 466000 * 2;
	} else if (document.querySelector('.ellipse3').classList.contains('click-service-page4')) {
		page4rezultValue = 466000 * 4;
	}

};
page4CalcPlaceholder();


const blurBackspace = function () {
	if (page4Input.value == 0) {
		page4Input.value = '0';
		page4Input.placeholder = '0';
		page4rezult.innerHTML = `0`;
	}
};


let calculationPage4 = function () {
	let page4rezultSelf;
	if (page4Input.value.length > 4) {
		page4Input.style.fontSize = "48px";
	} else {
		page4Input.style.fontSize = "64px";
	}
	let value1 = page4Input.value;
	value1 = value1.replace(/, /g, '.');
	if (value1 === '') return;
	let calculation;
	if (document.querySelector('.ellipse1').classList.contains('click-service-page4')) {
		calculation = Math.ceil(value1 * 7281.25);
	} else if (document.querySelector('.ellipse2').classList.contains('click-service-page4')) {
		calculation = Math.ceil(value1 * 7281.25 * 2);
	} else if (document.querySelector('.ellipse3').classList.contains('click-service-page4')) {
		calculation = Math.ceil(value1 * 7281.25 * 4);
	}

	page4rezult.innerHTML = `${numberWithSpaces(calculation)}`;
	page4rezultValue = `${numberWithSpaces(calculation)}`;
	if (page4rezult.innerHTML.length > 9) {
		page4rezult.style.fontSize = "48px";
	} else {
		page4rezult.style.fontSize = "64px";
	}
	document.body.addEventListener('keydown', function (event) {
		console.log(event.key);
		if (event.key === "Backspace") {
			page4Input.addEventListener('blur', blurBackspace);
		}
	});
};
let page4EllipseSvg = document.querySelector('.yardage svg');
let page4movingPoint = document.querySelector('.page4-ellipse-point2');

//* Функция для рисования линии на окружности в зависимости от площади написанной внутри
const lineEllpsePage4 = function () {
	//ocument.querySelector('.page4-servise-text').innerHTML = `${page4movingPoint.style.transform}2321`; //*@!!!!!!!!!!!!!!!!

	valueInEllipse = page4Input.value;
	let arcLength = valueInEllipse * 2.15625;
	if (arcLength > 738) {
		arcLength = 738;
	} else if (arcLength < 0) {
		arcLength = 0;
	}
	page4EllipseSvg.style.strokeDashoffset = `${738 - arcLength}`;
	page4movingPoint.style.transform = `rotate(${arcLength * 0.4878}deg) translate(-50%, -50%)`;
	// page4movingPoint.style.transform = `rotate(${120}deg) translate(-50%, -50%)`;
};
page4Input.addEventListener('input', function () {
	page4Input.removeEventListener('blur', blurFirst);
	page4Input.removeEventListener('blur', blurBackspace);
	page4Input.placeholder = '';
	lineEllpsePage4();
	calculationPage4();
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
			if (!allMenu.classList.contains('active-menu')) { allMenu.classList.add('active-menu'); }
		} else {
			allMenu.classList.toggle('active-menu');
			aboutUs.classList.remove('active');
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


allMenu.addEventListener('click', function (event) {
	let targetUpBlockText = event.target.closest('.menu-upBlock-text')
	if (targetUpBlockText) {
		if (targetUpBlockText == menuUpBlockText1) {
			myPageSlider.slideTo(2, 500, false);
		} else if (targetUpBlockText == menuUpBlockText2) {
			myPageSlider.slideTo(3, 500, false);
		} else if (targetUpBlockText == menuUpBlockText3) {
			myPageSlider.slideTo(4, 500, false);
		} else if (targetUpBlockText == menuUpBlockText4) {
			myPageSlider.slideTo(5, 500, false);
		}
		allMenu.classList.remove('active-menu');

	} else {
		return;
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
let ExtraGallery = document.querySelector('.extra-gallery');
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



	if (targetMenuDownArrow) {
		aboutUs.classList.add('active');
		allMenu.classList.remove('active-menu');
	} else if (targetPage2DownFlexCnt) {
		aboutUs.classList.add('active');
	} else if (targetAboutUsDownBlockLink) {
		aboutUs.classList.remove('active');

	} else if (targetThankYouDownBlock) {
		allWrapper.classList.remove('thank');

	} else if (targetIconeCall) {
		allWrapper.classList.toggle('call');
	} else if (targetPage3GalleryElit) {
		eliteGallery.classList.add('active');
	} else if (targetPage3GalleryVip) {
		vipGallery.classList.add('active');
	} else if (targetPage3GalleryExtra) {
		ExtraGallery.classList.add('active');
	} else if (targetGalleruReturn) {
		eliteGallery.classList.remove('active');
		vipGallery.classList.remove('active');
		ExtraGallery.classList.remove('active');
	} else if (targetPage6Card) {
		document.querySelectorAll('.page6-card').forEach(element => {
			element.classList.remove('click');
		});
		targetPage6Card.classList.add('click');
		page4Hoverfun();
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
		console.log('1');
	}

	if (aboutUs.classList.contains('active') || allMenu.classList.contains('active-menu') || allWrapper.classList.contains('call') || allWrapper.classList.contains('thank')) {
		formMessage.classList.add('no-display');
		console.log('4');
	} else {
		formMessage.classList.remove('no-display');
		console.log('5');
	}
	if (myPageSlider.realIndex == 2) {
		formMessage.classList.add('no-display');
		console.log('6');
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
		ExtraGallery.classList.remove('active');
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
};
rearrangingBlocks();
















































const resize1 = function () {
	pageIndex();
	formMes();
	menuMess();
	rearrangingBlocks();
	page5IndexAction();
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



















































































const mainForm1 = document.forms[1];
const mainForm2 = document.forms[2];
const mainForm1Name = mainForm1.name;
const mainForm1Tel = mainForm1.tel;
const mainForm2Name = mainForm2.name;
const mainForm2Tel = mainForm2.tel;

const mainForm1NamePlaceholder = mainForm1Name.placeholder;
const mainForm1TelPlaceholder = mainForm1Tel.placeholder;



mainForm1Name.addEventListener("focus", function (event) {
	mainForm1Name.placeholder = "";
});
mainForm1Name.addEventListener("blur", function () {
	mainForm1Name.placeholder = mainForm1NamePlaceholder;
});

mainForm1Tel.addEventListener("focus", function (event) {
	mainForm1Tel.placeholder = "";
});
mainForm1Tel.addEventListener("blur", function () {

	mainForm1Tel.placeholder = mainForm1TelPlaceholder;
});

mainForm2Name.addEventListener("focus", function (event) {
	mainForm2Name.placeholder = "";
});
mainForm2Name.addEventListener("blur", function () {
	mainForm2Name.placeholder = mainForm1NamePlaceholder;
});

mainForm2Tel.addEventListener("focus", function (event) {
	mainForm2Tel.placeholder = "";
});
mainForm2Tel.addEventListener("blur", function () {
	mainForm2Tel.placeholder = mainForm1TelPlaceholder;
});

let errorName1 = document.querySelector('.error-name1');
let errorTel1 = document.querySelector('.error-tel1');
let errorName2 = document.querySelector('.error-name2');
let errorTel2 = document.querySelector('.error-tel2');





mainForm1.addEventListener('submit', function (event) {
	event.preventDefault();

	if (mainForm1Name.value.length > 1) {
		console.log('С именем порядок');

		if (mainForm1Tel.value.length > 10 && mainForm1Tel.value.length < 19) {
			//Message1();
			allWrapper.classList.add('thank');
			menuMess();
			allMenu.classList.remove('active-menu');
			aboutUs.classList.remove('active');
			allWrapper.classList.remove('call');
		}
	};
	if (mainForm1Name.value.length < 2) {
		errorName1.classList.add('active');
		mainForm1Name.classList.add('active');
	};
	console.log(mainForm1Tel.value.length < 11 || mainForm1Tel.value.length > 18);
	if (mainForm1Tel.value.length < 11 || mainForm1Tel.value.length > 18) {
		console.log('tel1');

		errorTel1.classList.add('active');
		mainForm1Tel.classList.add('active');
	};
});

mainForm2.addEventListener('submit', function (event) {
	event.preventDefault();

	if (mainForm2Name.value.length > 1) {
		console.log('С именем порядок');

		if (mainForm2Tel.value.length > 10 && mainForm2Tel.value.length < 19) {
			//Message2();
			allWrapper.classList.add('thank');
			menuMess();
			allMenu.classList.remove('active-menu');
			aboutUs.classList.remove('active');
			allWrapper.classList.remove('call');
		}
	};
	if (mainForm2Name.value.length < 2) {
		errorName2.classList.add('active');
		mainForm2Name.classList.add('active');
	};

	if (mainForm2Tel.value.length < 11 || mainForm2Tel.value.length > 18) {

		errorTel2.classList.add('active');
		mainForm2Tel.classList.add('active');
	};
});

allWrapper.addEventListener('input', function (event) {
	let inputTarget = event.target.closest('input');


	inputTarget.classList.remove('active');
	inputTarget.nextElementSibling.classList.remove('active');

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






























