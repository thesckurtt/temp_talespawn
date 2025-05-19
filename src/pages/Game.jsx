import React, { useEffect, useState } from 'react'
import { GoogleGenAI } from "@google/genai"
const ai = new GoogleGenAI({ apiKey: "AIzaSyAvJWBJDTHbIOgk0xAn7Qq7XtAFhdblj_U" })
import { promptInicial } from '../prompt/Prompt'
import { useAuth } from '../context/AuthContext'

const characters = [
  {
    id: 1,
    image: "./img/character_1.png",
    name: "Character 1",
    description: "Sombra entre sombras, o ladino é ágil, silencioso e mortal. Especialista em armadilhas, furtividade e golpes rápidos.",
    attributes: {
      magic: 0,
      attack: 2,
      healing: 0,
      perception: 5
    }
  },
  {
    id: 2,
    image: "./img/character_2.png",
    name: "Character 2",
    description: "Um mago talentoso, capaz de manipular as forças arcanas com facilidade. Seus feitiços são poderosos, mas exigem concentração.",
    attributes: {
      magic: 5,
      attack: 1,
      healing: 1,
      perception: 0
    }
  },
  {
    id: 3,
    image: "./img/character_3.png",
    name: "Character 3",
    description: "Um guerreiro feroz, conhecido por sua força bruta e habilidades de combate corpo a corpo. Ele é um defensor leal, mas pode ser impetuoso.",
    attributes: {
      magic: 0,
      attack: 5,
      healing: 0,
      perception: 2
    }
  },
  {
    id: 4,
    image: "./img/character_4.png",
    name: "Character 4",
    description: "Graciosa e letal, a elfa domina o arco como extensão de si mesma. Seus olhos veem longe, e sua flecha nunca erra o alvo.",
    attributes: {
      magic: 0,
      attack: 5,
      healing: 2,
      perception: 2
    }
  }
];

const Game = () => {
  const { user } = useAuth()
  console.log(user)
  const [isLoading, setIsLoading] = useState(false)
  const [initialGame, setInitialGame] = useState(true)
  const [decisions, setDecisions] = useState('')
  const [missionHistory, setMissionHistory] = useState([])
  const [history, setHistory] = useState('')
  const [returnDataAPI, setReturnDataAPI] = useState('')


  // Decisão do jogador
  function handleDescision(event) {
    console.log(event.target.value)
    setDecisions(event.target.value)
    setMissionHistory([...missionHistory, event.target.value])
    generateScene()
    // const { value } = event.target
    // setDecisions(value)
  }

  // Prompt com a história inicial
  async function initialHistory() {
    try {
      setIsLoading(true)
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: promptInicial,
      });
      const dataText = response.text.replace('```json', '').replace('```', '')
      const data = JSON.parse(dataText)
      setReturnDataAPI(data)
      setHistory([...history, data.trecho])
      console.log(data);
    } catch (error) {
      throw new Error("Error fetching initial history:", error);
    } finally {
      setIsLoading(false)
    }
  }

  async function generateScene() {
    setIsLoading(true)
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
        Você é um narrador experiente em mundos de fantasia medieval. Sua tarefa é continuar uma história interativa com base nos eventos anteriores e na escolha do jogador utilizando palavras simples.

        **História até agora:**
          ${history.join('\n')}

        **Última decisão do jogador:**
          ${decisions}

        **História Base – 'As Cinzas de Eldros':**
        História Base - “As Cinzas de Eldros”
        Mundo: O continente de Eldros, um reino outrora próspero, agora esconde segredos nas ruínas do seu passado glorioso. Há décadas, uma praga mágica conhecida como Bruma Pálida varreu o território, fazendo reis enlouquecerem, monstros surgirem das sombras e cidades desaparecerem da noite para o dia.

        Contexto:
        Os reinos sobreviventes se isolaram. A Magia é agora temida e caçada. Ordem e caos lutam nas bordas do mapa. Dizem que a causa da Bruma está ligada a um Artefato Perdido — uma relíquia da era dos Magos Primordiais — que ainda pulsa com energia em algum lugar do mundo.

        Prossiga a narrativa de forma imersiva e descritiva. Continue exatamente de onde parou, respeitando o estilo do mundo (fantasia medieval).

        Inclua ambientação sensorial (sons, cheiros, sentimentos, clima, tensão).

        Ao final, apresente duas escolhas distintas que impactarão a próxima parte da história.


        Retorne **apenas** um paragrafo curto no "trecho" do JSON, sem formatação.

        Retorne **apenas** no formato JSON abaixo:

        {
          "trecho": "Trecho da continuação vai aqui...",
          "decisoes": [
            "Decisão 1 vai aqui...",
            "Decisão 2 vai aqui..."
          ]
        }
        `,
      });
      const dataText = response.text.replace('```json', '').replace('```', '')
      const data = JSON.parse(dataText)
      setReturnDataAPI(data)
      setHistory([...history, data.trecho])
      console.log(response.text)
    } catch (error) {
      throw new Error("Error generating scene:", error);
    } finally {
      setIsLoading(false)
    }
  }

  // Carregar a primeira cena
  useEffect(() => {
    initialHistory();
  }, [])

  return (
    <main className="main-site-chat vh-100 vw-100">
      {/* 
      <div className="header-site-chat d-flex justify-content-between align-items-center px-4 py-2">
        <div className="logo-md">
          <img src="./img/logo-md.png" alt="" srcset="" />
        </div>
        <div>
          <i className="fa-solid fa-circle-info fs-3 color-gold c-pointer"></i>
          <i className="fa-solid fa-music fs-3 mx-4 color-gold c-pointer"></i>
        </div>
      </div> 
      */}
      <div className="middle-site-chat">
        {isLoading &&
          <div className="left-middle-chat">
            <img src="./img/loading.gif" alt="Loading..." />
          </div>
        }
        {!isLoading &&
          <div className="left-middle-chat">
            <div className="rpg-master-container justify-content-center mt-4">
              <div className="rpg-profile-picture">
                <img src="./img/rpg-master.jpg" alt="" />
              </div>
              <div className="rpg-master-text">
                {initialGame && returnDataAPI && <><p className="fs-6">{returnDataAPI.trecho}
                </p>
                  <span className='fs-4 mt-4 d-inline-block'>Decisões</span>
                  <ul >
                    <li>{returnDataAPI.decisoes[0]}</li>
                    <li>{returnDataAPI.decisoes[1]}</li>
                  </ul>
                </>}
                {/* <p className="fs-6"></p> */}
              </div>
            </div>
            {returnDataAPI &&
              <div className="d-flex justify-content-around align-items-center">
                <button className="btn-rpg" onClick={handleDescision} value={returnDataAPI.decisoes[0]}>Opção 1</button>
                <button className="btn-rpg" onClick={handleDescision} value={returnDataAPI.decisoes[1]}>Opção 2</button>
              </div>
            }
          </div>
        }
        <div className="right-middle-chat">
          <div className="character-info d-flex flex-column p-3 text-center justify-content-center align-items-center">
            <div className="rpg-profile-picture">
              <img src={characters.filter(character => character.id === user.character_id).map(filteredCharacter => filteredCharacter.image)} alt="" />
            </div>
            <h1 className="rpg-text-title fs-3 mt-3">{user.nickname}</h1>
            <p className="text-white">{characters.filter(character => character.id === user.character_id).map(filteredCharacter => filteredCharacter.description)}</p>
          </div>
          <div className="chat-mission-history">
            {missionHistory && missionHistory.map((item, index) => {
              return (
                <div className="" key={index}>
                  <span className="rpg-text-title">Escolha {index + 1}</span>
                  <p className="text-white">{item}</p>
                </div>
              )
            })}
            {missionHistory.length === 0 && <div className="">
              <div className="">
                <span className="rpg-text-title">Olha só...</span>
                <p className="text-white">Suas escolhas ficam bem aqui.</p>
              </div>
            </div>
            }
              {/* <div className="">
              <span className="rpg-text-title">Lorem Ipsum</span>
              <p className="text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut dolorum odio error voluptate ratione non ex molestias</p>
            </div>
            <div className="">
              <span className="rpg-text-title">Lorem Ipsum</span>
              <p className="text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut dolorum odio error voluptate ratione non ex molestias</p>
            </div>
            <div className="">
              <span className="rpg-text-title">Lorem Ipsum</span>
              <p className="text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut dolorum odio error voluptate ratione non ex molestias</p>
            </div>
            <div className="">
              <span className="rpg-text-title">Lorem Ipsum</span>
              <p className="text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut dolorum odio error voluptate ratione non ex molestias</p>
            </div>
            <div className="">
              <span className="rpg-text-title">Lorem Ipsum</span>
              <p className="text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut dolorum odio error voluptate ratione non ex molestias</p>
            </div> */}
            </div>
        </div>
        </div>
        <div className="footer-site-chat">

        </div>
    </main>
  )
}

export default Game
