
import { useState } from 'react'
import { motion } from 'framer-motion'
import Login from './Login'
import SignUp from './Register'


const AuthTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <div className="flex">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-4 text-sm font-medium transition-colors duration-300 ${
                  activeTab === 'login'
                    ? 'text-primary'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-4 text-sm font-medium transition-colors duration-300 ${
                  activeTab === 'register'
                    ? 'text-primary'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Register
              </button>
            </div>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-primary"
              initial={false}
              animate={{
                x: activeTab === 'login' ? '0%' : '100%',
                width: '50%',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>
          <div className="p-6">
            {activeTab === 'login' ? <Login /> : <SignUp />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthTabs

