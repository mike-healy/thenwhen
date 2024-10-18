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
      if (isNaN(stringToMinutes(value))) {
        return
      }

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

      setChangeCount(changeCount + 1)
    };

    // Cool, but it won't reflect in the UI because React is one-way
    const startFromNow = () => {
      const d = new Date()
      setStart(d.getTime())

      setChangeCount(changeCount + 1)
    };

    return (
      <main className="order-1 bg-gray-600 p-0.5 rounded-md max-w-96">
        <div>
          <header className='py-4 bg-gray-800 from-slate-900 to-slate-800 _bg-gradient-to-tr text-brand-orange rounded-t'>
            <label
              htmlFor="startTime"
              className='block text-center'
            >
              Start / end time
            </label>
            <div className='grid grid-cols-[1fr,1fr,10ch] items-center gap-x-4'>
              <div className='ps-4'>…</div>
              <div>
              <input
                type="time"
                id="startTime"
                onBlur={setStartTime}
                className='bg-transparent py-2'
              />
              </div>
              <div className='pe-4 text-right'>
              <button
                onClick={startFromNow}
                  className='px-2 py-.5 bg-brand-orange-100 text-gray-900 rounded text-sm'
              >
                now
              </button>
              </div>
            </div>
          </header>

          {stepResults.length > 0 && (
            <ul className='mb-6 text-sm bg-gray-100'>
              {stepResults.map((result, index) => (
                <li
                  key={index}
                  className='even:bg-gray-200 grid grid-cols-[2rem,1fr,1fr,10ch] items-center gap-x-4'
                >
                  <div className="flex -my-6">
                    <span className="border-r-2 border-gray-400 h-full w-8 _block table-cell">&nbsp;</span>
                  </div>
                  <span className='ps-4'>{modifiers[index]}</span>
                  <span className='text-right pr-6'>{formatTime(dateFromTime(result))}</span>
                  <div className='text-right py-2 pe-2'>
                  <button
                    onClick={() => removeModifier(index)}
                      className='font-bold px-2 py-1'
                    >
                    &#215;
                  </button>
                  </div>
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
              className="p-1 rounded-l border border-blue-400"
            />
            <button
              type="submit"
              className='py-1 px-4 bg-blue-600 text-white rounded-r border border-blue-400'
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
