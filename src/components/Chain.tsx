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
      <main className="order-1 bg-gray-600 bg-gradient-to-tl from-brand-orange to-gray-300 via-blue-800 p-0.5 rounded-md max-w-96">
        <div>
          <header className='py-4 bg-gray-800 from-slate-900 to-slate-800 _bg-gradient-to-tr text-brand-orange rounded-t'>
            <label
              htmlFor="startTime"
              className='block text-center'
            >
              Start / end time
            </label>
            <div className='grid grid-cols-[1fr,1fr,10ch] items-center gap-x-4'>
              <div className='ps-4 border-b border-brand-orange'></div>
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
                  className='px-2 py-.5 bg-brand-orange-100 text-gray-900 rounded-sm text-sm'
                >
                  now
                </button>
              </div>
            </div>
          </header>

          {modifiers.length === 0 && (
            <article className='bg-gray-200 py-4 text-center font-bold'>
              Add time modifiers
            </article>
          )}
          {stepResults.length > 0 && (
            <ul className='bg-gray-100'>
              {stepResults.map((result, index) => (
                <li
                  key={index}
                  className='even:bg-gray-200 grid grid-cols-[2rem,1fr,1fr,10ch] items-center gap-x-4'
                >
                  <div
                    aria-hidden={true}
                    className="flex"
                  >
                    <span className="border-r border-gray-400 w-8 py-2 block __bg-gradient-to-tl from-gray-200 to-gray-100">&nbsp;</span>
                  </div>
                  <span className='ps-4'>{modifiers[index]}</span>
                  <span className='text-right pr-6'>{formatTime(dateFromTime(result))}</span>
                  <div className='text-right pe-2'>
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

            <article
              className='bg-gray-100 grid grid-cols-[2rem,1fr,1fr,10ch] items-center gap-x-4 rounded-b'
            >
              <form
                onSubmit={(e) => {
                e.preventDefault()

                addModifier(newModifierRef.current.value)
                newModifierRef.current.value = ''
                newModifierRef.current.focus()
              }}
              className='col-span-3 col-start-2 ps-4 my-4'
            >
              <input
                type="text"
                placeholder="HH:MM"
                pattern="[\-0-9:hm ]+"
                required
                ref={newModifierRef}
                className="p-1 rounded-l-sm border border-r-0 border-slate-400"
              />
              <button
                type="submit"
                aria-label="Add modifier to chain"
                className='py-1 px-4 bg-slate-600 text-white rounded-r-sm border border-blue-400'
              >
                +
              </button>
            </form>
          </article>
        </div>
      </main>
    )
}
