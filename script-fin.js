 $(document).ready(function(){
	
 	// открытие модального окна
 	$(".progressbar_fin li").on("click", function(){
 		var $this = $(this);
 		var $modal = $("#modal");
 		var $trigger = false;
 		// Ищем элементы с классом фолс, чтобы запретить дальнейшую обработку
 		$(".progressbar_fin li").each(function(){
 			// Если наiли, то ставим триггер в положение фолс
 			if($(this).hasClass("fail")){
 				$trigger = true;
 			}
 		});
 		// Проверяем завершенность предыдущего этапа
 		if($(this).prev().hasClass("progresel_fin") && 
 			!$(this).prev().hasClass("complete") ||
 			$(this).prev().hasClass("preparing")){
 			return false;
 		}
 		if(!$(this).next().hasClass("progresel_fin")){
 			return false;	
 		}
 		// Проверяем завершенность текущего этапа
 		if($(this).hasClass("complete") || $trigger) 
 			return false;
 		// Открываем модальное окно
 		if($modal.hasClass("hide")){
 			showHideModal($modal, "hide", "show", $this.attr("id"));
 		}else{
 			showHideModal($modal, "show", "hide", "");
 		}
 	});

 	// Обработка действий модали
 	$("#variants li").on("click", function(){
 		$modal  = $("#modal");
 		// Соответствует идентификатору прогрессбара
 		$hidVal = $modal.find('input[type="hidden"]').val();
 		$attr   = $(this).attr("varius");
 		eventMy($hidVal, $attr);

 		showHideModal($modal, "show", "hide", "");
 	})

 });

 var eventMy = function(step, action){
 	var $thisStep = $("#"+step);
 	var $category = $("."+step);
 	var $class;
 	switch(action){
 		case "1":
 			$classSt  = "active complete";
 			$classCat = "circle-color-lime";
 			break;
 		case "2":
 			$classSt  = "preparing";
 			$classCat = "circle-fin-color-orange";
 			break;
 		case "3":
 			$classSt  = "fail";
 			$classCat = "circle-fin-color-red";
 			break;
 		default:
 			console.log("Неправильный тип");
 			break;			
 	}
 	$thisStep.attr("class", $classSt);
 	$category.find(".circle").addClass($classCat);
 }
 // Функция открытия модального окна
 var showHideModal = function(context, classNameRenove, classNameAdd, hideValue){
 	context.removeClass(classNameRenove);
 	context.addClass(classNameAdd);
 	context.find('input[type="hidden"]').val(hideValue);
 }