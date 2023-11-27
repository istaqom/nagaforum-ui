import { Route, Routes } from "react-router-dom"
import './App.css'

import { HomeScreen } from "./screens/home"
import { ThreadScreen } from "./screens/thread"
import { CreateThreadScreen } from "./screens/create_thread"
import { EditThreadScreen } from "./screens/edit_thread_screen"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/thread/:id" element={<ThreadScreen />} />
      <Route path="/thread/create" element={< CreateThreadScreen />} />
      <Route path="/thread/edit/:id" element={< EditThreadScreen />} />
    </Routes>
  )
}

export default App
