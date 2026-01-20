/**
 * 📚 React 实战 - 增强版 Todo 页面
 * 
 * 💡 知识点：
 * - 使用自定义 Hook useTodos
 * - useMemo 性能优化
 * - 筛选和搜索功能
 * - 组件拆分
 */

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTodos } from '../hooks/useTodos'
import { TodoItem } from '../components/TodoItem'

type FilterType = 'all' | 'active' | 'completed'

export default function TodoPage() {
  // 使用自定义 Hook 管理 Todo 数据
  const { todos, loading, error, addTodo, updateTodo, toggleTodo, deleteTodo, reload } = useTodos()
  
  // 本地 UI 状态
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')

  /**
   * 💡 useMemo 优化：只在 todos/filter/search 变化时重新计算
   */
  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
      })
      .filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      )
  }, [todos, filter, search])

  /**
   * 统计信息
   */
  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  }), [todos])

  /**
   * 添加新 Todo
   */
  const handleAdd = async () => {
    if (!input.trim()) return
    try {
      await addTodo(input.trim())
      setInput('')
    } catch {
      // 错误已在 Hook 中处理
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd()
  }

  /**
   * 批量操作
   */
  const handleClearCompleted = async () => {
    const completed = todos.filter(t => t.completed)
    for (const todo of completed) {
      await deleteTodo(todo.id)
    }
  }

  return (
    <div className="page">
      <nav className="breadcrumb">
        <Link to="/">首页</Link>
        <span> / </span>
        <span>Todo 应用</span>
      </nav>

      <h1>📝 Todo 全栈应用</h1>
      <p className="subtitle">实战项目：自定义 Hook + 筛选搜索 + 编辑功能</p>

      {/* 添加 Todo */}
      <div className="card">
        <div className="todo-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="添加新任务..."
            className="input"
          />
          <button className="btn btn-primary" onClick={handleAdd}>
            添加
          </button>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="card filter-card">
        <div className="search-box">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 搜索任务..."
            className="input search-input"
          />
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            全部 ({stats.total})
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            进行中 ({stats.active})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            已完成 ({stats.completed})
          </button>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="error-box">
          ⚠️ {error}
          <button onClick={reload}>重试</button>
        </div>
      )}

      {/* Todo 列表 */}
      <div className="card">
        <h3>任务列表</h3>
        
        {loading ? (
          <p className="loading">加载中...</p>
        ) : filteredTodos.length === 0 ? (
          <p className="empty-hint">
            {search ? '没有找到匹配的任务' : '暂无任务，添加一个吧！'}
          </p>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        )}

        {/* 底部操作栏 */}
        <div className="todo-footer">
          <span className="todo-count">
            {stats.active} 项待完成
          </span>
          {stats.completed > 0 && (
            <button
              className="btn-clear"
              onClick={handleClearCompleted}
            >
              清除已完成 ({stats.completed})
            </button>
          )}
        </div>
      </div>

      {/* 提示信息 */}
      <div className="card tip-card">
        <h3>💡 使用提示</h3>
        <ul className="tip-list">
          <li>✅ <strong>双击</strong>任务文字可编辑</li>
          <li>✅ 使用搜索框快速查找任务</li>
          <li>✅ 点击筛选按钮切换显示状态</li>
          <li>✅ 点击复选框标记完成/未完成</li>
        </ul>
      </div>
    </div>
  )
}
