import React, { useRef, useState, useEffect } from 'react'
import { formatTime, stringToMinutes } from '../shared/functions.js'

export default () => {
    const newModifierRef = useRef(null);

    const [start, setStart] = useState(new Date().getTime());
    const [modifiers, setModifiers] = useState([]);
    const [changeCount, setChangeCount] = useState(0);
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

    }, [modifiers, changeCount]);

    const addModifier = (value: string) => {
      setModifiers([...modifiers, value])
    };

    const removeModifier = (index: number) => {
      setModifiers(modifiers.filter((value, i) => i !== index))
    };

    const changeModifier = (value: string, index: number) => {};

    const setStartTime = (e) => {
      const time = e.currentTarget.value.split(':')

      const start = new Date()
      start.setHours(parseInt(time[0]))
      start.setMinutes(parseInt(time[1]))
      start.setSeconds(0)

      setStart(start.getTime())

      setChangeCount(changeCount + 1);
    };

    return (
      <main className="order-1 bg-slate-100 p-2 rounded-md max-w-96">
        <div>
          <header className='p-6 bg-slate-300 text-blue-800 rounded-t'>
            <label htmlFor="startTime" className='block mb-2'>Start from or count to&hellip;</label>
            <input
              type="time"
              id="startTime"
              onBlur={setStartTime}
              className='bg-transparent p-2'
            />
          </header>

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
            className='text-center md:p-2 my-4'
          >
            <input
              type="text"
              placeholder="HH:MM"
              pattern="[\-0-9:hm ]+"
              ref={newModifierRef}
              className="p-1 rounded-l"
            />
            <button
              type="submit"
              className='py-1 px-4 bg-brand-orange-600 text-white rounded-r'
            >
              Add
            </button>
          </form>

          {modifiers.length === 0 && (
            <p className='my-6 text-center text-sm'>Add a time modifier <span className='block'>e.g. 4:00, 4h, 20m, -1:30</span></p>
          )}

        </div>
      </main>
    )
}
