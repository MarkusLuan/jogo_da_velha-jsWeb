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

function atualizar_titulo_player(player){
    txt_player.innerHTML = `${player.nome} - <font style=\"color: ${player.cor}\" >${player.letra}</font>`;
    txt_player_plays.innerText = `Jogadas: ${player.jogadas}`;
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
    iniciar_players();
    rodadas += 1;
    
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

function change_player(grid){
    let player = players[player_atual];
    console.log(player);

    grid.style.color = player.cor;
    grid.innerHTML = player.letra;

    if ((player_atual+1) < quant_players) {
        player_atual += 1;
    }else player_atual = 0;
    
    atualizar_titulo_player(players[player_atual]);
}

function on_grid_click() {
    if (this.innerHTML) return;
    this.style.cursor = "default";

    players[player_atual].jogadas += 1;
    change_player(this);
}