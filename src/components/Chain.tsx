import { useRef, useState } from 'react'

export default () => {

    const newModifierRef = useRef(null);

    const [start, setStart] = useState(new Date());
    const [modifiers, setModifiers] = useState([]);

    const addModifier = (value: string) => {
      setModifiers([...modifiers, value])
    };

    const removeModifier = (index: number) => {}
    const changeModifier = (value: string, index: number) => {}

    const format = (date: Date) => `${date.getHours()}:${date.getMinutes()}`;

    return <main className="order-1 bg-slate-100 p-2 rounded-md">
      <div>

        <header className='p-6 bg-slate-900 text-brand-orange rounded-t'>
          {format(start)} <span className="opacity-70 ml-4">(placeholder)</span>
        </header>

        {modifiers.length > 0 && (
            <ul className='my-6 space-y-1'>
              {modifiers.map((mod, index) => <li key={index}>{mod}</li>)}
            </ul>
        )}
        {modifiers.length === 0 && <p className='my-6'>(none)</p>}

        {/*
          Add a Modifier
          - Probably will componentise this, and
          - Probably will use Xstate store when that happens
        */}
        <div className='text-center p-2'>
          <input
            type="text"
            placeholder="HH:MM"
            ref={newModifierRef}
            className='p-2'
          />
          <button
            onClick={() => {
              addModifier(newModifierRef.current.value)
              newModifierRef.current.value = ''
              newModifierRef.current.focus()
            }}
            className='py-2 px-4 bg-brand-orange-600 text-white'
          >
            Add
          </button>
        </div>
      </div>
    </main>
}

/*
copy summary to clipboard

Start 2:30am
+ 1:20 = 3:50am
+ 15m = 4:05am
- 2h = 2:05am
*/