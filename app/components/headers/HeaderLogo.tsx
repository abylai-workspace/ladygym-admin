
import React from 'react'
import { WithLocalSvg } from 'react-native-svg'
import styled from 'styled-components/native'


const Container=styled.View`
    align-self: center;
`


export default function HeaderLogo() {
  return (
    <Container>
      <WithLocalSvg asset={require('../../assests/images/headerlogo.svg')} />
    </Container>
  )
}