import './App.css'
import Chain from './components/Chain'

function App() {
  return (
    <div className='md:grid grid-cols-2 gap-x-16'>
      <section className="order-2">
        <h1 className='text-brand-orange text-xl'>Then When</h1>
        <p className='text-slate-300 font-light'>
          Add time increments such as 1:00 for 1 hour, -2:30 for minus 2&frac12; hours etc…
        </p>
      </section>

      <Chain />
    </div>
  )
}

export default App
