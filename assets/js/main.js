Fancybox.bind("[data-fancybox]", {
    // Your custom options
});

// animation 
const animationItems = document.querySelectorAll('.animation-item');
if (animationItems.length > 0) {
    function onEntry(e) {
        e.forEach(e => {
            e.isIntersecting && e.target.classList.add("animation-active")
        }
        )
    }
    let options = {
        threshold: [.5]
    }, observer = new IntersectionObserver(onEntry, options)
    for (let e of animationItems)
        observer.observe(e);
}
// end animation

/* hide header */
let scrollWidthFunc = () => {
    let scrollWidth = window.innerWidth - document.body.clientWidth;
    document.querySelector('html').style.paddingRight = scrollWidth + 'px';
    // if(window.innerWidth < 768) {
    //     document.querySelector('header').style.paddingRight = scrollWidth + 'px';
    // }
}
const scrollTop = document.querySelector('.scroll-top');
if (scrollTop)
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

// ['load', 'resize'].forEach((event) => {
//     window.addEventListener(event, function () {
//         let headerHeight = header.clientHeight;
//         const plashka = header.querySelector('.header__plashka');
//         const headerTop = header.querySelector('.header__top');
//         if (plashka) {
//             var originalHeightPlashka = plashka.offsetHeight;
//             var originalHeightHeaderTop = headerTop.offsetHeight;
//         }
//         window.onscroll = function (e) {
//             if (window.scrollY > headerHeight) {
//                 if (!plashka.classList.contains('hide')) {
//                     plashka.classList.add('hide');
//                     plashka.style.height = '0px';
//                     plashka.style.opacity = '0';
//                     plashka.style.overflow = 'hidden';

//                     if(window.innerWidth > 1260) {
//                         headerTop.classList.add('hide');
//                         headerTop.style.height = '0px';
//                         headerTop.style.opacity = '0';
//                         headerTop.style.overflow = 'hidden';
//                     }
//                 }
//             }
//             else {
//                 plashka.style.height = originalHeightPlashka + 'px';
//                 plashka.classList.remove('hide');
//                 plashka.style.opacity = '1';

//                 headerTop.style.height = originalHeightHeaderTop + 'px';
//                 headerTop.classList.remove('hide');
//                 headerTop.style.opacity = '1';
//                 headerTop.style.overflow = 'visible';
//             }
//         };
//     })
// })
/* hide header */


document.addEventListener("DOMContentLoaded", function () {
    /* burger menu */
    const burgerMenu = document.querySelector('.burger');
    if (burgerMenu) {
        const headerMobile = document.querySelector('.header__menu');
        const header = document.querySelector('.header');
        burgerMenu.addEventListener("click", () => {
            if (burgerMenu.classList.contains('active')) {
                document.body.classList.remove('burger-lock');
            }
            else {
                document.body.classList.add('burger-lock');
            }
            headerMobile.classList.toggle("open");
            burgerMenu.classList.toggle("active");
            header.classList.toggle("header--active");

            document.querySelector('html').classList.toggle('burger-lock');
        });
    }
    /* end burger menu */


    /*  open menu  */
    const headerNavItems = document.querySelectorAll('.hide-item');

    // Обработчик для всех headerNavItems
    document.addEventListener('click', (e) => {
        const clickedItem = e.target.closest('.hide-item');
        const clickedSubmenu = e.target.closest('.header__nav-submenu');
        
        // Если кликнули на submenu - ничего не делаем
        if (clickedSubmenu) {
            e.stopPropagation();
            return;
        }
        
        // Если кликнули на элемент меню
        if (clickedItem) {
            const submenu = clickedItem.querySelector('.header__nav-submenu');
            
            clickedItem.classList.toggle('hide-item--active');
            
            // Рассчитываем высоту при открытии
            if (clickedItem.classList.contains('hide-item--active') && submenu) {
                // Сбрасываем стили для расчета
                submenu.style.cssText = 'max-height: none; visibility: hidden; display: block;';
                const contentHeight = submenu.scrollHeight;
                submenu.style.cssText = `max-height: 0; transition: max-height 0.3s ease; overflow: hidden;`;
                
                // Устанавливаем анимированную высоту
                requestAnimationFrame(() => {
                    submenu.style.maxHeight = contentHeight + 'px';
                });
            } else if (submenu) {
                submenu.style.maxHeight = '0';
            }
        }
    });

    // Дополнительная защита от закрытия при клике на submenu
    document.querySelectorAll('.header__nav-submenu').forEach(submenu => {
        submenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
    /*  end menu  */



    // Popups
    function popupClose(popupActive) {
        popupActive.classList.remove('open');
        setTimeout(() => {
            if (!popupActive.classList.contains('open')) {
                popupActive.classList.remove('active');
            }
        }, 400);
        document.body.classList.remove('lock');
        document.querySelector('html').style.paddingRight = 0;
        document.querySelector('html').classList.remove('lock');
        document.querySelector('header').removeAttribute('style');


    }
    const popupOpenBtns = document.querySelectorAll('.popup-btn');
    const popups = document.querySelectorAll('.popup');
    const originalTitlePopup2 = document.querySelector('.original-title')?.innerHTML;
    const closePopupBtns = document.querySelectorAll('.close-popup-btn');
    closePopupBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            popupClose(e.target.closest('.popup'));
        });
    });
    popupOpenBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            const path = e.currentTarget.dataset.path;
            const currentPopup = document.querySelector(`[data-target="${path}"]`);
            if (currentPopup) {
                popups.forEach(function (popup) {
                    popupClose(popup);
                    popup.addEventListener('click', function (e) {
                        if (!e.target.closest('.popup__content')) {
                            popupClose(e.target.closest('.popup'));
                        }
                    });
                });
                currentPopup.classList.add('active');
                setTimeout(() => {
                    currentPopup.classList.add('open');
                }, 10);
                if (currentPopup.getAttribute('data-target') == 'popup-change') {

                    let originaTitle = currentPopup.querySelector('.original-title');
                    if (el.classList.contains('change-item__btn')) {

                        if (el.classList.contains('doctor__btn-js')) {
                            let currentItem = el.closest('.change-item');
                            let currentTitile = currentItem.querySelector('.change-item__title');
                            originaTitle.innerHTML = 'Записаться на приём к врачу: ' + currentTitile.innerHTML
                        }
                        else {
                            if (el.classList.contains('change-item__btn_current')) {
                                originaTitle.textContent = el.textContent;
                            }
                            else {
                                let currentItem = el.closest('.change-item');
                                let currentTitile = currentItem.querySelector('.change-item__title');
                                originaTitle.innerHTML = currentTitile.innerHTML
                            }
                        }
                    }
                    else {
                        originaTitle.innerHTML = originalTitlePopup2;
                    }
                }

                if (currentPopup.getAttribute('data-target') == 'popup-jobs') {
                    let currentItems = el.closest('.jobs__items') 
                    let originalText = currentPopup.querySelector('.jobs__inner_original');
                    if(originalText && currentItems.querySelector('.jobs__inner')) {
                        originalText.innerHTML = currentItems.querySelector('.jobs__inner').innerHTML;
                    }
                }
                e.stopPropagation();
                scrollWidthFunc();
                document.querySelector('html').classList.add('lock');
            }
        });
    });
    // end popups


    /* yandex map */
    const mapPlaceholder = document.getElementById('map-placeholder');
    loadMap();

    function loadMap() {
        if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
            script.onload = initMap;
            document.head.appendChild(script);
        } else {
            initMap();
        }
    }
    
    function initMap() {
        const mapPlaceholder = document.getElementById('map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.remove();
        }
    
        ymaps.ready(function () {
            const myMap = new ymaps.Map('map', {
                center: [47.249427, 39.705203],
                zoom: 13,
                controls: []
            });
    
            const myPlacemark = new ymaps.Placemark(
                [47.249427, 39.705203],
                {
                    hintContent: 'Heavy Traffic',
                    balloonContent: 'Heavy Traffic'
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: 'assets/img/icons/map-pin.png', 
                    iconImageSize: [54, 70],
                    iconImageOffset: [-25, -75],
                }
            );
    
            myMap.geoObjects.add(myPlacemark);
            //myMap.behaviors.disable(['scrollZoom']);
        });
    }
    /* end yandex map */


    /*  accordion  */
	const acc = document.getElementsByClassName('accordion')
	for (let i = 0; i < acc.length; i++) {
        if(acc[i]) {
            acc[i].addEventListener('click', function () {
                const accContent = this.querySelector('.accordion__content')  || this.parentElement.querySelector('.accordion__content') 
                if (accContent.classList.contains('accordion__content--active')) {
                    accContent.classList.remove('accordion__content--active');
                    this.classList.remove('accordion--active');
                    accContent.style.maxHeight = '0'; 
                } else {
                    accContent.classList.add('accordion__content--active');
                    this.classList.add('accordion--active');
    
                    const contentHeight = accContent.scrollHeight;
                    accContent.style.maxHeight = `${contentHeight}px`;
                }
            })
        }
	}
	/*  end accordion   */


    const fileInput = document.getElementById('resume');
    const fileDisplay = document.getElementById('file-display');
    
    // Для одиночного файла (если нужен только один файл)
    fileInput.addEventListener('change', function(e) {
        fileDisplay.innerHTML = ''; // Очищаем предыдущие файлы
        
        if (this.files.length > 0) {
            const file = this.files[0];
            createFileElement(file);
        }
    });
    
    // Для множественного выбора файлов (если нужно несколько)
    // fileInput.addEventListener('change', function(e) {
    //     fileDisplay.innerHTML = '';
    //     
    //     Array.from(this.files).forEach(file => {
    //         createFileElement(file);
    //     });
    // });
    
    function createFileElement(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileName = document.createTextNode(file.name);
        
        const removeBtn = document.createElement('span');
        removeBtn.className = 'file-remove';
        removeBtn.innerHTML = '×';
        removeBtn.title = 'Удалить файл';
        
        removeBtn.addEventListener('click', function() {
            fileItem.remove();
            clearFileInput();
            // Если нужно удалить конкретный файл из FileList при множественном выборе
            // это сложнее и требует другого подхода
        });
        
        fileItem.appendChild(fileName);
        fileItem.appendChild(removeBtn);
        fileDisplay.appendChild(fileItem);
    }
    
    function clearFileInput() {
        // Создаем новый input file чтобы сбросить значение
        const newInput = fileInput.cloneNode(true);
        fileInput.parentNode.replaceChild(newInput, fileInput);
        
        // Обновляем ссылки и обработчики
        const updatedInput = document.getElementById('resume');
        updatedInput.addEventListener('change', function(e) {
            fileDisplay.innerHTML = '';
            if (this.files.length > 0) {
                const file = this.files[0];
                createFileElement(file);
            }
        });
    }


    /*  tab  */
	const showTab = elTabBtn => {
		const elTab = elTabBtn.closest('.tab');
		if (elTabBtn.classList.contains('active')) {
			return;
		}
		const targetId = elTabBtn.dataset.id;
		const elTabPanes = elTab.querySelectorAll(`.tab-content[data-id="${targetId}"]`);

		const elTabBtnActive = elTab.querySelector('.tab-btn.active');
		if (elTabBtnActive) {
			elTabBtnActive.classList.remove('active');
		}

		const elTabPaneShow = elTab.querySelectorAll('.tab-content.active');
		elTabPaneShow.forEach(pane => pane.classList.remove('active'));

		elTabBtn.classList.add('active');
		elTabPanes.forEach(pane => pane.classList.add('active'));
	};

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabMobile = document.querySelector('.team__tab-mobile');
    const tabInner = document.querySelector('.team__tab-inner');
	tabButtons.forEach(btn => {
        if(btn) {
            btn.addEventListener('click', function (e) {
                showTab(this);
                quantityElem();

                if (tabMobile && tabInner) {
                    tabInner.textContent = this.textContent;
                    tabMobile.classList.remove('active');
                }
            });            
        }
	});
	/*  end tab */

    // tab Mobile
	//const tabMobile = document.querySelector('.team__tab-mobile');
    if (tabMobile) {
        const tabTop = tabMobile.querySelector('.team__tab-top');
        tabTop.addEventListener('click', () => {
            tabMobile.classList.toggle('active');
        })
    }



    // quantity-card
    function quantityElem() {
        const quantityCards = document.querySelectorAll('.quantity-card');
        const quantityElement = document.querySelector('.quantity span');
        if (quantityElement) {
            let visibleCards = 0;
            quantityCards.forEach(card => {
                if (card.offsetParent !== null) {
                    visibleCards++;
                }
            });
            quantityElement.textContent = visibleCards;
        }
    }
    setTimeout(quantityElem, 100);


    /*  btn more  */
    const moreBtns = document.querySelectorAll('.btn-more');
    moreBtns.forEach(moreBtn => {
        if (moreBtn) {
            const moreContent = moreBtn.previousElementSibling ? moreBtn.previousElementSibling : moreBtn.nextElementSibling;

            if (moreContent.scrollHeight <= moreContent.clientHeight) {
                moreBtn.style.display = 'none'; 
            } else {
                const textBtn = moreBtn.innerHTML; 
                moreBtn.addEventListener('click', function() {
                    const heightMoreContent = moreContent.style.maxHeight; 
                    moreContent.classList.toggle('active');
                    this.classList.toggle('active');

                    if (moreContent.style.maxHeight) {
                        moreContent.style.maxHeight = null;
                        this.textContent = textBtn;
                    } else {
                        moreContent.style.maxHeight = moreContent.scrollHeight + "px"; 
                        this.textContent = 'Свернуть';
                    }
                });
            }
        }
    });
    /*  end btn more  */


    /*   scrollTop  */
	const buttonsUp = document.querySelectorAll('.is-scroll-up')
    buttonsUp.forEach(buttonUp => {
        if (buttonUp) {
            buttonUp.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            })
        }
    });
    /*   end scrollTop  */

})


