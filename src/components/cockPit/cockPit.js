import React from 'react';

const cockPit = (props) => {


  return (
    <div>
      {props.warning}
      <input height="100px" type="text" id="newItem" placeholder="type new item here"
        onKeyPress={props.onEnterPressed}
        onChange={props.onTextChange}></input>
      <button id="addItemButton" onClick={props.onClickAddItem}> Add new item </button>
      <button id="deleteAllButton" onClick={props.onClickDeleteAll}> Clear List </button>

    </div>

  )

}

export default cockPit;
