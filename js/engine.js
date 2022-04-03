const game_content = document.getElementById("game_content");
const txt_player = document.getElementById("txt_player");
const txt_player_plays = document.getElementById("txt_player_plays");
const tbl_game_grid = document.getElementById("tbl_game_grid");
const txt_rodadas = document.getElementById("txt_rodadas");

const quant_players = 2;
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let matriz;
let players;
let player_atual;
let rodadas = -1;
let ganhador;

function atualizar_titulo_player(player){
    txt_player.innerHTML = `${player.nome} - <font style=\"color: ${player.cor}\" >${player.letra}</font>`;
    txt_player_plays.innerText = `Jogadas na partida: ${player.jogadas} | Vitorias: ${player.vitorias}`;
}

function iniciar_players() {
    players = [];
    player_atual = 0;

    for (let a=0; a<quant_players; a+=1){
        let r = parseInt(Math.random() * 255);
        let g = parseInt(Math.random() * 255);
        let b = parseInt(Math.random() * 255);
        let cor = `rgb(${r}, ${g}, ${b})`;

        let letra = letras[parseInt(Math.random() * 26)];

        let player = Player(`Player ${a+1}`, cor, letra);
        players.push(player);
    }

    atualizar_titulo_player(players[player_atual]);
}

function iniciar_jogo(){
    tbl_game_grid.innerHTML = "";
    player_atual = 0;
    rodadas += 1;

    // Reiniciar jogadas dos jogadores
    for (let player of players){
        player.jogadas = 0;
    }
    atualizar_titulo_player(players[player_atual]);
    
    // Reiniciar matriz do jogo
    matriz = [];
    for (let linha=0; linha<3; linha+=1) {
        let tr = document.createElement("tr");

        let colunas_matriz = [];
        for (let coluna=0; coluna<3; coluna+=1) {
            let td = document.createElement("td");
            td.onclick = (e)=> {
                on_grid_click(e, linha, coluna);
            };
            tr.append(td);

            colunas_matriz.push(null);
        }
        tbl_game_grid.append(tr);

        matriz.push(colunas_matriz);
    }

    txt_rodadas.innerText = `Rodadas: ${rodadas}`;
}

function is_fim_jogo(){
    let quant_letras_diagonal_principal = {};
    let quant_letras_diagonal_secundaria = {};
    let totalmente_preenchido = true;

    for (let l=0; l<matriz.length; l+=1){
        let quant_letras_linha = {};
        for (let c=0; c<matriz[l].length; c+=1){
            let letra = "";
            if (matriz[l][c]){
                letra = matriz[l][c].letra;
            }else {
                totalmente_preenchido = false;
                continue;
            }

            // Verificar letras na diagonal principal
            if (l == c) {
                quant_letras_diagonal_principal[letra] = (quant_letras_diagonal_principal[letra] + 1) || 1;
            }

            // Verificar letras na diagonal secundaria
            if ((l + c) == (matriz.length-1)){
                quant_letras_diagonal_secundaria[letra] = (quant_letras_diagonal_secundaria[letra] + 1) || 1;
            }

            quant_letras_linha[letra] = (quant_letras_linha[letra] + 1) || 1;

            // Verificar ganhador
            if (letra){
                let maior_quantidade = Math.max(
                    quant_letras_diagonal_principal[letra] | 0,
                    quant_letras_diagonal_secundaria[letra] | 0,
                    quant_letras_linha[letra] | 0
                );

                if (maior_quantidade == matriz.length){
                    ganhador = matriz[l][c];
                    return true;
                }
            }
        }
    }

    // Verificar se tem ganhador na vertical
    for (let c=0; c<matriz.length; c+=1){
        let ganhou = true;
        let player = matriz[0][c];
        if(!player) continue;

        for(let l=0; l<matriz.length; l+=1){
            if (matriz[l][c] != player) {
                ganhou = false;
                break;
            }
        }

        if (ganhou) {
            ganhador = player;
            return true;
        }
    }

    return totalmente_preenchido;
}

setInterval(() => {
    if (is_fim_jogo()){
        if (ganhador) {
            alert(`${ganhador.nome} Ganhou!`);
            ganhador.vitorias += 1;
        }
        else alert("Deu empate!");

        ganhador = undefined;
        iniciar_jogo();
    }
}, 500);

function change_player(){
    if ((player_atual+1) < quant_players) {
        player_atual += 1;
    }else player_atual = 0;
    
    atualizar_titulo_player(players[player_atual]);
}

function on_grid_click(event, linha, coluna) {
    if (matriz[linha][coluna]) return;
    let grid = event.target;

    grid.style.cursor = "default";

    players[player_atual].jogadas += 1;

    let player = players[player_atual];
    grid.style.color = player.cor;
    grid.innerHTML = player.letra;
    matriz[linha][coluna] = player;

    change_player();
}