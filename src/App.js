import React, { useEffect, useState } from "react";
import styled from "styled-components"

import Tile from "./components/tile"
import GlobalStyle from './globalStyles';

const App = () => {

  //for items coming from api
  const [items, setItems] = useState([])

  // for pop over to confirm navigation away
  const [isOpen, setIsOpen] = useState(false)

  //for deciding if the popover should even show
  const [stopConfirm, setStopConfirm] = useState(false)

  // for storing the url that the popup will redirect to
  const [redirect, setRedirect] = useState("")

  // fetch the data and store it to a state var
  useEffect( () => {
    fetch('https://picsum.photos/v2/list')
    .then(response => response.json())
    .then(data => setItems(data))
  }, [])

  // centralized the click event for the tiles to activate the popup
  const onTileClick = (e) => {
    if(!stopConfirm) {
      e.preventDefault()
      setIsOpen(true)
      setRedirect(e.target.dataset.url)
    }
  }

  //used a class called "popover_target" to add functionality by which a user can click the darkened background and close popup
  return (
    <>
      <GlobalStyle />
      <PopUpOverlay className="popover_target" open={isOpen} onClick={(e) => {
        if(e.target.classList.contains("popover_target")) setIsOpen(false)
      }}>
        <PopUp>
          <p>You are about to navigate away from this page. Are you sure?</p>
          <button onClick={ () => window.location.href = redirect }>go</button>
          <button onClick={ () => {
            setIsOpen(false)
            setRedirect("")
          }}>cancel</button>
        </PopUp>
      </PopUpOverlay>
      <Label><input type="checkbox" checked={ stopConfirm ? "checked" : ""} onChange={(e) => setStopConfirm(e.target.checked) } /> Agree to redirect without confirmation popup</Label>
      <Container>
        { items.map( (item) => (
          <TileContainer key={item.id}>
            <Tile item={item} onClick={onTileClick} />
          </TileContainer>
        ))}
      </Container>
    </>
  );
}

const Label = styled.label`
  width: 100%;
  max-width: 1200px;
  margin: 10rem auto 5rem;
  display: block;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 100%;
  margin: 5rem auto;
`

const TileContainer = styled.div`
  flex: 1 1 100%;

  @media (min-width: 480px) {
    flex: 1 1 50%;
  }
  
  @media (min-width: 750px) {
    flex: 1 1 33.333333%;
  }
`

// opted to use styled components for dynamic styling like this as opposed to toggling classes which are harder to track
const PopUpOverlay = styled.div`
  background: rgba(0, 0, 0, 0.33);
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  transition: 0.3s ease;
  opacity: ${({open}) => open ? "1" : "0"};
  pointer-events: ${({open}) => open ? "auto" : "none"};
`

const PopUp = styled.div`
  background: white;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  top: 10rem;
  height: 20rem;
  width: 100%;
  max-width: 32rem;
  padding: 1.6rem;

  p {
    margin-bottom: 1rem;
  }

  button {
    text-align: center;
    display: inline-block;
    background: black;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    margin: 0.2rem;

    &:active {
      position: relative;
      top: 0.1rem;
    }
  }
`

export default App;
