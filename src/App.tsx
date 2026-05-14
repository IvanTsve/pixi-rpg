import { Application, extend } from '@pixi/react'
import { initDevtools } from '@pixi/devtools'
import { Container, Graphics } from 'pixi.js'
import Map from './components/Map'
import Wall from './components/Wall'
extend({ Container, Graphics })

export default function App() {
  return (
      <Application
        background={'#1099bb'}
        onInit={(app) => {
          if (import.meta.env.DEV) {
            void initDevtools({ app })
          }
        }}
      >
        <pixiContainer x={300} y={400}>
          <Map />
          <Wall />
        </pixiContainer>
      </Application>
  )
}
