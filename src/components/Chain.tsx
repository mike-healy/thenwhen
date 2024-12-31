import React, { useRef, useState, useEffect } from 'react'
import { formatTime, formatTimeForInput, stringToMinutes, formatModifier } from '../shared/functions.js'

export default () => {
  const newModifierRef = useRef(null);

  const [start, setStart] = useState(new Date().getTime());
  const [initial, setInitial] = useState('');
  const [modifiers, setModifiers] = useState([]);
  const [changeCount, setChangeCount] = useState(0);
  const [stepResults, setStepResults] = useState([
    new Date().getTime(),
  ]);

  const dateFromTime = (time: number) => {
    const d = new Date()
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

    // Default input to now on first render only
    if (changeCount === 0) {
      const now = new Date()
      setInitial(formatTimeForInput(now))
    }

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

  const changeModifier = (value: string, index: number) => { };

  const changeStartTime = (e) => {
    const time = e.currentTarget.value.split(':')

    const start = new Date()
    start.setHours(parseInt(time[0]))
    start.setMinutes(parseInt(time[1]))
    start.setSeconds(0)

    setStart(start.getTime())

    setInitial(formatTimeForInput(start))

    setChangeCount(changeCount + 1)
  };

  const startFromNow = () => {
    const d = new Date()
    setStart(d.getTime())

    setInitial(formatTimeForInput(d))

    setChangeCount(changeCount + 1)
  };

  return (
    <main className="bg-gray-600 bg-gradient-to-br
    from-[#2c3b4d] via-[#aaa498] to-[#d1cbc0] _via-[#1b3642] from-50% via-85%
    p-1 sm:p-4 rounded-md
    ">
      <div className="shadow">
        <header className="py-4 bg-gray-800/80 text-brand-orange rounded-t">
          <div className="grid grid-cols-[1fr,1fr,8ch] items-center gap-x-2 sm:gap-x-4">
            <span />
            <label
              htmlFor="startTime"
              className="block"
            >
              Start / End
            </label>
            <span />
          </div>
          <div className="h-8 grid grid-cols-[1fr,1fr,8ch] items-center gap-x-2 sm:gap-x-4">
            <div className="-mb-6 flex items-start" aria-hidden="true">
              <div className="w-8 h-8 border-r border-brand-orange"></div>
              <div className="ps-4 border-b border-brand-orange">
              </div>
            </div>

            <div>
              <input
                type="time"
                id="startTime"
                value={initial}
                onChange={changeStartTime}
                className="py-2 bg-transparent text-white"
                style={{ colorScheme: 'dark' }}
              />
            </div>
            <div className="pe-2 sm:pe-4 text-right">
              <button
                onClick={startFromNow}
                className="px-2 py-.5 text-gray-300 decoration-gray-500 underline text-sm"
              >
                now
              </button>
            </div>
          </div>
        </header>

        {modifiers.length === 0 && (
          <article className="bg-slate-200 py-2 text-center font-bold">
            Add time modifiers
          </article>
        )}

        {stepResults.length > 0 && (
          <ul className="bg-slate-100 text-sm md:text-base">
            {stepResults.map((result, index) => (
              <li
                key={index}
                id={`modifier_${index}`}
                className="even:bg-gray-200 grid grid-cols-[2rem,1fr,1fr,10ch] items-center gap-x-2 sm:gap-x-4"
              >
                <div
                  aria-hidden="true"
                  className="flex"
                >
                  <span className="border-r border-gray-400 w-8 py-2 block">&nbsp;</span>
                </div>
                <div className="ps-2 md:ps-4">{formatModifier(modifiers[index])}</div>
                <div className="text-right pe-2 md:pe-4">{formatTime(dateFromTime(result))}</div>
                <div className="text-right pe-2">
                  <button
                    onClick={() => removeModifier(index)}
                    className="font-bold px-2 py-1"
                    aria-controls={`modifier_${index}`}
                    aria-label={`Delete ${modifiers[index]}`}
                    title={`Delete ${modifiers[index]}`}
                  >
                    &#215;
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <article
          className="bg-slate-100 grid grid-cols-[2rem,1fr,1fr,8ch] items-center gap-x-2 sm:gap-x-4 rounded-b"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()

              addModifier(newModifierRef.current.value)
              newModifierRef.current.value = ''
              newModifierRef.current.focus()
            }}
            className="ps-2 col-span-3 col-start-2 my-4"
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
              className="py-1 px-4 bg-slate-600 text-white rounded-r-sm border border-blue-400"
            >
              +
            </button>
          </form>
        </article>
      </div>
    </main>
  )
}
