import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { faPython } from '@fortawesome/free-brands-svg-icons'
import { faCode, faLocationArrow, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function MainPage() {
    const [message, setMessage] = useState("")
    const [isChatting, setIsChatting] = useState(false);
    const [messages, setMessages] = useState([]); 

    const [loading,setLoading]=useState(false);

    useEffect(() => { setMessages([]) }, [isChatting])

    const AIresponse = async (prompt) => {
        if (prompt.length > 0) {
            setLoading(true)
            try {
                setIsChatting(true)

                const result = await model.generateContent(prompt);
                const resmsg =  result.response.text();
            
                const newMessages = [
                    ...messages,
                    { type: "userMsg", text: prompt },
                    { type: "responseMsg", text: resmsg },
                  ];
                  
                setMessages(newMessages); // Append new messages to the existing ones
                setMessage("")//empty the input

            } catch (error) {
                console.error('Error fetching AI response:', error);
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        } else {
            alert("You must write something");
        }
    }



    return (
        <div className='relative container w-screen h-[100vh] bg-black text-white  p-30 '>
            {
                !isChatting ?
                    <div className='absolute top-1/2 left-1/2 transform- translate-x-[-50%] translate-y-[-50%] text-center'>
                        <h1 className='text-5xl font-semibold tracking-widest '>Assist Me</h1>

                        <div className='mt-7 flex gap-4'>
                            <Card text={"learn python easily with me.ready?"} Cardicon={faPython} />
                            <Card text={"leave everything for me."} Cardicon={faCode} />
                            <Card text={"favourite reastuarants near me."} Cardicon={faUtensils} />
                        </div>

                    </div>
                    :
                    <div className='  w-[70vw] absolute  left-1/2 transform- translate-x-[-50%]  '>
                        <div id='header' className='flex justify-between items-center mt-6'>
                            <h1 className='text-2xl '>Assist Me</h1>
                            {loading && <div className='loader'></div>}
                            <button className='bg-[#171718] h-[35px] p-2 rounded-lg' onClick={() => setIsChatting(false)}>New Chat</button>
                           
                        </div>

                        <div id="messages" className='messages mt-3  overflow-y-auto max-h-[500px] custome-scrollbar p-20'> {/*scroll bar class for customisation */ }
                            {
                                messages?.map((item,index)=>(
                                    <div className={item.type}>{item.text}</div>    
                                ))
                            }
                         
                        </div>

                    </div>
            }
            <div className='absolute bottom-20 left-1/2 transform- translate-x-[-50%] '>
                <div id="bottom-part" >
                    <div id='inputbox ' className=' bg-[#171718] rounded-full w-[70vw] px-4 flex justify-between items-center'>
                        <input type="text" placeholder='enter your message here...' name='message' value={message} onChange={(e) => setMessage(e.target.value)} className='p-4 text-2xl bg-transparent rounded-full text-white outline-none w-full me-2' />
                        <FontAwesomeIcon icon={faLocationArrow} className='text-2xl hover:cursor-pointer' onClick={() => AIresponse(message)} />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default MainPage
