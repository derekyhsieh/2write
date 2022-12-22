import './MentionList.css'
import { Loader } from '@mantine/core';


import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'



export const MentionList = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isClicked, setIsClicked] = useState(false)

  const selectItem = index => {
    const item = props.items[index]

    if (item) {
      props.command({ id: item })
    }
  }

  const upHandler = () => {
    setSelectedIndex(((selectedIndex + props.items.length) - 1) % props.items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    if(isClicked == false) {
      selectItem(selectedIndex)
      setIsClicked(true)
    } 
    
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    },
  }))

  if(isClicked){

    <div className="items">
      <Loader/>
    </div>
    
  }

  return (


    <div className="items">

      {
        isClicked ? (
          <Loader/>
        ) : (
          <div>
          {props.items.length
            ? props.items.map((item, index) => (
              <button
                disabled={isClicked}
                className={`item ${index === selectedIndex ? 'is-selected' : ''}`}
                key={index}
                onClick={() => {
    
                  if(!isClicked)  {
                    selectItem(index)
                    console.log("clicked!")
                    setIsClicked(true)
                  }
                }
              }
              >
                {item}
              </button>
            ))
            : <div className="item">No result</div>
          }
          </div>
        )
      }

     
    </div>
  )
})