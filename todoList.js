
const todoListForm =document.querySelector('#todoListForm');
const todoListInput =document.querySelector('.todoListInput');
const todoListAddBtn =document.querySelector('.todoListAddBtn');
const todoList =document.querySelector('.todoList');

let todo =[];  // list의 데이터를 받는 배열


function deleteList(event){ // list 제거하는 함수
    const li =event.target.parentElement;
    li.remove();
    todo =todo.filter((select)=> Number(li.id)!==select.id);   // Arrays.prototype.filter()
    // 내가 선택한 버튼의 li의 id값과 todo배열안의 객체의 id값들을 전부 비교  
    //  같은 id값을 가지는 요소를 제외하고  todo 배열을 다시 설정
    saveList();
}   

function makeList(inputObj){  // todoList 구조 만드는 함수
    const li =document.createElement('li');
    const span =document.createElement('span');
    span.innerText= inputObj.text;
    li.id =inputObj.id;
    const deleteBtn =document.createElement('button');
    const checkBox= document.createElement('input');
    const label =document.createElement('label');
    const span2 =document.createElement('span');

    checkBox.type='checkbox';
    checkBox.id= 'check_test_box';
    label.htmlFor='check_test_box';
    deleteBtn.innerText='X';

    todoList.appendChild(li);
    li.appendChild(checkBox);
    li.appendChild(label);
    label.appendChild(span2);
    li.appendChild(span);
    li.appendChild(deleteBtn);


    deleteBtn.addEventListener('click',deleteList);

    span.addEventListener('click',completeList);  // list 클릭시 가운데 줄 그어지고 체크표시 되게하는 함수
      
    function completeList(){
        li.classList.toggle('complete');
       
        if(checkBox.checked){
           checkBox.checked=false;
           inputObj.complete= false;
        }
        else{
          checkBox.checked= true;
          inputObj.complete= true;
        }
        saveList();
    }

    if(inputObj.complete===true){
        li.classList.add('complete');
        checkBox.checked=true;

    }
    else{
        li.classList.remove('complete');
        checkBox.checked =false;
    }

}

function uploadList(event) {
    event.preventDefault();
    const inputText = todoListInput.value;
    todoListInput.value = "";

    const inputObj = {
        id: Date.now(),
        text: inputText,
      
    };
    makeList(inputObj);
    todo.push(inputObj);
    saveList();
}


function saveList(){   // localstorage에 todoList 데이터 저장하는 함수
    localStorage.setItem('todos',JSON.stringify(todo));   // todo는 배열객체
    //localstorage에는 문자열만 저장된다. 따라서 배열을 저장하려면 stringify를 이용해서 문자열로 변환시켜야한다.
}


todoListForm.addEventListener('submit',uploadList);

let savedList=localStorage.getItem('todos');
if(savedList){
    const parsedList =JSON.parse(savedList);   // localstorage에서 가져온 문자열들을 다시 배열로 바꿔주는 역할 // parseList는 배열
    todo =parsedList;
    parsedList.forEach(makeList);

}
