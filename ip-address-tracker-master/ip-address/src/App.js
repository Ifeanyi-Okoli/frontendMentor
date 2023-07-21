import { useState, useEffect } from 'react'

import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "./icon"
import arrow from "./images/icon-arrow.svg";
import background from "./images/pattern-bg-desktop.png";

function App() {
  const [address, setAddress] = useState(null)
  const [ipAddress, setIpAddress] = useState("")

  useEffect(() =>{
    const getInitialData = async () => {
    try{
      
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_dCOnyXAcziEbFY5HOeJ3TjN16x5fD&ipAddress=${ipAddress}`);
        const data = await res.json();
        setAddress(data);
      }catch(error){
        console.trace(error);
      };
    }    
    getInitialData()
  }, [ipAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.ipaddress.value;
    setIpAddress(inputValue);
  };

  const MapComponent = () => {
    const map = useMap();
    if (address && address.location) {
      map.setView([address.location.lat, address.location.lng], 13);
    }
    return null;
  };

  return (
    <>
      <section>
        <div className="absolute -z-10 w-full">
          <img
            src={background}
            alt="background"
            className="w-full h-80 object-cover"
          />
        </div>
        <article className="p-8">
          <h1 className="text-2xl text-center text-white font-bold mb-8">
            IP Address Tracker
          </h1>

          <form className="flex justify-center max-w-xl mx-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search for any IP address or domain"
              name="ipaddress"
              id="ipaddress"
              required
              className="py-2 px-4 rounded-l-lg w-full"
            />
            <button
              type="submit"
              name="ipsubmit"
              className="bg-black py-4 px-4 hover:opacity-60 rounded-r-lg "
            >
              <img src={arrow} alt="arrow" />
            </button>
          </form>
        </article>

       {address && <>
        <article className="bg-white rounded-lg shadow p-8 mx-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl xl:mx-auto text-center md:text-left lg:-mb-16 relative " style={{ zIndex: 1000}} >
          <div className="lg:border-r lg:border-slate-400  ">
            <h2 className="uppercase text-sm font-semibold text-slate-500 tracking-wider mb-3">
              Ip Address
            </h2>
            <p className="font-bold text-lg text-slate-900 md:text-xl xl:text-2xl">
              {address.ip}
            </p>
          </div>

          <div className="lg:border-r lg:border-slate-400  ">
            <h2 className="uppercase text-sm font-semibold text-slate-500 tracking-wider mb-3">
              Location
            </h2>
            <p className="font-bold text-lg text-slate-900 md:text-xl xl:text-2xl">
              {address.location.region}
            </p>
          </div>

          <div className="lg:border-r lg:border-slate-400  ">
            <h2 className="uppercase text-sm font-semibold text-slate-500 tracking-wider mb-3">
              TimeZone
            </h2>
            <p className="font-bold text-lg text-slate-900 md:text-xl xl:text-2xl">
              {address.location.timezone}
            </p>
          </div>

          <div className=" ">
            <h2 className="uppercase text-sm font-semibold text-slate-500 tracking-wider mb-3">
              ISP
            </h2>
            <p className="font-bold text-lg text-slate-900 md:text-xl xl:text-2xl">
              {address.isp}
            </p>
          </div>
        </article>

        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{ height: "700px", width:"100vw"}}>
        <MapComponent />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {address.location && (
            <Marker icon={icon} position={[address.location.lat, address.location.lng]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          )}
        </MapContainer>
       </>}
      </section>
    </>
  );
}

export default App;
