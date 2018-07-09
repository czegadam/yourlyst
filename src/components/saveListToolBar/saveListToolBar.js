import React from 'react';

const saveListToolBar = (props) => {
  return (
  <div>
    <h5> New List {props.currentListName} {props.currentListSaved ? "Saved" : "Not saved"}</h5>
    <button id="saveListButton" onClick={props.onClick}> Save list </button>
    <input type="text" id="listNameInput" placeholder="add list name">
      </input>
  </div>)
};

export default saveListToolBar;
