const PageMain = document.querySelector("main");
const PageRoot = document.querySelector(":root");
const Input = document.getElementById("input");
const ResInput = document.getElementById("result");

const AllowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

//Clear Input
document.getElementById("clear").addEventListener("click", function () {
    Input.value = "";
    Input.focus(); //Seleciona o Input Apos o Campo Ser Limpo.

    ResInput.value = "";
    
    if(ResInput.classList.contains("error"))
    {
        ResInput.classList.remove("error");
    }
})

//Atribuir O Botão De Igual Para Retornar O Resultado:
document.getElementById("equal").addEventListener("click", Calculate)

document.querySelectorAll(".charKey").forEach(function (AllBtn)
{
    AllBtn.addEventListener("click", function (){
        const Value = AllBtn.dataset.value
        Input.value += Value;
    })
})

Input.addEventListener("keydown", function (Event) {
    Event.preventDefault()

    if(AllowedKeys.includes(Event.key)) //Se a Tecla Estiver Incluida No Array Acima:   
    {
        Input.value += Event.key //Adicionamos a Tecla Ao Valor Atual DO Input
        return
    }

    if(Event.key === "Backspace")
    {
        Input.value = Input.value.slice(0, -1) //"Corto" O Valor Atual de 0 (Char. Inicial) até -1(Penultimo Char.) 
    }

    if(Event.key === "Enter")
    {
        Calculate()
    }
})

function Calculate()
{
    ResInput.value = "Error";
    ResInput.classList.add("error");

    const Result = eval(Input.value);
    ResInput.value = Result

    ResInput.classList.remove("error");
}

document.getElementById("themeSwitcher").addEventListener("click", function (){
    if(PageMain.dataset.theme === "dark")
    {
        PageRoot.style.setProperty("--bg-color", "#F1F5F9");
        PageRoot.style.setProperty("--border-color", "#aaa")
        PageRoot.style.setProperty("--font-color", "#212529")
        PageRoot.style.setProperty("--primary-color", "#26834A")
        PageMain.dataset.theme = "light";
    }
    else
    {
        PageRoot.style.setProperty("--bg-color", "#212529");
        PageRoot.style.setProperty("--border-color", "#666")
        PageRoot.style.setProperty("--font-color", "#F1F5F9")
        PageRoot.style.setProperty("--primary-color", "#4DFF91")
        PageMain.dataset.theme = "dark";
    }
})

document.getElementById("copyToClipboard").addEventListener("click", function (Event) 
{
    const button = Event.currentTarget;
    if(button.innerText === "Copy")
    {
        button.innerText = "Copied!";
        button.classList.add("success")
        navigator.clipboard.writeText(ResInput.value)
    }
    else
    {
        button.innerText = "Copy";
        button.classList.remove("success");
    }
})

