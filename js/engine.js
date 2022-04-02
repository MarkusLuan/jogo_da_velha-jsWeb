const game_content = document.getElementById("game_content");

function iniciar_jogo(){
    game_content.innerHTML = "";

    let table = document.createElement("table");
    
    for (let linha=0; linha<3; linha+=1) {
        let tr = document.createElement("tr");
        for (let coluna=0; coluna<3; coluna+=1) {
            let td = document.createElement("td");
            td.onclick = () => {
                if (td.innerHTML) return;
                
                td.innerHTML = "X";
                td.style.cursor = "default";
            };
            tr.append(td);
        }
        table.append(tr);
    }

    game_content.append(table);
}