import React from "react"
import QnAAnsList from "./QnAAnsList.jsx";
import axios from 'axios';

class QnAList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      qs: this.props.qnaSet.question,
      ans: this.props.qnaSet.ans,
      showAnsModal: false,
      numAns: 2
    }
  }

  qshelpful = () => {

  }
  addAnswer = () => {
    this.setState({
      showAnsModal: true
    })
  }

  closeModal = () => {
    this.setState({
      showAnsModal: false
    })
  }

  loadAns = () => {
    this.setState(
      {
        numAns: this.state.numAns + 2
      }
    )
  }

  render(){

    return (
      <div>
        <div>
          <a><b>Q: {this.state.qs}</b></a>
        </div>
        <div id = "qsChoice">
          <a class = "lvl3">Helpful? </a>
          <a class = "lvl4"><p onClick={this.qshelpful}><u>Yes</u></p><p> &#40;{this.state.qs.qsHelpful}&#41;  |  </p></a>

              {
                this.state.showAnsModal ? (<div>
                    <form>
                      <input style="color:#888;" placeholder="Enter Answer"></input>
                      <button onClose={closeModal}>X</button><input type="submit" value="Submit"></input>
                    </form>
                  </div>):(<p onClick={this.addAnswer}><u>Add Answer</u></p>)
              }
        </div><br/>
        <div>
          <a><b>A: </b></a>
          {this.state.ans.slice(0,this.state.numAns).map(ans => {
            <QnAAnsList ans = {ans}/>
          })}

        <p class = "lvl4" onClick = {this.loadAns}><b>LOAD MORE ANSWERS</b></p>
        </div><br/>
    </div>
    )
  }

}

export default QnAList