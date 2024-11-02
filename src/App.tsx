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
      <footer className="flex items-center gap-x-4 py-4 md:py-8 text-sm text-slate-400">
        <span>by <a href="https://www.mikehealy.com.au" className='text-blue-400 decoration-blue-600 underline'>Mike Healy</a></span>
        <a
          href="https://x.com/mike_hasarms"
          target="_blank"
          rel="no-opener"
          className="text-slate-200"
        >
          <svg className="inline-block" role="img" aria-label="Twitter X" width="15.6" height="16" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
          </svg>
        </a>
      </footer>
    </div>
  )
}

export default App
