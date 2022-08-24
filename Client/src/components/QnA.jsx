import React from 'react';
import axios from 'axios';
import QSModal from './QnAQSModal.jsx'
import QnASearch from './QnASearch.jsx'
import QnAList from './QnAQSList.jsx'


class QnA extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        qna: [],
        qsModalshow: false,
        searching: false,
        searchResult: [],
        numQS: 2
      }
      const endpoint = "http://localhost:3000/";
    }

    componentDidMount = () => {
      //API call to get questions and answers.
      console.log(this.props.id);
      axios({
        method:'get',
        url: this.endpoint + "qs",
        data: {
          productId: this.props.id
        }
      }).then((result)=>{
        this.setState({
          qna: result
        })
      }).catch(err => {
        console.log(err)
      })
    }

    loadMore = () => {
      this.setState({
        numQS: this.state.numQS + 2
      })
      //send
    }

    showQSModal = () => {
      this.setState({
        qsModalshow: true
      })
    }

    Search = (QS) => {
      //write search function
      let searchResult = [];
      this.state.qna.forEach((val) => {
        if(val.results.question_body.includes(QS)){
          searchResult.push(val);
        }
      })
      if(searchResult.length > 0){
        this.setState({
          searchResult: searchResult,
          searching: true
        })
      }
    }

    cancelSearch = () => {
      this.setState({
        searchResult: [],
        searching: false
      })
    }

    render() {

        return ( <>
            <h3> QUESTIONS &#38; ANSWERS </h3>
            <div><QnASearch search = {this.Search.bind(this)}/></div><button type="button" onClick={this.cancelSearch.bind(this)}>X</button>
            <div>
               {this.state.qna.slice(0, this.state.numQS).map((qs, i) =>
                <QnAList qnaSet = {qs}/>
                )}
            </div>
            <div>
              <button id = "loadMore" onClick = {this.loadMore}> MORE ANSWER QUESTIONS </button>
              {this.state.qsModalshow ? <QnAQSModal/> : <button onClick = {this.showQSModal}> ADD A QUESTION + </button>}
            </div>
            </>)}
}

export default QnA;