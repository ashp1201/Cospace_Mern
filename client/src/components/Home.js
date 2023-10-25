import { useState ,React,useEffect }  from "react";
import b1 from '../asserts/off9.png';
import b2 from '../asserts/off11.png';
import b3 from '../asserts/off7.png';
import b4 from '../asserts/off8.png';
import b5 from '../asserts/off10.png';
import b6 from '../asserts/off12.png';
import { useCallback } from "react";
import {toast,Toaster} from 'react-hot-toast'
import useRazorpay from "react-razorpay";
import Cards from './Cards';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import ConnectWithoutContactSharpIcon from '@mui/icons-material/ConnectWithoutContactSharp';
import SignalWifiStatusbar4BarSharpIcon from '@mui/icons-material/SignalWifiStatusbar4BarSharp';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';

import './Home.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Typography } from "@mui/material";
import NightsStayIcon from '@mui/icons-material/NightsStay';
import PaymentsIcon from '@mui/icons-material/Payments';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import {useNavigate} from 'react-router-dom'


function Home() {
  const navigate = useNavigate();
  const isOnline = navigator.onLine;
  
  const [token, setToken] = useState('');

  const [Razorpay, isLoaded] = useRazorpay() ;


  useEffect(() => {
    if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');

      if (name === 'token') {
        setToken(decodeURIComponent(value));
        break;
      }
    }
  }

    const getStartedButton = document.getElementById('get-started-button');
    const getTop = document.getElementById('get-top');

    if (getStartedButton) {
      getStartedButton.addEventListener('click', () => {
        getTop.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (getStartedButton) {
        getStartedButton.removeEventListener('click', () => {
          getTop.scrollIntoView({ behavior: 'smooth' });
        });
      }
    };
  }, []);
  
  const [currentimgindex,setCurrrentimgindex] = useState(0);
  const background_img=[b1,b2,b3,b4,b5,b6];
  
  const prevImg= () => {
    setCurrrentimgindex((prevInd)=>(prevInd +1) % background_img.length)
}

const nextImg = () => {
    setCurrrentimgindex((prevInd)=>(prevInd-1 + background_img.length) % background_img.length);
}
const autoChange = () =>{
  setCurrrentimgindex((prevInd)=>(prevInd +1) % background_img.length)
}
setInterval(autoChange,10000);

 // Use Razorpay only when online



const handlePayment = (amount) => {
  if (!isOnline) {
    return toast.error('Payment cannot be processed while offline.');
    
  }

  const options = {
    key: "rzp_test_r6hncBZZ4Xy103",
    amount: amount * 100,
    currency: "INR",
    name: "Cospace",
    description: "Test Transaction",
    handler: (res) => {
      console.log({ res });
      console.log(amount)
      navigate('/location',{state:{amount:amount}})
    },
    prefill: {
      name: "hello World",
      email: "cospace@gmail.com",
      contact: "9351220194",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzpay = new Razorpay(options);
 
  rzpay.open();

}
// }, [ isOnline]);

  return (
    <div className='home' >
      <Toaster position="top-center" reverseOrder={false}></Toaster>
         <div className="home_container" id="get-top">
            <ArrowBackIosIcon className="Arrow_Backward" onClick={prevImg} />
            <img className='home_image' src={background_img[currentimgindex]} alt=""  />
            <ArrowForwardIosIcon className='Arrow_Forward'  onClick={nextImg} />
        </div>
        <div className="cards" >
          <div className="Header_card">
                <h2>Cospace: Transforming Workspaces, Transforming Minds</h2>
          </div>
          <div className="all_cards">
          <Cards className='each_card' heading='Coworking Solution' content='Coworking spaces provide a flexible and collaborative work environment, offering professionals a shared workspace equipped with amenities and resources.' img={b1} />
          <Cards className='each_card' heading='Enterprise Solution' content='Enterprise solutions are comprehensive, scalable software and hardware systems designed to streamline and optimize business operations' img={b2} />
          <Cards className='each_card' heading='Virtual Ofiice' content='Virtual office solutions enable companies to establish a professional image and access essential administrative services ,fostering flexibility and cost savings' img={b3} />
          <Cards className='each_card' heading='Other' content='We also host events, workshops, and networking opportunities, creating a vibrant community for professionals to collaborate, learn, and grow their businesses' img={b4} />
          </div>

          <div className="prizing">
          <div className="head">
                <h2>Our Pricing</h2>
          </div>
          <div className="pricing_for_user">
          <card className='card'>
            <h3>Free</h3>
            <span>₹<h1>0</h1>/year</span>
            <p>Access free on specific Location and no mentor support</p>
            {/* <button id="get-started-button" >Get Started</button> */}
            <button onClick={()=>{
              navigate('/location');
            }} >Get Started</button>

          </card>
          <card class='card'>
            <h3>Basic</h3>
            <span>₹<h1 >399</h1>/year</span>
            <p>Access free for most Location and contact support</p>
            <button onClick={token ? () => handlePayment(399) : () => 
            toast.error('login Required ...!')}>Get Started</button>
          </card>
          <card class='card'>
            <h3>Advance</h3>
            
            <span>₹<h1>999</h1>/year</span>
            <p>Access free for all Location ,contact support and More feature.</p>
            <button onClick={token ? () => handlePayment(999) : () => 
            toast.error('login Required ...!')}>Get Started</button>
          </card>
          </div>
          </div>

          <div className="all_other_f">
          <div className="head">
                <h2>Our Services</h2>
          </div>
          <div className="facilaties" >
            <div className="f1">
            <AccessTimeSharpIcon className="f1_1"/>
            <Typography variant="p">24/7 hr</Typography>

            </div>
            <div className="f1">
            <ConnectWithoutContactSharpIcon className="f1_1" />
            <Typography variant="p" >Connect</Typography>
            
            </div>
            <div className="f1">
            <SignalWifiStatusbar4BarSharpIcon
             className="f1_1"/>
            <Typography variant="p">High Speed Wifi</Typography>
            
            </div>
            <div className="f1">
            <NightsStayIcon className="f1_1"/>
            <Typography variant="p">Night Stay</Typography>
            
            </div>
            <div className="f1">
            <PaymentsIcon className="f1_1"/>
            <Typography variant="p">No Hidden Cost</Typography>
            
            </div>
            <div className="f1">
            <LocalCarWashIcon className="f1_1"/>
            <Typography variant="p">Parking</Typography>
            
            </div>
            <div className="f1">
            <ElectricBoltIcon className="f1_1"/>
            <Typography variant="p">No Power Cut</Typography>
            
            </div>
          </div>
          </div>
        
        
      
        </div>
    </div>
  )
}

export default Home