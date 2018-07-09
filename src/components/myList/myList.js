import React from 'react';

const myList = (props) => {
  const listItemButton = (index) =>
      {return (<button
      style={{marginBottom: "2px", marginTop: "2px"}}
      id={'button' + index}
      onClick={() => props.onClickHandler(index)}
      >x</button>
    )}

  return(
    <ol>
      {props.myList.map((listItem, index) =>
        (
          <div
            className="list"
            key={'item'+index}
            id={'fullItem' + index}>

            <li>
              <div style={{width:"50px", alignItems: "center", textAlign:"center"}} >{listItemButton(index)}</div>
              <div>{listItem}</div>
            </li>
          </div>
        ))
      }
    </ol>
  )
}

export default myList;
