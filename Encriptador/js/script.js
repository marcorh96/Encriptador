const tx = document.getElementsByTagName("textarea");
var textareaInput = document.querySelector("#txtEncrypt");
var btnEncrypt = document.querySelector("#btnEncrypt");
var btnDesencrypt = document.querySelector("#btnDesencrypt");
var encryptedVariables = ["e", "i", "a", "o", "u"];
var desencryptedVariables = ["enter", "imes", "ai", "ober", "ufat"];
var targetDiv = document.getElementById("divRect");
var targetDiv2 = document.getElementById("remove");
var words;
var btnPushed = false;
var textareaInput2;
var btnCopy;
var functionCopy;
for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", onInput, false);
}

function onInput() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
    var regExp = /[^a-z ]/g;
    words = textareaInput.value.toLowerCase().replace(regExp, '');
    textareaInput.value = words;
    if (textareaInput.value.indexOf(" ") == 0) {
        textareaInput.value = words.slice(0, -1);
    }
    if (words.length > 281) {
        textareaInput.blur();
        textareaInput.value = words.split("", 281).join("");
        alert("Limite de words alcanzado");
    }
    return words;
}
function fnEncrypt() {
    words = textareaInput.value;
    if (words == undefined || words == "") {
        alert("Rellene el campo de texto por favor.");
    }
    else {
        if (btnPushed == false) {
            targetDiv2.remove();
            createDivSection();
            createVariables();
            btnPushed = true;
        }
        var word = words.split("");
        for (var i = 0; i < word.length; i++) {
            if (encryptedVariables.includes(word[i])) {
                var position = encryptedVariables.indexOf(word[i]);
                word[i] = desencryptedVariables[position];
            }
        }
        textareaInput2.value = word.join("");
    }
}
function fnDesencrypt() {
    words = textareaInput.value;
    if (words == undefined || words == "") {
        alert("Rellene el campo de texto por favor.");
    } else {
        if (btnPushed == false) {
            targetDiv2.remove();
            createDivSection();
            createVariables();
            btnPushed = true;
        }
        var z;
        for (var i = 0; i < desencryptedVariables.length; i++) {
            z = words.indexOf(desencryptedVariables[i]);
            if (z >= 0) {
                words = words.replaceAll(desencryptedVariables[i], encryptedVariables[i]);
            }
        }

        textareaInput2.value = words;
    }

}
function createDivSection() {
    targetDiv.innerHTML += '<div id="remove 2">';
    targetDiv.innerHTML += '<div>';
    targetDiv.innerHTML += '<div>';
    targetDiv.innerHTML += '<textarea type="text"  class = "textareaShow" id="showText" readonly> </textarea>';
    targetDiv.innerHTML += '</div>';
    targetDiv.innerHTML += '<div>';
    targetDiv.innerHTML += '<button id="btnCopyText" class="btnCopyText"> <span class="txtCopy">Copiar</span></button>';
    targetDiv.innerHTML += '</div>';
    targetDiv.innerHTML += '</div>';
}
function createVariables() {
    textareaInput2 = document.querySelector("#showText");
    btnCopy = document.querySelector("#btnCopyText");
    window.getSelection().empty();
    btnCopy.onclick = fnCopy;
    functionCopy = btnCopy.onclick;
}
function fnCopy() {
    textareaInput2.select()
    document.execCommand("copy");
    alert("Su elemento ha sido copiado al portapapeles.");
} 

btnEncrypt.onclick = fnEncrypt;
btnDesencrypt.onclick = fnDesencrypt;