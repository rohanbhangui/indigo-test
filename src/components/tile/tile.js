import React from "react";
import styled from "styled-components"

// because of the varying sizes of the images I opted for an approach by which i could make them a square aspect ratio
const Tile = ({item, onClick }) => {

  // destructure the object into variables
  const { width, height, author, url, download_url } = item

  return (
    <Container>
      <a href={url} onClick={onClick}>
        <Image style={{ backgroundImage: `url(${download_url})`}} data-url={url}/>
        <Content>
          <Name>{author}</Name>
          <Dimensions>{width}&times;{height}</Dimensions>
        </Content>
      </a>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const Image = styled.img`
  width: 100%;
  padding-top: 100%;
  background-size: cover;
  margin-bottom: -0.4rem;
  background-position: center center;
`

const Content = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: white;
  text-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
`

const Name = styled.h2`
  display: block;
  font-weight: normal;
  margin-bottom: 0.4rem;
`

const Dimensions = styled.p`
  display: block;
  font-size: 1.3rem;
`

export default Tile