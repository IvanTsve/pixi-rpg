import { Application, extend } from '@pixi/react'
import { Container, Graphics } from 'pixi.js'
import { useCallback } from 'react'

extend({ Container, Graphics })

export default function App() {
  const draw = useCallback((g: Graphics) => {
    g.clear()
    g.setFillStyle({ color: 'red' })
    g.rect(0, 0, 100, 100)
    g.fill()
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Application>
        <pixiContainer x={100} y={100}>
          <pixiGraphics draw={draw} />
        </pixiContainer>
      </Application>
    </div>
  )
}
