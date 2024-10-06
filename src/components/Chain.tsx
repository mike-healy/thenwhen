import React, { useRef, useState, useEffect } from 'react'
import { formatTime, stringToMinutes } from '../shared/functions.js'

export default () => {
    const newModifierRef = useRef(null);

    const [start, setStart] = useState(new Date().getTime());
    const [modifiers, setModifiers] = useState([]); // '1:00', '2:30', '-0:15'
    const [stepResults, setStepResults] = useState([
      new Date().getTime(),
    ]);

    const dateFromTime = (time: number) => {
      const d  = new Date()
      d.setTime(time)
      return d
    };

    useEffect(() => {
      const calculatedTimes = [];

      if (modifiers.length > 0) {
        modifiers.reduce((upTo: number, modifier: string) => {
          const nextStop = upTo + (stringToMinutes(modifier) * 60_000);
          calculatedTimes.push(nextStop)
          return nextStop
        }, start);
      }

      setStepResults(calculatedTimes);

    }, [modifiers]);

    const addModifier = (value: string) => {
      setModifiers([...modifiers, value])
    };

    const removeModifier = (index: number) => {
      setModifiers(modifiers.filter((value, i) => i !== index))
    };

    const changeModifier = (value: string, index: number) => {};

    return (
      <main className="order-1 bg-slate-100 p-2 rounded-md max-w-96">
        <div>
          <header className='p-6 bg-slate-900 text-brand-orange rounded-t'>
            {formatTime(dateFromTime(start))}
          </header>

          {modifiers.length === 0 && (
            <p className='my-6 text-center'>Add a time modifier <span>e.g. 4:00</span></p>
          )}

          {stepResults.length > 0 && (
            <ul className='mb-6 text-sm'>
              {stepResults.map((result, index) => (
                <li
                  key={index}
                  className='px-6 py-2 even:bg-slate-200 flex items-center gap-x-4 justify-between'
                >
                  <span>{modifiers[index]}</span>
                  <span>{formatTime(dateFromTime(result))}</span>
                  <button
                    onClick={() => removeModifier(index)}
                    className='font-bold p-2'
                    >
                    &#215;
                  </button>
                </li>
              ))}
            </ul>
          )}

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
              pattern="[\-0-9:hm ]+"
              ref={newModifierRef}
              className="p-2 rounded-l"
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
    )
}
