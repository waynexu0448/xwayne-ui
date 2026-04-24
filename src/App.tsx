import { useState } from 'react';

const agents = [
  { name: 'Omega', role: 'CEO', icon: '🎯', status: 'active', tasks: 12, color: 'from-purple-500 to-pink-500' },
  { name: 'Nexus', role: 'CTO', icon: '⚙️', status: 'active', tasks: 8, color: 'from-blue-500 to-cyan-500' },
  { name: 'Apex', role: 'Sales', icon: '📈', status: 'busy', tasks: 15, color: 'from-green-500 to-emerald-500' },
  { name: 'Ledger', role: 'Finance', icon: '💰', status: 'idle', tasks: 5, color: 'from-yellow-500 to-orange-500' },
  { name: 'Talent', role: 'HR', icon: '👥', status: 'active', tasks: 7, color: 'from-pink-500 to-rose-500' },
  { name: 'Solace', role: 'Support', icon: '💬', status: 'busy', tasks: 23, color: 'from-indigo-500 to-purple-500' },
];

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Q3 战略目标分解', agent: 'Omega', priority: 'high', status: 'pending' },
    { id: 2, title: '新客户报价生成', agent: 'Apex', priority: 'urgent', status: 'processing' },
    { id: 3, title: '月度财务报表', agent: 'Ledger', priority: 'medium', status: 'completed' },
  ]);
  const [newTask, setNewTask] = useState({ agent: 'Omega', description: '' });
  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString(), msg: '✅ Xwayne 工作平台已启动', type: 'success' },
    { time: new Date().toLocaleTimeString(), msg: '🤖 6 个 Agent 已就绪', type: 'info' },
  ]);

  const addTask = () => {
    if (!newTask.description) return;
    setTasks([...tasks, {
      id: tasks.length + 1,
      title: newTask.description,
      agent: newTask.agent,
      priority: 'medium',
      status: 'pending'
    }]);
    setLogs([{ time: new Date().toLocaleTimeString(), msg: `📋 向 ${newTask.agent} 部署任务: ${newTask.description}`, type: 'info' }, ...logs]);
    setNewTask({ ...newTask, description: '' });
  };

  const updateTaskStatus = (taskId: number, newStatus: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setLogs([{ time: new Date().toLocaleTimeString(), msg: `🔄 ${task.agent} 任务状态更新: ${task.title} → ${newStatus}`, type: 'info' }, ...logs]);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🏢</span>
              <div>
                <h1 className="text-2xl font-bold">Xwayne 工作平台</h1>
                <p className="text-sm text-gray-300">多 Agent 智能协作系统 | 完整版</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm">系统运行中</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Agent 网格 */}
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="text-2xl mr-2">🤖</span>
          核心 Agent 团队
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {agents.map(agent => (
            <div key={agent.name} className={`bg-gradient-to-br ${agent.color} rounded-xl shadow-lg p-4 text-white cursor-pointer hover:scale-105 transition transform`}>
              <div className="text-3xl mb-2">{agent.icon}</div>
              <h3 className="text-lg font-bold">{agent.name}</h3>
              <p className="text-sm opacity-90">{agent.role}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-2xl font-bold">{agent.tasks}</span>
                <span className="text-xs opacity-75">进行中</span>
              </div>
              <div className={`mt-2 text-xs px-2 py-1 rounded-full inline-block ${
                agent.status === 'active' ? 'bg-green-500/30' :
                agent.status === 'busy' ? 'bg-yellow-500/30' : 'bg-gray-500/30'
              }`}>
                {agent.status === 'active' ? '🟢 在线' : agent.status === 'busy' ? '🟡 忙碌' : '⚪ 空闲'}
              </div>
            </div>
          ))}
        </div>

        {/* 两列布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 快速任务部署 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="text-xl mr-2">🚀</span>
              快速任务部署
            </h3>
            <div className="space-y-4">
              <select
                value={newTask.agent}
                onChange={(e) => setNewTask({...newTask, agent: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                {agents.map(a => <option key={a.name} value={a.name}>{a.icon} {a.name} ({a.role})</option>)}
              </select>
              <textarea
                placeholder="任务描述..."
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none"
              />
              <button
                onClick={addTask}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
              >
                部署任务 →
              </button>
            </div>
          </div>

          {/* 任务看板 */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="text-xl mr-2">📋</span>
              任务看板
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tasks.map(task => (
                <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs font-medium">{task.agent}</span>
                        <select
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded border ${getStatusColor(task.status)}`}
                        >
                          <option value="pending">⏳ 待处理</option>
                          <option value="processing">⚙️ 处理中</option>
                          <option value="completed">✅ 已完成</option>
                        </select>
                      </div>
                      <p className="text-gray-800">{task.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 实时活动日志 */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <span className="text-xl mr-2">📡</span>
            实时活动日志
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                <span className="text-xs text-gray-400 font-mono">{log.time}</span>
                <span className="text-sm text-gray-700">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;