/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");

/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");

/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
const palavraInterface = document.querySelector(".dashes");

/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));

/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div")); 

/* Palavra corrente */
let palavraProposta;

/* Lista das letras erradas */
let letrasErradasArray = [];

/* Index da parte do corpo corrente */
let indiceBoneco;

/* Numero de chances do jogador */
const numTentativas = 8;

/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

const categorias = {
    frutas: ["abacate", "amora", "ameixa", "acerola", "abacaxi", "açai", "banana", "carambola", "caju", "cereja", "cacau", "caqui", "cupuaçu", "damasco", "figo", "framboesa", "graviola", "goiaba", "groselia", "guarana", "jaca", "kiwi", "laranja", "limao", "lima", "lixia", "melancia", "mamao", "melao", "maracuja", "manga", "maça", "mexerica", "morango", "nectarina", "pera", "pessego", "pitanga", "pinha", "quina", "roma", "tangerina", "uva"],
    profissoes:  ['atuario', 'engenheiro biomedico', 'engenheiro de software', 'otorrinolaringologista', 'consultor financeiro', 'higienista dental', 'terapeuta ocupacional', 'optometrista', 'fisioterapeuta', 'analistas de sistemas da computacao', 'quiropratico', 'fonoaudiologo', 'fisiologista', 'professor universitario', 'medico veterinario', 'nutricionista', 'farmaceutico', 'matematico', 'sociologo', 'estatistico', 'fisico', 'oculista', 'podologo', 'desenvolvedor de web', 'historiador', 'engenheiro ambiental ', 'engenheiro de petroleo', 'meteorologista', 'geologo', 'gerente', 'engenheiro civil', 'ortodontista', 'terapeuta respiratorio ', 'astronomo', 'psiquiatra', 'programador de computador', 'gerente de midias sociais', 'analista de pesquisa de mercado', 'assistente juridico', 'dentista', 'dermatologista', 'reparador de maquina industrial', 'medico', 'logistico', 'contador', 'consultor de gestao', 'assistente social', 'medico assistente ', 'reparador de equipamentos eletricos', 'agente imobiliario', 'faxineiro', 'tecnico de engenharia', 'executivo senior', 'escritor', 'motorista de onibus', 'serralheiro', 'gerente de hotel', 'lixeiro', 'engenheiro de operacoes', 'caixa de banco', 'marinheiro', 'instalador de carpetes', 'recebedor de mercadorias', 'policial', 'bombeiro', 'editor de jornais e revistas', 'caixa', 'controlador de trafego aereo', 'operario da construcao civil', 'fotografo', 'costureira', 'alfaiate', 'pintor', 'trabalhador da industria automotiva', 'trabalhador de precisao', 'comprador', 'estoquista', 'militar', 'domestica', 'designer de moda', 'acougueiro', 'radialista', 'garcom', 'garconete', 'preparador de imposto', 'lavador de pratos', 'fotojornalista', 'agente penitenciario', 'agricultor', 'comissario de voo', 'carpinteiro', 'carteiro ', 'leiteiro ', 'ator', 'soldado', 'lenhador', 'reporter'],
    cores: ['abobora', 'acafrao', 'amarelo', 'ambar', 'ameixa', 'amendoa', 'ametista', 'anil', 'azul', 'bege', 'bordo', 'branco', 'bronze', 'caqui', 'caramelo', 'carmesim', 'carmim', 'castanho', 'cereja', 'chocolate', 'ciano ', 'cinza', 'cinzento', 'cobre', 'coral', 'creme', 'damasco', 'dourado', 'escarlate', 'esmeralda', 'ferrugem', 'fucsia', 'gelo', 'grena', 'gris', 'indigo', 'jade', 'jambo', 'laranja', 'lavanda', 'lilas ', 'limao', 'loiro', 'magenta', 'malva', 'marfim', 'marrom', 'mostarda', 'negro', 'ocre', 'oliva', 'ouro', 'pessego', 'prata', 'preto', 'purpura', 'rosa', 'roxo', 'rubro', 'salmao', 'sepia', 'terracota', 'tijolo', 'turquesa', 'uva', 'verde', 'vermelho', 'vinho', 'violeta']
};

function indiceAleatorio(max){
    return Math.floor(Math.random() * max);
}

//começa daqui
function retornaArrayCategorias(){
    // retorna as propriedades do objeto categorias 
    // em forma de array de strings 
    return Object.keys(categorias);
}

function retornaCategoria(){
    // recebendo as propriedades em forma de array de string
    const arrayCategorias = retornaArrayCategorias();
    
    // removendo a categoria do arrayCategorias
    let posicao = arrayCategorias.indexOf(palavraProposta);
    arrayCategorias.splice(posicao, 1);

    // Gerando um indice aleatorio e retornando o valor 
    // do arrayCategorias na posição indiceCategoria
    let indiceCategoria = indiceAleatorio(arrayCategorias.length);
    return arrayCategorias[indiceCategoria];
    
}

function exibeCategoria(){
    // alterando o texto do elemento html categoria
    // com valor retornado pela função retornaCategoria() 
    categoria.innerHTML = retornaCategoria();

    // Chama a função definePalavraProposta 

    definePalavraProposta();
}

function definePalavraProposta() {
    // pegar a categoria que aparece no html  
    let categoriaTexto = categoria.innerHTML;

    // tirar uma cópia do array de palavras da categoria que aparece no html 
    const arrayPalavras = categorias[categoriaTexto].slice();

    // Removendo a palavraProposta do arrayPalavras 
    let posicao = arrayPalavras.indexOf(palavraProposta);
    arrayPalavras.splice(posicao, 1);

    // gerando um indice aleatorio e modificando o valor da 
    // palavraProposta para arrayPalavras na posição indicePalavra
    let indicePalavras = indiceAleatorio(arrayPalavras.length);
    palavraProposta = arrayPalavras[indicePalavras];

      console.log("Categoria: ", categoriaTexto);
      console.log("Palavra: ", palavraProposta);
      console.log("*****************************");
    
    exibePalavraInterface( ocultaPalavra() );
}

function ocultaPalavra(){
    let palavraOcultada = "";

    // trocando as letras da palavras para hífen (traço) 
    for(let i of palavraProposta){
        palavraOcultada += "-";
    }


    // retorna a palavra ocultada 
    return palavraOcultada;
    
}

function exibePalavraInterface(palavra){
    // modificando o texto do elemento html palavraInterface
    // para a palavra recebida por parâmetro
    palavraInterface.innerHTML = palavra;
    
}
// terminar aqui


// começa daqui 2
function tentativa(letra){
    // verifica se a palavraProposta contém a letra informada
    if(palavraProposta.includes(letra)){
        // chama a função atualizaPalavraInterface
        atualizaPalavraInterface(letra);
    } 
    else{
        // senão conter, inserir a letra no array de letras erradas,
        // mostrar o array de letras erradas no html
        letrasErradasArray.push(letra);
        letrasErradas.innerHTML = "Letras erradas:" + letrasErradasArray;

        // chamar a função desenharBoneco enquanto o indiceBoneco 
        // for menor que o tamanho de partes do boneco
        if(indiceBoneco < partesBoneco.length){
            desenhaBoneco();
        }
    }

    // chama a função que verifica se o jogo terminou
    verificaFimDeJogo();
}

function verificaFimDeJogo(){
    // verifica se a palavraInterface não contém traços (-)
    if(!palavraInterface.innerHTML.includes("-")){
        // chama função exibePalavraInterface para exibir 
        // a palavraIterface e a mensagem você venceu
        exibePalavraInterface(`${palavraInterface.innerHTML} você venceu \\O/`);
        
        // remove a função "retornaLetra" do evento "keypress" 
        // (pressionar letra)
        window.removeEventListener("keypress", retornaLetra);
        
    }
    // senão, verifica se o tamanho do array de letras erradas
    // é maior ou igual ao numero de tentativas
    else if(letrasErradasArray.length >= numTentativas) {
        // chama função exibePalavraInterface para exibir 
        // a mensagem Você perdeu
        exibePalavraInterface("você perdeu :(");
        
        // remove a função "retornaLetra" do evento "keypress" 
        // (pressionar letra)
        window.removeEventListener("keypress", retornaLetra);
    }
}
// termina aqui 2

// começa aqui 3
function atualizaPalavraInterface(letra){
    let palavraAux = "";

    // pegar cada letra e indice das letras da palavraProposta;
    // se a letra da palavraProposta for igual a letra digitada
    // concatenar (juntar) essa letra a palavraAux;
    // senão, pegar a letra da palavraInterface no mesmo indice 
    // e concatenar (juntar) na palavraAux;
    palavraProposta.split("").forEach( (letraPP, indice) => {
        if(letraPP === letra){
            palavraAux += letra
        }
        else{
            palavraAux += palavraInterface.innerHTML[indice];
        }
    });

    // exibir a palavraAux na interface
    exibePalavraInterface(palavraAux);
}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    // chama a função tentativa passando a tecla digitada do evento "e"
    tentativa(e.key);
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    // pega as partes do boneco utilizando o indiceBoneco
    // e remove a classe "hide"
    partesBoneco[indiceBoneco].classList.remove("hide");

    // incrementa (soma) o indiceBoneco
    indiceBoneco++; 
}
 
/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){ 
    //pega as partes do boneco e adiciona a classe "hide"
    partesBoneco.forEach(parteBoneco =>{
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    //limpa uma variavel indiceBoneco
    indiceBoneco = 0;

    //limpa um array de letras erradas
    letrasErradasArray = [];

    // função que oculta o boneco
    ocultaBoneco();

    // função que exibe a categoria
    exibeCategoria();
    
    // altera o texto do elemento html "letrasErradas"
    letrasErradas.innerHTML = "Letras erradas: ";  
    
   
    // adiciona a função "retornaLetra" no evento "keypress" 
    // (pressionar letra);
    window.addEventListener("keypress", retornaLetra);
}
 
// adiciona a função "iniciaJogo" no evento "load" 
window.addEventListener("load", iniciaJogo);

// termina aqui 3