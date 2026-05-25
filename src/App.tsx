import { Application } from '@pixi/react'
import { Level } from './components/Level'
import { Hero } from './components/Hero'
export default function App() {
  return (
    <Application
      width={900}
      height={500}
      background="#1099bb"
    >
    <Level />
    <Hero />
    </Application>
  )
}
