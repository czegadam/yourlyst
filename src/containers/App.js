import React, { Component } from 'react';
import './App.css';
import CockPit from '../components/cockPit/cockPit';
import MyList from '../components/myList/myList';
import SaveListToolBar from '../components/saveListToolBar/saveListToolBar';
import main01 from '../assets/logos/main01.svg';
import main02 from '../assets/logos/main02.svg';
import main03 from '../assets/logos/main03.svg';
import main04 from '../assets/logos/main04.svg';
import main05 from '../assets/logos/main05.svg';

const logos = [main01,main02,main03,main04,main05];
const logo = logos[Math.floor(Math.random() * Math.floor(logos.length))];


class App extends Component {
  constructor(props){
    super(props);

    this.addItem = this.addItem.bind(this);
    this.clearList = this.clearList.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
    this.textChange = this.textChange.bind(this);
    this.saveList = this.saveList.bind(this);
    this.checkIfCurrentListSaved = this.checkIfCurrentListSaved.bind(this);

  }

  state = {
    thisList: [],
    warning: "",
    currentListSaved: false,
    currentListName: "",
    savedList: [],
    listItemDeleteButtonShown: "",
    savedLists:{}

  }

  // added a comment here 
  constants = {
    pageTitle: "yourlyst.com"
  }

  deleteItem(id){
    const updatedList = [...this.state.thisList];
    updatedList.splice(id,1);
    this.setState({thisList: updatedList});
    this.setState({currentListSaved: false});
  }

  addItem(){
    const updatedList = [...this.state.thisList];
    const newItem = document.getElementById("newItem").value;
    if (newItem !== ""){
      updatedList.push(newItem);
      this.setState({thisList: updatedList});
    } else {
      this.setState({warning: <div><p className='warningmessage'>Type something</p><br></br></div>});
    }
    document.getElementById("newItem").value = "";
    this.checkIfCurrentListSaved();
  }

  enterPressed(event){
    if(event.keyCode === 13 || event.which === 13) { //13 is the 'Enter' keycode
      this.addItem(document.getElementById("newItem").value)
      document.getElementById("newItem").value = ""
    }
  }

  textChange(event){
    if ( event.target.value !== ""){
      this.setState({warning: ""});
    }
  }

  clearList(){
    this.setState({thisList: []});
    this.checkIfCurrentListSaved();
  }

  checkIfCurrentListSaved(){
    const currentList = this.state.thisList;
    const currentListName = this.state.currentListName;
    const currentListNameSaved = this.state.savedLists[currentListName];
    const currentListSaved = this.listsAreTheSame(currentList,currentListNameSaved);
    this.setState({currentListSaved: currentListSaved});
    console.log("list saved " + this.state.currentListSaved);

  }

  listsAreTheSame(list1,list2){
    if (list1 instanceof Array && list2 instanceof Array) {
      if (list1.length !== list2.length) return false;
      for (let i = 0; i < list1.length; i++) {
          if (list1[i] !== list2[i]) {
              return false;
          }
      }
    } else {
      return false
    }
    return true;
  }

  saveList(){
    const savedListName = document.getElementById("listNameInput").value;
    const tempCurrentListContainer = {...this.state.savedLists};
    tempCurrentListContainer[savedListName] = [...this.state.thisList];

    this.setState({savedLists: tempCurrentListContainer});
    this.setState({currentListName: savedListName});
    this.setState({currentListSaved: true});
  }

  render() {
    let saveListToolBar = null;
    const currentListName = this.state.currentListName


    const listSavedStatus = this.state.currentListSaved ? "Saved" : "Not saved";

    if (this.state.thisList.length > 0 ) {
        saveListToolBar =

        <SaveListToolBar
          currentListName = {this.state.currentListName}
          currentListSaved = {this.state.currentListSaved}
          onClick = {this.saveList}
          />
      }


    return (
      <div className="App" >
        <header className="header">
          <img src={logo} className="App-logo" alt="logo" height="80" width="130"/>

          <CockPit
            warning={this.state.warning}
            onTextChange = {this.textChange}
            onEnterPressed = {this.enterPressed}
            onClickDeleteAll = {this.clearList}
            onClickAddItem = {this.addItem}/>
        </header>
        {saveListToolBar}
        <MyList
          onClickHandler={this.deleteItem}
          myList={this.state.thisList}/>

      </div>
    );
  }
}

export default App;
