import { useEffect, useState } from 'react'
import './App.css'
import { sendQuestion } from './actions'

function App() {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
      { id: '1', text: 'Ask me anything!', owner: 'bot' }, 
  ]);

  // Scrolear al final del chat cuando se envia un mensaje
  useEffect(() => {
      const msgBox = document.getElementById('msg-box');
      if (msgBox) {
      msgBox.scrollTop = msgBox.scrollHeight;
      }
  }, [messages])

  async function handleSubmit(event){
      event.preventDefault()

      const formData = new FormData(event.target)

      setIsLoading(true)

      //Muestro la pregunta mensaje de usuario
      setMessages(messages => messages.concat({ 
          id: Math.random().toString(), 
          text: formData.get('question'), 
          owner: 'user' }
      ))
      //Limpio Input
      event.target.reset();

      //Envio la pregunta al bot y guardo la respuesta
      const answer = await sendQuestion(formData.get('question'))

      //Muestro la respuesta
      setMessages(messages => messages.concat({ 
          id: Math.random().toString(), 
          text: answer, 
          owner: 'bot' }
      ))

      setIsLoading(false)


  }

  return(
    <>
    <div className='mb-10'>
      <h1 className="text-5xl text-slate-400 text-center p-4 mb-0 ">Chat Bot 🤖 </h1>
      <p>How can I help you out?</p>
    </div>
        <section className="w-[750px] max-w-full p-4 grid gap-4 bg-primary-600 border-2 border-slate-500 rounded-md">  
          <article id="msg-box" className="grid gap-4 max-h-[320px] h-[320px] items-start overflow-y-auto pr-5">
              {messages.map(message => (
                  <div key={message.id} className={` p-4 rounded-3xl bg-slate-700 text-white w-fit ${message.owner === 'user' ? 'bg-slate-900 ml-auto rounded-br-none' : 'rounded-bl-none' }`}>
                      {message.text}
                  </div>
              ))}
          </article>

            <form onSubmit={handleSubmit} className="flex">
                <input className="rounded-l-lg px-4 leading-[2.5rem] bg-white text-black flex-1" type="text" name="question" />
                <button disabled={isLoading} className="disabled:opacity-50 bg-slate-500 leading-[2.5rem] px-4 rounded-r-lg text-white  " type="submit">
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </section>
      </>
  )
}

export default App
