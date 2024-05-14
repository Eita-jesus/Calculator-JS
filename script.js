// Em Java Script é uma boa prática iniciar as variaveis com zero ou vario;

let ruuningTotal = 0;
let buffer = "0";
let previousOperador ;

const screen = document.querySelector('.screen')


//Funcao resposavel por validar se é um numero ou um simbolo.
function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){

    switch(symbol){
        case 'C':
            buffer = '0';
            ruuningTotal = 0;
            break;
        case '=':
            if(previousOperador === null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperador = null;
            buffer = ruuningTotal;
            ruuningTotal = 0;
            break;
            
        case '←':
            if(buffer.length === 1){
                buffer = '0'
            }else{
                buffer = buffer.toString(0, buffer.length -1 )
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break
    }
}

    function handleMath(symbol){
        if (buffer === '0'){
            return;
        }
        const intBuffer = parseInt(buffer);

        if (ruuningTotal === 0){
            ruuningTotal = intBuffer;
        }else{
            flushOperation(intBuffer);
        }
        previousOperador =symbol;
        buffer = '0'
    }

    function flushOperation(intBuffer){
        if (previousOperador === '+'){
            ruuningTotal += intBuffer;
        }else if(previousOperador === '−'){
            ruuningTotal -= intBuffer;
        }else if(previousOperador === '×'){
            ruuningTotal *=intBuffer;
        }else if(previousOperador === '÷' ){
            ruuningTotal /= intBuffer;
        }
    }

    function handleNumber(numberString){
        if (buffer === "0"){
            buffer = numberString;
        }else{
            buffer += numberString;
        }
    }



function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}


init();