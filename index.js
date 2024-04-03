let participantes = [
    {
        nome: "Diego Fernandes",
        email: "diego@gmail.com",
        dataInscricao: new Date(2024, 2, 23, 19, 23),
        dataCheckIn: new Date(2024, 2, 25, 20, 20)
    },
    {
        nome: "Mayk Brito",
        email: "mayk@gmail.com",
        dataInscricao: new Date(2024, 2, 1, 19, 23),
        dataCheckIn: null
    },
    {
        nome: "Ana Souza",
        email: "ana@gmail.com",
        dataInscricao: new Date(2024, 2, 2, 12, 45),
        dataCheckIn: new Date(2024, 2, 2, 13, 10)
    },
    {
        nome: "Carlos Silva",
        email: "carlos@gmail.com",
        dataInscricao: new Date(2024, 2, 2, 15, 30),
        dataCheckIn: new Date(2024, 2, 2, 16, 0)
    },
    {
        nome: "Juliana Santos",
        email: "juliana@gmail.com",
        dataInscricao: new Date(2024, 2, 3, 9, 15),
        dataCheckIn: null
    },
    {
        nome: "Fernando Oliveira",
        email: "fernando@gmail.com",
        dataInscricao: new Date(2024, 2, 3, 14, 0),
        dataCheckIn: new Date(2024, 2, 3, 14, 30)
    },
    {
        nome: "Laura Lima",
        email: "laura@gmail.com",
        dataInscricao: new Date(2024, 2, 4, 10, 20),
        dataCheckIn: new Date(2024, 2, 4, 10, 45)
    },
    {
        nome: "Roberto Oliveira",
        email: "roberto@gmail.com",
        dataInscricao: new Date(2024, 2, 4, 15, 50),
        dataCheckIn: null
    },
    {
        nome: "Patricia Santos",
        email: "patricia@gmail.com",
        dataInscricao: new Date(2024, 2, 5, 11, 10),
        dataCheckIn: new Date(2024, 2, 5, 11, 35)
    },
    {
        nome: "Gustavo Lima",
        email: "gustavo@gmail.com",
        dataInscricao: new Date(2024, 2, 5, 14, 30),
        dataCheckIn: new Date(2024, 2, 5, 15, 0)
    }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  // condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
      Confirmar check-in
    </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes) {
    // faça alguma coisa
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
    .querySelector('tbody')
    .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find((p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) =>  p.email == event.target.dataset.email
  )
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}