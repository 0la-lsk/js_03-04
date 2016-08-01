var numQuestions = 3;
var numAnswers = 3;

//test patern
function myTest (question) {
	this.question = question;
	this.answers = [];
}

function pushQuestions (s) {
	this.question = s;
};
function setAnswers (s) {
	this.answers = s;
}

function initTest (numTests) {
	var Test = [];
	for ( var i = 0; i < numTests; i++) {
		Test[i] = new myTest('');
		Test[i].pushQuestion = pushQuestions;
		Test[i].setAnswer = setAnswers;
	}
	return Test;
}

var exampleTest = initTest(numQuestions);

var stringQuestion = "Вопрос";
var stringAnswer = "Вариант ответа";
var testHeader = "Тест по программированию";
var testResultbtn = "Проверить мои результаты";

var arrAnswers = [];
for (var i = 0; i < numAnswers; i++) arrAnswers[i] = stringAnswer + " № " + (i+1);

for (var i = 0; i < exampleTest.length; i++) {
	exampleTest[i].pushQuestion(stringQuestion + " № "+(i+1));
	exampleTest[i].setAnswer(arrAnswers); 	
}
//endof test patern


//DOM

var DOM_test = {
	elForm: 'form',
	elFieldset: 'fieldset',
	elP: 'p',
	elLabel: 'label',
	elInput: 'input',
	createElemForm:function () {
		var el = document.createElement(this.elForm);
		el.className = 'test--block';
		return el;
	},
	createElemFieldset:function () {
		var el = document.createElement(this.elFieldset);
		el.className = 'test--questions';
		return el;
	},
	createElemP:function (s) {
		var el = document.createElement(this.elP);
		el.innerHTML = s;
		return el;
	},
	createElemLabel:function (id, s) {
		var el = document.createElement(this.elLabel);
		el.htmlFor=id;
		el.innerHTML = s;
		return el;
	},
	createElemChkBox:function (id, name) {
		var el = document.createElement(this.elInput);
		el.setAttribute("id", id);
		el.setAttribute("name", name);
		el.setAttribute("type", "checkbox");
		return el;
	},
	createElemSubmit:function (s) {
		var el = document.createElement(this.elInput);
		el.setAttribute("id", "id_submit");
		el.setAttribute("name", "test_submit");
		el.setAttribute("type", "submit");
		el.className = 'btn--submit';
		el.setAttribute("value", s);
		return el;
	},	
	appendElem:function (parent, node) {
		parent.appendChild(node);
	},
	insertElem:function(parent, node) {
		parent.insertBefore(node, parent.firstChild);
	}
}


function initTestDOM () {
//form
	var form = DOM_test.createElemForm();

	DOM_test.appendElem( form, DOM_test.createElemP( testHeader ) );//test Header

	for ( var i = 0; i < numQuestions; i++ ) {//question+answers blocks
		var question_set = DOM_test.createElemFieldset();

		var question = DOM_test.createElemP( exampleTest[i].question );
		DOM_test.appendElem( question_set, question );

		for ( var j = 0; j < numAnswers; j++ ) {
			var id_num = "id" + (i+1).toString() + (j+1).toString();
			var label = DOM_test.createElemLabel( id_num, exampleTest[i].answers[j] );
			var input = DOM_test.createElemChkBox( id_num, "name" + (i+1) );
			DOM_test.insertElem( label, input );
			DOM_test.appendElem( question_set, label );
		}

		DOM_test.appendElem( form, question_set );//endof question+answers blocks
	};

	DOM_test.appendElem( form, DOM_test.createElemSubmit(testResultbtn) ); //submit button
	document.body.insertBefore( form, document.body.firstChild ); //insert form before all
//end form
};

initTestDOM();


