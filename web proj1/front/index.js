class Msg {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
    }

    addElement(userName, msg) {
        const element = document.createElement("div");
        element.classList.add("divmsgs");

        const h1 = document.createElement("h4");
        h1.classList.add("user-name"); // Adicionando classe à tag h4
        h1.textContent = userName;

        const text = document.createElement("p");
        text.classList.add("user-msg"); // Adicionando classe à tag p
        text.textContent = msg;

        element.appendChild(h1);
        element.appendChild(text);

        this.container.appendChild(element);
    }
}


const mensage = new Msg("containermsg")
var campo = document.getElementById('msgsite');
var form = document.getElementsByClassName("inputcontainer")

addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Dados a serem enviados
    const data = {
        usuario: "Jonh Doe",
        msg: campo.value,
    };

    try {
        const response = await fetch("http://localhost:3301/api/v1/upmsg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log("Mensagem enviada com sucesso!");
            window.location.reload()
        } else {
            console.error("Erro ao enviar a mensagem:", response.status);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
    campo.value = '';
});

fetch("http://localhost:3301/api/v1/getallmsg")
.then((res)=>{
    return res.json()
}).then((data)=>{
    console.log(data)
    data.map((msg)=>{
        mensage.addElement(msg.usuario,msg.msg)
    })
})
.catch((err)=>{
    console.log(err)
})
