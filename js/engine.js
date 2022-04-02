const game_content = document.getElementById("game_content");
const quant_players = 2;

let player_atual = 1;
let jogadas = 0;

function iniciar_jogo(){
    game_content.innerHTML = "";
    player_atual = 1;

    let table = document.createElement("table");
    
    for (let linha=0; linha<3; linha+=1) {
        let tr = document.createElement("tr");
        for (let coluna=0; coluna<3; coluna+=1) {
            let td = document.createElement("td");
            td.onclick = on_grid_click;
            tr.append(td);
        }
        table.append(tr);
    }

    game_content.append(table);
}

function on_grid_click() {
    if (this.innerHTML) return;
    
    if (player_atual == 1) {
        this.style.color = "#0000FF";
        this.innerHTML = "X";
    } else {
        this.style.color = "#00FF00";
        this.innerHTML = "O";
    }

    this.style.cursor = "default";

    if (player_atual < quant_players) {
        player_atual += 1;
    }else player_atual = 1;

    jogadas += 1;    
}