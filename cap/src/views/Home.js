import { useState, useEffect } from "react";
import Prestadores from './Prestadores';
import Processos from './Processos';

const MENU_ITENS = [
  {
    id: 1,
    active: true,
    icon: "fa-solid fa-plus",
    name: "Novo Cadastro",
    hrefComponent: null,
  },
  {
    id: 2,
    active: false,
    icon: "fa-regular fa-user",
    name: "Prestadores",
    hrefComponent: Prestadores,
  },
  {
    id: 3,
    active: false,
    icon: "fa-regular fa-file-lines",
    name: "Processos",
    hrefComponent: Processos,
  }
];

const Home = () => {

  const [menuItens, setMenuItens] = useState(MENU_ITENS);
  const [activeComponent, setActiveComponent] = useState(null);

  const handleMenu = (id) => {
    setMenuItens(
      menuItens.map(s => { return s.id === id ? { ...s, active: true } : { ...s, active: false } })
    );
  };

  useEffect(() => {
    const component = menuItens.find(s => s.active).hrefComponent;
    setActiveComponent(component);
  }, [menuItens]);

  return (
    <div className="main-window">
      <nav className="side-menu">

        <input className="form-control" type="text" id="search-option" name="search-option" placeholder="Pesquisar" />
        <ul>
          {
            menuItens.map(s => (
              <li onClick={() => handleMenu(s.id)} className={s.active ? "active" : ""} key={s.id}><i className={s.icon}></i> <span> {s.name} </span> </li>
            ))
          }
        </ul>

      </nav>
      <div className="main-container">
        {activeComponent}
      </div>
    </div>
  );
}

export default Home;
