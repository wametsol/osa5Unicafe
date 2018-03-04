import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducer'
import {createStore} from 'redux'


counterReducer
const store = createStore(counterReducer)



const kA = (a, b) => {
  const ka = a/b
  let sana = ''
  console.log(ka);
  
  
  if(ka<(-0.33)){
    sana = 'Huono'
  }
  else{
    sana = 'Neutraali'
  }
  if(ka>(0.33)){
    sana = 'Hyvä'
  }
return(
  <b>{sana}</b>
)
}
const Statistiikka = () => {
  const palautteet = store.getState()
  const palautteita = palautteet.bad + palautteet.good + palautteet.ok
  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{palautteet.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{palautteet.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{palautteet.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{kA(palautteet.good-palautteet.bad,palautteita)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{Math.round((palautteet.good/palautteita)*1000)/10} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => store.dispatch({type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}


class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({type: nappi})
    console.log(store.getState());
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)