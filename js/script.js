//selecionando elementos
const previousOperationText=document.querySelector("#previous-operation");
const currentOperationText=document.querySelector("#current-operation");
const buttons=document.querySelectorAll("#buttons-container button");


   //class | regras da aplicação..
class Calculadora{
     constructor(previousOperationText,currentOperationText)
     {
         //Valores digitados em tela
        this.previousOperationText=previousOperationText;
        this.currentOperationText=currentOperationText;
        //valores digitados no momento
         this.currentOperation="";

     }

       //inserindo numeros
      addNumber(addNumber){
        //verificar se entre os valores já digitados,contém ponto..
         if(addNumber ==="." && this.currentOperationText.innerText.includes(".")){
           return;    
         }
           console.log(addNumber)
           this.currentOperation=addNumber;
           this.updateDisplay();
      }
      //mudando valor da tela
      updateDisplay(
        operacaoValue = null,
        operacao = null,
        current=null,
        previous=null)
     {
       
         //concatena os valores digitados...
         if(operacaoValue===null)
         {
            this.currentOperationText.innerText +=this.currentOperation;
         }else{
             if(previous===0){
                 operacaoValue=current;
             }
             //adicionar o valor na tela
            this.previousOperationText.innerText = `${operacaoValue} ${operacao}`;
          
            this.currentOperationText.innerText="";
         }
         
      }

      //Efetua operações
       processOperation(operacao){
         //Verifica se o segundo valor da operção está vazio
          if(this.currentOperationText.innerText==="" && operacao!=="C"){
             if(this.previousOperationText.innerText!==""){
                 //muda de operação
                   this.changeOperacao(operacao);
                 
             }
             return;
          }
         //selecionando o atual e o antigo valor digitado
         let operacaoValue;
         const previous = +this.previousOperationText.innerText.split(" ")[0];
         const current = +this.currentOperationText.innerText;  

         
         switch(operacao){
             
            case "+":
               operacaoValue=previous+current;
               this.updateDisplay(operacaoValue,operacao,current,previous);
                break;
                case "-":
                    operacaoValue=previous-current;
                    this.updateDisplay(operacaoValue,operacao,current,previous);
                     break;
           case "/":
                    operacaoValue=previous/current;
                    this.updateDisplay(operacaoValue,operacao,current,previous);
                     break;
            case "*":
                        operacaoValue=previous*current;
                        this.updateDisplay(operacaoValue,operacao,current,previous);
                         break; 
            case "=":
                            this.showResult()
                             break; 
            
           
            console.log(operacaoValue)
            this.updateDisplay(operacaoValue,operacao,current,previous);
                                 break; 
            case "DEL":
                   this.deleteNumber()
                 break;
            case "CE":
                    this.clearOperacaoCurrent()
                  break; 
            case "C":
                    this.clearAll()
                  break;         
            default:
                return;
                break;
         }


       }
       //mudando de operação
       changeOperacao(operacao){
          //default array de opercões disponiveis
           const mathOperacao=["+","/","-","*"];
           //verificar se operação digitada está disponivel
           if(!mathOperacao.includes(operacao)){
             return;
           }
         this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1)+ operacao;
       }
       //apaga o último número digitado
       deleteNumber(){
          this.currentOperationText.innerText=this.currentOperationText.innerText.slice(0,-1);
       }
       //Limpa o segundo operando;
       clearOperacaoCurrent(){
         this.currentOperationText.innerText="";
       }
       clearAll(){
        this.currentOperationText.innerText="";
        this.previousOperationText.innerText="";
      }
      //Mostrar resultado de uma operação
      showResult(){
         const operacao = this.previousOperationText.innerText.split(" ")[1];
           this.processOperation(operacao);
      }
}

const calc=new Calculadora(previousOperationText,currentOperationText);
//Eventos
   
buttons.forEach((btn)=>{
      btn.addEventListener("click",(e)=>{
          let btnValue=e.target.innerText;
          if(+btnValue>=0 || btnValue==='.'){
              calc.addNumber(btnValue);
          }else{
             
              
              calc.processOperation(btnValue);
              
          }
      })
 })
 