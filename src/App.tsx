import { Application, extend } from '@pixi/react'
import { Container, Graphics } from 'pixi.js'
import Map from './components/Map'
extend({ Container, Graphics })

export default function App() {

  return (
      <Application background={'#1099bb'}>
        <pixiContainer x={300} y={400}>
          <Map />
        </pixiContainer>
      </Application>
  )
}
