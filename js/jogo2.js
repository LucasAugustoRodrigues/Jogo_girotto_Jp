const challenges = [
    {
        explanation: "Na Cifra de César com deslocamento -1, o objetivo é alterar a posição de cada letra no alfabeto, mas, em vez de mover para a direita (como na cifra tradicional com deslocamento positivo), você move para a esquerda, ou seja, cada letra será substituída pela letra imediatamente anterior no alfabeto. Como funciona: O deslocamento -1 implica que, para cada letra no texto, você a substitui pela letra anterior no alfabeto. Se a letra for a primeira do alfabeto (como 'A'), ela 'volta' para a última letra (como 'Z').",
        question: "Decifre: AZKOPL GF DEREWQ (Dica: Deslocamento de -1)",
        answer: "zyjnok fe cdqdvp",
        hint: "/image/cifra-de-cesar.png" 
    },
    {
        explanation: "Quando a chave é maior que o texto na Cifra de Vigenère, você tem algumas opções de como lidar com isso, dependendo do que você deseja alcançar. A cifra tradicionalmente requer que a chave seja repetida para cobrir o texto completo, mas quando a chave é maior, você pode seguir diferentes abordagens; Usar apenas os primeiros caracteres da chave: A solução mais simples é usar apenas os primeiros caracteres da chave que correspondem ao comprimento do texto. Isso significa que, se a chave for maior do que o texto, apenas a quantidade necessária de caracteres da chave será utilizada. Usar a chave maior em blocos: Em vez de usar a chave inteira para cifrar o texto de uma vez, você pode também dividir o texto e a chave em blocos. Isso é mais complexo e não é comumente aplicado na cifra de Vigenère tradicional, mas poderia ser uma solução interessante dependendo do contexto.  Cada letra é convertida para seu valor numérico no alfabeto (A=0, B=1, C=2, ..., Z=25).",
        question: "Texto Original: EQWEFAS - Chave: LONGKEYEXTRA",
        answer: "tcjywu",
        hint: "/image/cifra-de-multi.png"
    },
    {
        explanation: "Cifra de César com Multiplicação, também chamada de Cifra Afim quando combinada com deslocamento. Neste método, além de realizar o deslocamento simples como na Cifra de César tradicional, é aplicado um fator de multiplicação antes do deslocamento. A fórmula geral para criptografia é: c = (a . p + b), P: Representação numérica da letra do texto original (A= 0, B= 1,...,z = 25) a: Fator de multiplicação (deve ser coprimo de 26, ou seja, mdc(a,26) = 1, para garantir que o texto seja descriptografável) b: Deslocamento (como na Cifra de César) c: Representação numérica da letra cifrada.",
        question: "Texto original: QWEID FE DAWAD - Fator de multiplicação: a = 7 - Deslocamento: b = 3",
        answer: "lbfhy mf bdybd",
        hint: "/image/ex1-mod26.png"
    }
];
let currentChallenge = 0;
let attemptsLeft = 3;

const successSound = new Audio('/sound/Correct.mp3'); 
const errorSound = new Audio('/sound/Error.mp3'); 
function showExplanation() {
    document.getElementById("explanation").innerText = challenges[currentChallenge].explanation;
    document.getElementById("challenge").style.display = "none";
    document.getElementById("answer").style.display = "none";
    document.getElementById("submit").style.display = "none";
    document.getElementById("hint").style.display = "none";
    document.getElementById("attempts").style.display = "none";
    document.getElementById("hintImage").style.display = "none";
    document.getElementById("feedback").innerText = "";
    document.getElementById("next").style.display = "block";
}

function startChallenge() {
    document.getElementById("challenge").innerText = challenges[currentChallenge].question;
    document.getElementById("challenge").style.display = "block";
    document.getElementById("answer").style.display = "block";
    document.getElementById("submit").style.display = "inline-block";
    document.getElementById("hint").style.display = "inline-block";
    document.getElementById("attempts").style.display = "block";
    document.getElementById("next").style.display = "none";
    attemptsLeft = 3;
    document.getElementById("attemptsCount").innerText = attemptsLeft;
}

function loadNext() {
    if (currentChallenge < challenges.length) {
        showExplanation();
    } else {
        const body = document.body;
        body.innerHTML = "<center> <h1>!@#$V0cê cOnseguiu !nv4dir o $istEma*!#@</h1> </center>";
        
        setTimeout(() => {
            window.location.href = "/paginas/historia-final.html";
        }, 5000);
    }
}
document.getElementById("next").addEventListener("click", startChallenge);

document.getElementById("submit").addEventListener("click", () => {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    const correctAnswer = challenges[currentChallenge].answer;

    if (userAnswer === correctAnswer) {
        successSound.play(); // Reproduz som de sucesso
        alert("Parabéns! Você conseguiu desencriptar a mensagem!");
        currentChallenge++;
        loadNext();
    } else {
        attemptsLeft--;
        errorSound.play(); 
        if (attemptsLeft > 0) {
            document.getElementById("feedback").innerText = "Resposta incorreta. Tente novamente!";
        } else {
            alert("Você foi descoberto ;<");
            currentChallenge = 0;
            loadNext();
        }
    }
    document.getElementById("attemptsCount").innerText = attemptsLeft;
});

document.getElementById("hint").addEventListener("click", () => {
    const hintImage = document.getElementById("hintImage");
    const feedback = document.getElementById("feedback");
    hintImage.src = challenges[currentChallenge].hint;
    hintImage.style.display = "block";
    const hintMessages = [
        "A cifra de César usa deslocamento circular no alfabeto, quando negativo ela pecorre de acordo com o alfabeto (direita), e positivo percorre para a esquerda.",
        "Descarte a parte extra da chave que excede o comprimento do texto. Após aplicar a chave até o final do texto, a parte restante da chave não será usada. Faça a soma dos valores do texto original e da chave, caso resultar em um número maior que 25, use o módulo 26 para ajustá-lo ao intervalo de 0 a 25.",
        "Apos a soma dos valores entre a chave e o texto, Se um deslocamento resultar em um número maior que 25 ou negativo, use o módulo 26 para ajustá-lo ao intervalo de 0 a 25."
    ];
    feedback.innerText = hintMessages[currentChallenge];
});

showExplanation();
