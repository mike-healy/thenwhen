import './App.css'
import Chain from './components/Chain'
import ExampleModifier from './components/ExampleModifier'

function App() {
  return (
    <div className='min-h-svh flex flex-col gap-y-8'>
      <div className="grow flex flex-col md:justify-center place-items-center gap-y-12 md:gap-y-24 mt-8 md:mt-12">

        <Chain />

        <section className="">
          <h1 className='flex items-center gap-x-2 mb-2 text-brand-orange text-xl'>
            <img
              src="icon.svg"
              width="32"
              height="32"
              alt="icon"
            />
            Then When
          </h1>
          <p className="text-sm text-slate-300 font-light">
            Chain steps forwards or backwards in time.<br />
            Add modifiers like <ExampleModifier value="1h 30m"/>, <ExampleModifier value="2:10"/>, <ExampleModifier value="-0:35"/>
          </p>
        </section>
      </div>
      <footer className="py-4 md:py-8 text-sm text-slate-400">
        by <a href="https://www.mikehealy.com.au" className='text-blue-400 decoration-blue-600 underline'>Mike Healy</a>
      </footer>
    </div>
  )
}

export default App
