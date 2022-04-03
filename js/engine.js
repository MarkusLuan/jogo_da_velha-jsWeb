const game_content = document.getElementById("game_content");
const txt_player = document.getElementById("txt_player");
const txt_player_plays = document.getElementById("txt_player_plays");
const tbl_game_grid = document.getElementById("tbl_game_grid");
const txt_rodadas = document.getElementById("txt_rodadas");

const quant_players = 2;
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

    for (let player of players){
        player.jogadas = 0;
    }
    atualizar_titulo_player(players[player_atual]);
    
    for (let linha=0; linha<3; linha+=1) {
        let tr = document.createElement("tr");
        for (let coluna=0; coluna<3; coluna+=1) {
            let td = document.createElement("td");
            td.onclick = on_grid_click;
            tr.append(td);
        }
        tbl_game_grid.append(tr);
    }

    txt_rodadas.innerText = `Rodadas: ${rodadas}`;
}

function is_fim_jogo(){
    let linhas = tbl_game_grid.getElementsByTagName("tr");

    let quant_letras_diagonal_principal = {};
    let quant_letras_diagonal_secundaria = {};
    let quant_preenchidos = 0;
    for (let l = 0; l<linhas.length; l+=1){
        let colunas = linhas[l].getElementsByTagName("td");

        let quant_letras_linha = {};
        for (let c = 0; c<colunas.length; c+=1){
            let letra = colunas[c].innerText;

            if (l == c) {
                quant_letras_diagonal_principal[letra] = (quant_letras_diagonal_principal[letra] + 1) || 1;
            }

            if ((l + c) == (linhas.length-1)){
                quant_letras_diagonal_secundaria[letra] = (quant_letras_diagonal_secundaria[letra] + 1) || 1;
            }

            quant_letras_linha[letra] = (quant_letras_linha[letra] + 1) || 1;

            if (letra) quant_preenchidos += 1;

            // Verificar ganhador
            if (letra){
                let maior_quantidade = Math.max(
                    quant_letras_diagonal_principal[letra] | 0,
                    quant_letras_diagonal_secundaria[letra] | 0,
                    quant_letras_linha[letra] | 0
                );

                if (maior_quantidade == colunas.length){
                    ganhador = players.filter((p) => {
                        return p.letra == letra;
                    })[0];

                    ganhador.vitorias += 1;

                    return true;
                }
            }
        }
    }

    return (quant_preenchidos == Math.pow(linhas.length, 2));
}

setInterval(() => {
    if (is_fim_jogo()){
        if (ganhador) alert(`${ganhador.nome} Ganhou!`);
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

function on_grid_click() {
    if (this.innerHTML) return;
    this.style.cursor = "default";

    players[player_atual].jogadas += 1;

    let player = players[player_atual];
    this.style.color = player.cor;
    this.innerHTML = player.letra;

    change_player();
}