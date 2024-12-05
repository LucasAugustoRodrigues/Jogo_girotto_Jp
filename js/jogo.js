const challenges = [
    {
        explanation: "A Cifra de César é uma cifra de substituição monoalfabética simples, onde cada letra do texto é deslocada por um número fixo de posições no alfabeto. A chave define esse deslocamento, e o processo é circular, ou seja, após a última letra, volta-se para o início do alfabeto. Para encriptar, a fórmula usada é C = (P + k) mod 26, onde P é a posição da letra original, k é o valor da chave e C é a letra cifrada. Para decriptar, utiliza-se P = (C - k) mod 26. Embora a cifra seja fácil de entender e usar, ela é vulnerável a força bruta e análise de frequência, tornando-a insegura para aplicações modernas.",
        question: "Decifre: Ebiil Tloia (Dica: Deslocamento de -3)",
        answer: "hello world",
        hint: "/image/cifra-de-cesar.png"
    },
    {
        explanation: "A Cifra de Vigenère é uma cifra de substituição polialfabética que usa uma chave para determinar os deslocamentos das letras do texto original. A principal vantagem da Cifra de Vigenère em relação à Cifra de César é que ela utiliza um deslocamento variável, dependendo de cada letra da chave, o que torna a criptografia mais difícil de quebrar. Cada letra é convertida para seu valor numérico no alfabeto (A=0, B=1, C=2, ..., Z=25). Somamos os valores numéricos do texto com os valores da chave para gerar o texto Ex: texto original C = 3 - chave K = 10, somando as duas primeiras letras da chave e do texto original obtemos a letra N ",
        question: "Texto Original: HELLO - Chave: KEYKE",
        answer: "rijvs",
        hint: "/image/cifra-de-vigenere.png"
    },
    {
        explanation: "Uma variação da Cifra de César é a Cifra de César com Multiplicação, também chamada de Cifra Afim quando combinada com deslocamento. Neste método, além de realizar o deslocamento simples como na Cifra de César tradicional, é aplicado um fator de multiplicação antes do deslocamento. A fórmula geral para criptografia é: c = (a . p + b), P: Representação numérica da letra do texto original (A= 0, B= 1,...,z = 25) a: Fator de multiplicação (deve ser coprimido de 26, ou seja, mdc(a,26) = 1, para garantir que o texto seja descriptografável) b: Deslocamento (como na Cifra de César) c: Representação numérica da letra cifrada.",
        question: "Texto original: TEST - Fator de multiplicação: a = 7 - Deslocamento: b = 3",
        answer: "gfzg",
        hint: "/image/cifra-de-multi.png"
    }
];

let currentChallenge = 0;
let attemptsLeft = 3;

const correctSound = new Audio('/sound/Correct.mp3');
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
            window.location.href = "/paginas/historia2.html";
        }, 5000);
    }
}
document.getElementById("next").addEventListener("click", startChallenge);

document.getElementById("submit").addEventListener("click", () => {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    const correctAnswer = challenges[currentChallenge].answer;

    if (userAnswer === correctAnswer) {
        correctSound.play();
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
        "Agora, somamos os valores numéricos do texto com os valores da chave, a soma do texto original e a KEY irá gerar a mensagem cifrada",
        "Se um deslocamento resultar em um número maior que 25 ou negativo, use o módulo 26 para ajustá-lo ao intervalo de 0 a 25."
    ];
    feedback.innerText = hintMessages[currentChallenge];
});

showExplanation();
