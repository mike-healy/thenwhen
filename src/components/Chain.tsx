import React, { useRef, useState } from 'react'
import { formatTime } from '../shared/functions.js'

export default () => {
    const newModifierRef = useRef(null);

    const [start, setStart] = useState(new Date());
    const [modifiers, setModifiers] = useState([]);

    const addModifier = (value: string) => {
      setModifiers([...modifiers, value])
    };

    const removeModifier = (index: number) => {
      setModifiers(modifiers.filter((value, i) => i !== index))
    }

    const changeModifier = (value: string, index: number) => {}

    return <main className="order-1 bg-slate-100 p-2 rounded-md">
      <div>
        <header className='p-6 bg-slate-900 text-brand-orange rounded-t'>
          {formatTime(start)} <span className="opacity-70 ml-4">(placeholder)</span>
        </header>

        {modifiers.length > 0 && (
            <>
              <small className='block py-2 text-center'>(nothing happens yet)</small>
              <ul className='mb-6'>
                {modifiers.map((mod, index) => (
                  <li
                  key={index}
                  className='px-6 py-2 even:bg-slate-200 flex items-center justify-between'
                  >
                    <span>{mod}</span>
                    <button
                      onClick={() => removeModifier(index)}
                      className='font-bold p-2'
                      >
                      &#215;
                    </button>
                  </li>
                ))}
              </ul>
            </>
        )}
        {modifiers.length === 0 && <p className='my-6 text-center'>Add a time modifier <span>e.g. 4:00</span></p>}

        {/*
          Add a Modifier
          - Probably will componentise this, and
          - Probably will use Xstate store when that happens
        */}
        <form
          onSubmit={(e) => {
            e.preventDefault()

            addModifier(newModifierRef.current.value)
            newModifierRef.current.value = ''
            newModifierRef.current.focus()
          }}
          className='text-center p-2'
        >
          <input
            type="text"
            placeholder="HH:MM"
            ref={newModifierRef}
            className='p-2 rounded-l'
          />
          <button
            type="submit"
            className='py-2 px-4 bg-brand-orange-600 text-white rounded-r'
          >
            Add
          </button>
        </form>
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