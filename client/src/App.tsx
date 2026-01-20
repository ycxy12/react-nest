/**
 * 📚 第四阶段 - 主应用组件 (含认证路由)
 */

import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TodoPage from './pages/TodoPage'
import ExamplesPage from './pages/ExamplesPage'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<TodoPage />} />
        <Route path="/examples" element={<ExamplesPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  )
}

export default App
