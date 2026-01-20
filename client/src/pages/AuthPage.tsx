/**
 * 📚 第四阶段 - 登录/注册页面
 * 
 * 💡 知识点：
 * - Zustand 状态管理
 * - 表单处理
 * - 错误处理
 */

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'
import { authApi } from '../services/authApi'

type Mode = 'login' | 'register'

export default function AuthPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      let result
      if (mode === 'login') {
        result = await authApi.login({ email, password })
      } else {
        result = await authApi.register({ email, password, name })
      }
      
      // 登录成功，保存到 Zustand store
      login(result.user, result.access_token)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : '操作失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page auth-page">
      <nav className="breadcrumb">
        <Link to="/">首页</Link>
        <span> / </span>
        <span>{mode === 'login' ? '登录' : '注册'}</span>
      </nav>

      <div className="auth-container">
        <h1>{mode === 'login' ? '🔐 用户登录' : '📝 用户注册'}</h1>
        
        {/* 切换标签 */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError(null) }}
          >
            登录
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => { setMode('register'); setError(null) }}
          >
            注册
          </button>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="form-group">
              <label>用户名</label>
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入用户名"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>邮箱</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
              required
            />
          </div>

          <div className="form-group">
            <label>密码</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码（至少6位）"
              minLength={6}
              required
            />
          </div>

          {error && <div className="auth-error">⚠️ {error}</div>}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? '处理中...' : (mode === 'login' ? '登录' : '注册')}
          </button>
        </form>

        {/* 提示 */}
        <div className="auth-hint">
          <p>💡 这是学习示例，密码使用 bcrypt 加密存储</p>
        </div>
      </div>
    </div>
  )
}
