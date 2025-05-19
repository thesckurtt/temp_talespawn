import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import InptGroup from '../components/InptGroup';
import { useAuth } from '../context/AuthContext';

const characters = [
  {
    id: 1,
    image: "./img/character_1.png",
    name: "Character 1",
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
    attributes: {
      magic: 0,
      attack: 5,
      healing: 2,
      perception: 2
    }
  }
];

const Register = () => {

  const { defUser, isLoggedIn } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      console.log("esta logado")
      navigate('/game', { replace: true })
    }

  }, [isLoggedIn, navigate])

  const swiperRef = useRef(null);
  const formRef = useRef(null)

  const [characterSelectedIndex, setCharacterSelectedIndex] = useState(1)
  const [characterSelected, setCharacterSelected] = useState(characters[0])
  // Form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')

  // useEffect para definir personagem selecionado
  useEffect(() => {
    characters.filter(el => el.id === characterSelectedIndex).map(el => {
      setCharacterSelected(el)
    })
  }, [characterSelectedIndex]);

  // useEffect para carregar o Swiper
  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault()
    const data = {
      name: name,
      email: email,
      password: password,
      nickname: nickname,
      character_id: characterSelected.id
    }
    defUser(data)
    navigate('/game', { replace: true })
    // window.localStorage.setItem('user', JSON.stringify(data));
  }

  function handleFormClick() {
    formRef.current.requestSubmit()
  }

  return (
    <main className="main-site-register vh-100 vw-100">
      <div className="main-site-register-top d-flex align-items-center justify-content-center">
        <div className="logo-xl top-20">
          <img src="./img/logo-xl.png" alt="Logo" />
        </div>
      </div>

      <div className="main-site-register-middle">
        <div className="right-border d-flex justify-content-center align-items-center">
          <form action="#" className="rpg-form" ref={formRef} onSubmit={handleFormSubmit}>
            <InptGroup name={'name'} type={'text'} label={'Nome'} value={name} handleChange={setName} />
            <InptGroup name={'email'} type={'email'} label={'E-mail'} value={email} handleChange={setEmail} />
            <InptGroup name={'password'} type={'password'} label={'Senha'} value={password} handleChange={setPassword} />
            <InptGroup name={'nickname'} type={'text'} label={'Nick'} value={nickname} handleChange={setNickname} />
          </form>
        </div>

        <div className="main-site-register-middle-characters d-flex justify-content-center align-items-center">
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            centeredSlides={true}
            // loop={true}
            spaceBetween={30}
            onSlideChange={(swiper) => { setCharacterSelectedIndex(swiper.activeIndex + 1) }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            className="mySwiper"
          >
            {characters && characters.map(character => {
              return (
                <SwiperSlide key={character.id}><img src={character.image} alt="Personagem 1" /></SwiperSlide>
              )
            })}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </Swiper>
        </div>

        <div className="left-border d-flex px-4 justify-content-start align-items-center">
          <div>
            <h1 className="rpg-text-title mb-4">Atributos</h1>
            <div className="mb-3">
              <span className="rpg-text-title fs-2">Magia</span>
              <div className="progress-container">
                {[...Array(5)].map((_, i) => <div key={i} className={`pc-dot ${characterSelected.attributes.magic >= i ? "full" : ""}`}></div>)}
              </div>
            </div>
            <div className="mb-3">
              <span className="rpg-text-title fs-2">Ataque</span>
              <div className="progress-container">
                {[...Array(5)].map((_, i) => <div key={i} className={`pc-dot ${characterSelected.attributes.attack >= i ? "full" : ""}`}></div>)}
              </div>
            </div>
            <div className="mb-3">
              <span className="rpg-text-title fs-2">Cura</span>
              <div className="progress-container">
                {[...Array(5)].map((_, i) => <div key={i} className={`pc-dot ${characterSelected.attributes.healing >= i ? "full" : ""}`}></div>)}
              </div>
            </div>
            <div className="mb-3">
              <span className="rpg-text-title fs-2">Percepção</span>
              <div className="progress-container">
                {[...Array(5)].map((_, i) => <div key={i} className={`pc-dot ${characterSelected.attributes.perception >= i ? "full" : ""}`}></div>)}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="main-site-register-bottom d-flex justify-content-center align-items-center p-3">
        <button className="btn-rpg" onClick={handleFormClick}>Registrar</button>
      </div>
    </main>
  );
};

export default Register;
