// Em Java Script é uma boa prática iniciar as variaveis com zero ou vazio, além disso é sempre importante declarar elas no inicio do código;

let ruuningTotal = 0;
let buffer = "0";
let previousOperador ;

const screen = document.querySelector('.screen')

//Primeiro passo foi criar minha funcao ouvinte, ela vai no DOM e fica escutando ou aguardando o botão ser clicado.Após ser clicado ela vai chamar a funcao buttonClick e passar o valor dela.

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

//Aqui estou apenas chamando essa funcão, como se tivesse deixando ela ligada (ATIVO)
init();

//Funcao resposavel por validar se é um numero ou um simbolo.
//Recebo um valor e vejo é número ou não.
//Depois que faco essa validacao o screen.innerText = buffer, fica quietinho para ser executado no final do código.

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}


//Caso seja um Simbolo vamos realizar a operacao.
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
            //Aqui é uma chamada da funcao que realiza a operacao
            flushOperation(parseInt(buffer));
            //Depois que realizo minhas operacoes matematicas atribuo zero nos metodos. 
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


    //Controlador, responsavel por antes de realizar a operacao matemática, ver se o valor das parcela seria zero ou nao, caso seja zero nao ha operacao matemática tenha um valor vai chamar a funcao por realixar o calculo matematico
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
        previousOperador = symbol;
        buffer = '0'
    }

    //funcao responsável por realixar a operacao matematica
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

    //Essa funcao é apenas um tratamento, imagina que digitassemos 1 em seguida 0, que é 10, se não ouvesse esse tratamento nao conseguiriamos tratar os numeros mais casas decimais.
    function handleNumber(numberString){
        if (buffer === "0"){
            buffer = numberString;
        }else{
            //aqui é uma concatenacao de numeros no formato String 
            buffer += numberString;
            //buffer = buffer + numberString
        }
    }



