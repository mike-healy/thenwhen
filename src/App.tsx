import './App.css'
import Chain from './components/Chain'

function App() {
  return (
    <div className='md:grid grid-cols-2 gap-x-16'>
      <section className="order-2">
        <h1 className='text-brand-orange text-xl font-medium'>Then When</h1>
        <p className='text-slate-300'>WIP</p>
      </section>

      <Chain />
    </div>
  )
}

export default App
